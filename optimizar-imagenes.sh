#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# Optimiza las fotos para la web.
#
# 1. Pon tus fotos originales (del celular o la cámara) en la carpeta  originales/
#    con el nombre final que espera el sitio: hero.jpg, rector.jpg, campus-1.jpg, etc.
# 2. Ejecuta:   bash optimizar-imagenes.sh
# 3. Las versiones livianas quedan en  img/  (JPG calidad 80, menos de ~300 KB).
#
# Además crea hero-1200.jpg y hero-2400.jpg a partir de hero.jpg.
# Requiere Python 3 con Pillow:   pip install pillow
# ------------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d originales ]; then
  echo "No existe la carpeta originales/. Créala y pon ahí tus fotos."
  exit 1
fi

# En Windows a veces el comando es "python" y no "python3"
PY=python3
if ! python3 -c "import PIL" >/dev/null 2>&1; then PY=python; fi

"$PY" - <<'PY'
from pathlib import Path
from PIL import Image, ImageOps

# Ancho máximo por tipo de foto (el alto se ajusta solo)
ANCHOS = {
    "hero": 2400, "panoramica": 2400, "og-image": 1200,
    "campus": 1600, "bilingue": 1400, "noticia": 1200,
    "rector": 900, "infant": 900, "elementary": 900, "middle": 900, "high": 900,
    "anuario": 600, "testimonio": 400, "cambridge": 400,
}

def ancho_para(nombre):
    for clave, ancho in ANCHOS.items():
        if nombre.startswith(clave):
            return ancho
    return 1600

def guardar(im, destino, ancho):
    im = im.copy()
    if im.width > ancho:
        im = im.resize((ancho, round(im.height * ancho / im.width)), Image.LANCZOS)
    if destino.suffix.lower() == ".png":
        im.save(destino, optimize=True)
    else:
        im.convert("RGB").save(destino, "JPEG", quality=80, optimize=True, progressive=True)
    print(f"  {destino.name:24} {im.width}x{im.height}  {destino.stat().st_size // 1024} KB")

origen, salida = Path("originales"), Path("img")
salida.mkdir(exist_ok=True)
for foto in sorted(origen.iterdir()):
    if foto.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
        continue
    im = ImageOps.exif_transpose(Image.open(foto))   # respeta la rotación del celular
    nombre = foto.stem.lower().replace(" ", "-")
    extension = ".png" if nombre in ("logo", "cambridge", "favicon") else ".jpg"
    guardar(im, salida / f"{nombre}{extension}", ancho_para(nombre))
    if nombre == "hero":
        guardar(im, salida / "hero-2400.jpg", 2400)
        guardar(im, salida / "hero-1200.jpg", 1200)
PY

echo "Listo. Revisa que cada foto pese menos de 300 KB (si no, baja la calidad a 75)."
