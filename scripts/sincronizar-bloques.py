#!/usr/bin/env python3
"""
Copia la cabecera, el pie y los recursos del <head> desde /parciales a todas las páginas.

Cada página tiene marcadores como estos:
    <!-- BLOQUE cabecera -->  ...  <!-- /BLOQUE cabecera -->
Todo lo que está entre ellos se reemplaza por el contenido de parciales/cabecera.html.

Además:
- marca con aria-current="page" el enlace del menú de la página actual;
- en 404.html convierte las rutas relativas en absolutas (/css/..., /img/...), porque esa
  página se muestra en cualquier dirección inexistente del sitio.

Uso (desde la carpeta cingles/):
    python scripts/sincronizar-bloques.py
"""
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PARCIALES = RAIZ / "parciales"
BLOQUES = ["recursos", "cabecera", "pie", "formulario-postulacion"]


def rutas_absolutas(html: str) -> str:
    """Antepone / a href y src relativos (no toca https:, mailto:, tel:, # ni data:)."""
    return re.sub(
        r'(\s(?:href|src))="(?!https?:|mailto:|tel:|#|/|data:)([^"]+)"',
        r'\1="/\2"',
        html,
    )


def main() -> None:
    partes = {b: (PARCIALES / f"{b}.html").read_text(encoding="utf-8").strip() for b in BLOQUES}
    paginas = sorted(RAIZ.glob("*.html"))
    for pagina in paginas:
        texto = pagina.read_text(encoding="utf-8")
        original = texto
        for bloque, contenido in partes.items():
            if bloque == "cabecera":
                # Marca la página actual en el menú
                contenido = contenido.replace(
                    f'class="menu__enlace" href="{pagina.name}"',
                    f'class="menu__enlace" href="{pagina.name}" aria-current="page"',
                )
            patron = re.compile(
                rf"(<!-- BLOQUE {bloque} -->)(.*?)(<!-- /BLOQUE {bloque} -->)", re.S
            )
            texto, n = patron.subn(lambda m: f"{m.group(1)}\n{contenido}\n{m.group(3)}", texto)
            if n == 0 and bloque != "formulario-postulacion":
                print(f"  aviso: {pagina.name} no tiene el bloque '{bloque}'")
        if pagina.name == "404.html":
            texto = rutas_absolutas(texto)
        if texto != original:
            pagina.write_text(texto, encoding="utf-8")
            print(f"actualizada: {pagina.name}")
        else:
            print(f"sin cambios: {pagina.name}")


if __name__ == "__main__":
    main()
