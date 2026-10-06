#!/usr/bin/env python3
"""
Revisa todos los href y src de las páginas del sitio.

Confirma que:
  1. no hay ningún enlace vacío ni "#" solo;
  2. no queda ninguna URL con "www.", "http://" ni mayúsculas en cingles.cl o en rutas locales
     (los enlaces externos como fliphtml5 pueden tener mayúsculas, porque así los entrega el servicio);
  3. los archivos locales existen (se excluyen las fotos de /img y los videos de /video, que se agregan después).

Uso (desde la carpeta cingles/):
    python scripts/revisar-enlaces.py            # resumen
    python scripts/revisar-enlaces.py --todos    # además lista cada href y src
Devuelve código 1 si encuentra errores.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

RAIZ = Path(__file__).resolve().parent.parent
# Enlaces a servicios externos que no se tocan (se reportan aparte, no como error)
PERMITIR_WWW = ("https://www.youtube-nocookie.com/",)


class Recolector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.enlaces = []  # (linea, atributo, valor, etiqueta, attrs)

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for attr in ("href", "src", "action"):
            if attr in d:
                self.enlaces.append((self.getpos()[0], attr, d[attr], tag, d))


def revisar_js():
    """Las rutas de imágenes y enlaces de js/noticias.js también cuentan."""
    ruta = RAIZ / "js" / "noticias.js"
    if not ruta.exists():
        return []
    texto = ruta.read_text(encoding="utf-8")
    salida = []
    for n, linea in enumerate(texto.splitlines(), 1):
        for m in re.finditer(r'(imagen|enlace)\s*:\s*"([^"]*)"', linea):
            salida.append((n, m.group(1), m.group(2), "js", {}))
    return salida


def main() -> int:
    mostrar_todos = "--todos" in sys.argv
    errores, pendientes, fotos_faltantes = [], [], set()
    total = 0

    paginas = sorted(RAIZ.glob("*.html"))
    fuentes = [(p.name, p) for p in paginas] + [("js/noticias.js", None)]

    for nombre, ruta in fuentes:
        if ruta is None:
            enlaces = revisar_js()
        else:
            r = Recolector()
            r.feed(ruta.read_text(encoding="utf-8"))
            enlaces = r.enlaces

        for linea, attr, valor, tag, attrs in enlaces:
            total += 1
            lugar = f"{nombre}:{linea}"
            if mostrar_todos:
                print(f"  {lugar:32} {attr:6} {valor}")

            # El action vacío de los formularios es intencional (se pega la URL de Formspree)
            if attr == "action":
                if valor == "":
                    pendientes.append(f"{lugar}  formulario sin conectar a Formspree (action vacío)")
                continue

            v = valor.strip()
            if v in ("", "#"):
                errores.append(f"{lugar}  enlace vacío o '#': {attr}=\"{valor}\"")
                continue
            if v.startswith(("mailto:", "tel:", "data:", "#")):
                continue

            if v.startswith("http://"):
                errores.append(f"{lugar}  usa http:// : {v}")
            if "www." in v and not v.startswith(PERMITIR_WWW):
                errores.append(f"{lugar}  contiene www. : {v}")

            u = urlparse(v)
            es_externo = bool(u.scheme)
            es_cingles = u.netloc == "cingles.cl"

            if es_externo and not es_cingles:
                # Enlaces externos deben abrir en otra pestaña (salvo recursos como fuentes)
                if tag == "a" and attrs.get("target") != "_blank":
                    errores.append(f"{lugar}  enlace externo sin target=\"_blank\": {v}")
                if tag == "a" and "noopener" not in (attrs.get("rel") or ""):
                    errores.append(f"{lugar}  enlace externo sin rel=\"noopener\": {v}")
                continue

            if es_cingles:
                if any(c.isupper() for c in u.path):
                    errores.append(f"{lugar}  URL de cingles.cl con mayúsculas: {v}")
                continue

            # Ruta local
            camino = unquote(u.path).lstrip("/")
            if camino == "":
                continue
            if any(c.isupper() for c in camino) or " " in camino:
                errores.append(f"{lugar}  ruta local con mayúsculas o espacios: {v}")
            archivo = RAIZ / camino
            if not archivo.exists():
                if camino.startswith(("img/", "video/")):
                    fotos_faltantes.add(camino)
                elif camino.startswith("docs/"):
                    pendientes.append(f"{lugar}  falta subir el archivo {camino}")
                else:
                    errores.append(f"{lugar}  el archivo local no existe: {camino}")

    print(f"Revisados {total} enlaces en {len(paginas)} páginas y js/noticias.js.\n")
    if fotos_faltantes:
        print(f"Fotos y videos que aún no están en /img o /video ({len(fotos_faltantes)}) — se agregan después, no es error:")
        for f in sorted(fotos_faltantes):
            print(f"  · {f}")
        print()
    if pendientes:
        print("Pendientes:")
        for p in sorted(set(pendientes)):
            print(f"  · {p}")
        print()
    if errores:
        print(f"ERRORES ({len(errores)}):")
        for e in errores:
            print(f"  ✗ {e}")
        return 1
    print("✓ Sin errores: no hay '#' vacíos, ni www., ni http://, ni mayúsculas en cingles.cl, y los archivos locales existen.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
