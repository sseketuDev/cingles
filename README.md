# Sitio web de Sun Valley College (cingles.cl)

Sitio estático hecho con HTML, CSS y JavaScript puro. No requiere dependencias ni compilación; GitHub Pages lo publica directamente desde la rama `main` y también se puede subir a Cloudflare Pages.

```
cingles/
├── index.html                  Portada (diseño tipo colegio-curimon.cl, hero con video)
├── admision.html               Landing completa de Admisión 2027 + formulario
├── nosotros.html               Historia, misión y visión, sellos, rector, anuarios
├── ciclos.html                 Infant, Elementary, Middle y High School
├── comunidad.html              Equipo de gestión, funcionarios, CDE y CGPA
├── documentos.html             Reglamentos y preguntas frecuentes (PDF)
├── trabaja-con-nosotros.html   Formulario laboral
├── privacidad.html             Política de privacidad (Ley 19.628 y Ley 21.719)
├── 404.html                    Página "no encontrada"
├── css/estilos.css             Estilos base de todo el sitio (colores en :root, al inicio)
├── css/clasico.css             Estilo de la portada: crema, damero, tarjetas (solo index)
├── css/futuro.css              Estilo futurista/minimalista (solo admision)
├── js/main.js                  Menú, galería, carrusel, formularios
├── js/noticias.js              ← aquí se agregan las noticias
├── js/calendario.js            ← aquí se agregan los eventos del calendario
├── img/                        ← aquí van las fotos
├── video/                      ← aquí va el video panorámico del hero
├── docs/                       ← aquí van los PDF
├── parciales/                  Cabecera, pie y formulario compartidos (ver más abajo)
├── scripts/                    Herramientas de mantenimiento
├── optimizar-imagenes.sh       Achica las fotos para la web
├── robots.txt, sitemap.xml
└── README.md
```

---

## Ver el sitio en tu computador

Abre una terminal en la carpeta `cingles/` y ejecuta:

```
python -m http.server 8000
```

Luego abre <http://localhost:8000> en el navegador. (Si abres los archivos con doble clic también se ven, pero el mapa y algunos detalles funcionan mejor con el servidor.)

---

## Paleta de colores

Salió del sitio actual (hojas de estilo de Elementor) y del logo. Está en `css/estilos.css`, dentro de `:root`.

| Variable | Color | De dónde sale |
|---|---|---|
| `--color-primario` | `#132B67` | Fondo de la cabecera actual y títulos de los contadores |
| `--color-primario-oscuro` | `#061845` | Azul dominante del logo; barra superior |
| `--color-secundario` | `#1A2F6B` | Fondo del pie de página actual |
| `--color-acento` | `#209543` | Verde del logo, de los botones y de los divisores actuales |
| `--color-acento-oscuro` | `#1A7A37` | El mismo verde oscurecido para que el texto cumpla contraste AA (5,4:1) |
| `--color-texto` | `#414141` | Color de texto del kit de Elementor |
| `--color-texto-suave` | `#5E5E5E` | Gris `#787878` del kit, oscurecido para cumplir AA |
| `--color-fondo` / `--color-superficie` | `#FFFFFF` / `#F8F8F8` | Neutros del kit |
| `--color-borde` | `#D9D9D9` | Neutro del kit |
| `--color-whatsapp` | `#25D366` | Verde oficial de WhatsApp |

El rosado (`#F24080`) y el morado (`#41246D`) que aparecen como "colores globales" en Elementor son restos de la plantilla. No son del colegio y por eso no se usan.

Tipografías (Google Fonts): **Libre Caslon Text** para títulos y **Mulish** para textos. Mulish es la fuente del sitio actual. La portada usa **Montserrat** en los títulos, al estilo de colegio-curimon.cl. La página de Admisión usa **Sora** para su estilo futurista.

---

## Páginas del sitio

Todas usan el diseño de la portada (`css/clasico.css`) y la misma cabecera y pie.

- **Nosotros:** `nosotros.html` (índice y anuarios), `historia.html`, `proyecto-educativo.html`, `mision-vision.html`, `sellos.html`, `organigrama.html`, `mensaje-rector.html`, `nuestros-espacios.html` y `himno.html`.
- **Ciclos:** `ciclos.html`, `infant-school.html`, `elementary-school.html`, `middle-school.html` y `high-school.html`.
- **Comunidad:** `comunidad.html` (equipo de gestión), `formacion-familia.html`, `area-academica.html`, `convivencia-escolar.html`, `equipo-psicoeducativo.html`, `asistentes-educacion.html`, `docentes-tutores.html`, `docentes-asignatura.html`, `centro-estudiantes.html`, `centro-padres.html` y `trabaja-con-nosotros.html`.
- **Admisión:** `admision.html`, `entrevista-familiar.html` y `proyecto-bilingue.html`.
- **Otras:** `documentos.html`, `privacidad.html` y `404.html`. `index2.html` es la propuesta B de portada y no se indexa.

Las fotos del equipo están en `img/equipo/` (una por persona, con su nombre). Para cambiar a alguien, reemplaza la foto con el mismo nombre de archivo y edita su nombre y cargo en la página correspondiente.

---

## Cabecera, pie y formulario: se editan en un solo lugar

La cabecera, el pie de página, el botón de WhatsApp y el formulario de postulación son **idénticos en todas las páginas**. Para no editarlos 9 veces:

1. Edita el archivo que corresponda en `parciales/`:
   - `cabecera.html`: barra superior, logo, menú e íconos
   - `pie.html`: pie de página y botón flotante de WhatsApp
   - `recursos.html`: lo que va en el `<head>` (fuentes, CSS, JS)
   - `formulario-postulacion.html`: formulario de postulación (está en admision.html)
2. Ejecuta, desde la carpeta `cingles/`:
   ```
   python scripts/sincronizar-bloques.py
   ```
   El script copia cada bloque en todas las páginas, entre los marcadores `<!-- BLOQUE nombre -->` y `<!-- /BLOQUE nombre -->`, y marca en el menú la página actual.

**Si no quieres usar el script**, copia a mano todo lo que está entre `<!-- BLOQUE cabecera -->` y `<!-- /BLOQUE cabecera -->` de una página a las demás (y lo mismo con `pie`). Ojo: en `404.html` las rutas empiezan con `/` (por ejemplo `/css/estilos.css`), porque esa página se muestra en cualquier dirección.

Para **crear una página nueva**, copia `privacidad.html`, cambia el `<title>`, la `description`, el `canonical` y el contenido dentro de `<main>`, y agrégala a `sitemap.xml`.

---

## Fotos

Mientras una foto no exista, el sitio muestra un **marco azul con el nombre del archivo** esperado (por ejemplo `img/rector.jpg`). Así sabes qué foto va en cada lugar. Basta con poner el archivo con ese nombre en `img/` y aparece sola.

| Archivo | Uso | Tamaño sugerido |
|---|---|---|
| `logo.png` | Logo con fondo transparente (**ya incluido**, sacado de cingles.cl) | 600 px alto |
| `favicon.png` | Ícono de pestaña (**ya incluido**, generado desde el logo) | 512×512 |
| `hero.jpg`, `hero-2.jpg`, `hero-3.jpg` | Hero gigante de la portada. Van cambiando cada 7 segundos. | 2400×1600 |
| `hero-1200.jpg`, `hero-2400.jpg` | Versiones de `hero.jpg` para celular y pantalla grande (el script las crea) | 1200 / 2400 ancho |
| `rector.jpg` | Retrato del rector (se recorta en arco) | 900×1100 |
| `bilingue.jpg`, `bilingue-2.jpg` | Proyecto bilingüe (la segunda se ve en círculo) | 1400×1000 / 800×800 |
| `infant.jpg`, `elementary.jpg`, `middle.jpg`, `high.jpg` | Ciclos (se recortan en arco) | 900×1100 |
| `panoramica.jpg` | Banda del lema y portada de Nosotros | 2400×900 |
| `campus-1.jpg` … `campus-8.jpg` | Galería. La 1 es la más grande. | 1600×1100 |
| `testimonio-1.jpg` … `testimonio-4.jpg` | Exalumnos (se ven en círculo) | 400×400 |
| `noticia-1.jpg` … | Noticias | 1200×800 |
| `anuario-1992.jpg` … `anuario-2023.jpg` | Portadas de anuarios | 600×800 |
| `cambridge.png` | Sello Cambridge Assessment English, fondo transparente | 400 px ancho |
| `og-image.jpg` | Imagen que aparece al compartir el sitio en WhatsApp o redes | 1200×630 |

Algunas fotos se reutilizan como portada de las páginas interiores: `hero-2.jpg` en Admisión, `campus-2.jpg` en Ciclos, `campus-3.jpg` en Documentos, `campus-5.jpg` en Trabaja con nosotros y `campus-8.jpg` en Comunidad.

### Cómo preparar las fotos

- Formato **JPG, calidad 80**, cada foto de **menos de 300 KB**.
- Fotos horizontales para el hero, la panorámica y la galería. Fotos verticales para el rector y los ciclos.
- Deja al protagonista en el centro, porque los arcos y círculos recortan los bordes.
- Usa nombres en minúsculas, sin espacios ni tildes.

**Forma automática:** crea una carpeta `originales/` dentro de `cingles/`, pon ahí las fotos con su nombre final (`hero.jpg`, `rector.jpg`…) y ejecuta:

```
pip install pillow
bash optimizar-imagenes.sh
```

El script las achica, las comprime, corrige la rotación del celular, las deja en `img/` y crea `hero-1200.jpg` y `hero-2400.jpg`. No subas la carpeta `originales/` al sitio.

(Si prefieres WebP, puedes exportar con `cwebp -q 80`, pero tendrás que cambiar la extensión `.jpg` por `.webp` en el HTML.)

---

## Video del hero (portada)

La portada muestra un video panorámico de fondo. Guárdalo en la carpeta `video/` con estos nombres:

| Archivo | Uso | Recomendación |
|---|---|---|
| `video/hero.mp4` | **Obligatorio.** Video principal | H.264, 1920×1080 (o panorámico 2560×1080), 10 a 20 segundos, **sin audio**, menos de 8 MB |
| `video/hero.webm` | Opcional. La misma toma en WebM | Pesa menos en Chrome y Edge |
| `video/hero-movil.mp4` | Opcional. Versión para celulares | 1280×720, menos de 3 MB |
| `img/hero.jpg` | Imagen fija | Un cuadro del mismo video, 2400×1600 |

Cómo funciona:
- Se reproduce en bucle, sin sonido, y se pausa solo cuando sales del hero, para ahorrar batería.
- Tiene un botón **"Pausar video"**, obligatorio por accesibilidad.
- Si la persona tiene activado "reducir movimiento" o "ahorro de datos", el video no se descarga: se ve `img/hero.jpg` y un botón para reproducirlo si quiere.
- Mientras `video/hero.mp4` no exista, verás el aviso "Falta video/hero.mp4" y la imagen fija.
- Elige una toma tranquila y oscura en el lado izquierdo, donde va el texto. El degradé azul del colegio se aplica encima.

Para comprimirlo con [ffmpeg](https://ffmpeg.org) (gratis):

```
ffmpeg -i original.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart video/hero.mp4
ffmpeg -i original.mov -an -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 36 -b:v 0 video/hero.webm
ffmpeg -i original.mov -an -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart video/hero-movil.mp4
ffmpeg -i video/hero.mp4 -frames:v 1 -q:v 3 img/hero.jpg
```

(`-an` quita el audio.) Cloudflare Pages acepta archivos de hasta 25 MB, pero para que cargue rápido conviene no pasar de 8 MB.

---

## Landing de Admisión (admision.html)

Todo el contenido sale del documento oficial de preguntas frecuentes y de las páginas de proceso y entrevista de cingles.cl. Tiene una barra de secciones que queda fija al bajar (Proceso, Jornada sabatina, Evaluación, Entrevista, Matrícula, Cursos y vacantes, Acompañamiento, Preguntas y Postular), además de un buscador de preguntas frecuentes.

Qué debes actualizar cada año:
- **Fecha de la Jornada Sabatina:** busca `REEMPLAZAR: fecha y horario` y cambia "Próxima jornada: fecha por confirmar".
- **Aranceles:** si el colegio decide publicarlos, busca `REEMPLAZAR: si el colegio decide publicar los aranceles`.
- **Año de admisión:** busca "2027" en `admision.html`, `index.html` y `parciales/formulario-postulacion.html`.
- **Preguntas frecuentes:** cada pregunta es un bloque `<details><summary>Pregunta</summary><div><p>Respuesta</p></div></details>`. Copia uno para agregar otra. El buscador la encuentra solo.

---

## Calendario (portada)

Los eventos se editan en **`js/calendario.js`**. La portada muestra solo los eventos desde hoy en adelante, de 7 en 7, y crea sola los botones "Filtrar por curso".

```js
  { fecha: "2026-10-15", evento: "Feria científica 10:00", cursos: ["5° básico", "6° básico"] },
```

- Usa `"Colegio"` para los eventos de todo el colegio. Esos eventos aparecen en el filtro de cualquier curso.
- Nombres de curso válidos: `Playgroup`, `Prekínder`, `Kínder`, `1° básico` … `8° básico`, `I° medio` … `IV° medio`.
- **Los eventos que trae ahora son de ejemplo** (dicen "(Ejemplo)"). Reemplázalos antes de publicar.

---

## Noticias

Las noticias de la portada se editan en **`js/noticias.js`**, sin tocar el HTML. La portada muestra siempre las 3 más recientes.

Para agregar una, copia un bloque y pégalo al principio de la lista:

```js
  {
    fecha: "2026-10-05",
    titulo: "Semana del libro en Infant School",
    bajada: "Cuentacuentos en inglés y español con las familias.",
    imagen: "img/noticia-4.jpg",
    enlace: "https://instagram.com/sunvalleycollege/"
  },
```

Cuida que cada bloque termine con `},` y que las comillas estén completas. La foto va en `img/` con 1200×800 px.

---

## Documentos PDF

Los PDF están en `docs/`, con nombres sin espacios, sin tildes y en minúsculas:

| Documento | Archivo | Estado |
|---|---|---|
| RICE 2026 | `docs/rice-2026.pdf` | ✅ descargado de cingles.cl |
| Plan Integral de Seguridad Escolar | `docs/plan-integral-seguridad-escolar-2026.pdf` | ⚠️ **falta**: el enlace del sitio actual está roto. Súbelo con este nombre. |
| Plan de Gestión de Convivencia 2026 | `docs/plan-gestion-convivencia-2026.pdf` | ✅ |
| Normas de Evaluación | `docs/normas-evaluacion.pdf` | ✅ |
| FAQ Admisión 2027 | `docs/faq-admision-2027.pdf` | ✅ |
| FAQ Formación y Familia 2027 | `docs/faq-formacion-familia-2027.pdf` | ✅ |
| FAQ Académicas 2027 | `docs/faq-academica-2027.pdf` | ✅ |
| FAQ Convivencia 2027 | `docs/faq-convivencia-2027.pdf` | ✅ |
| FAQ Psicoeducativo | `docs/faq-psicoeducativo.pdf` | ✅ |

**Para actualizar un PDF**, reemplaza el archivo manteniendo el mismo nombre. Si cambias el nombre (por ejemplo `rice-2027.pdf`), actualiza los enlaces en `documentos.html` e `index.html`, junto con el peso y la fecha que aparecen bajo cada título.

---

## Formularios (Formspree)

Los formularios usan [Formspree](https://formspree.io), gratis hasta 50 envíos al mes.

1. Crea una cuenta en formspree.io con el correo del colegio.
2. Crea dos formularios: "Postulación" y "Trabaja con nosotros".
3. Copia la dirección que te entregan (algo como `https://formspree.io/f/abcdwxyz`).
4. Pégala dentro de `action=""`:
   - Postulación: en `parciales/formulario-postulacion.html`. Luego ejecuta `python scripts/sincronizar-bloques.py`, que lo copia en `admision.html`.
   - Trabajo: directamente en `trabaja-con-nosotros.html`.
5. Haz un envío de prueba y confirma el correo que Formspree te enviará.

Mientras `action` esté vacío, el formulario muestra en pantalla que todavía no está conectado y ofrece el teléfono, para que nadie crea que envió algo.

El formulario de trabajo pide un **enlace** al CV (Google Drive, Dropbox o LinkedIn), porque el plan gratuito de Formspree no recibe archivos adjuntos.

---

## Revisión antes de publicar

```
python scripts/revisar-enlaces.py
```

Lista cualquier enlace vacío o `#`, URLs con `www.`, `http://` o mayúsculas en cingles.cl, y archivos locales que no existan. Las fotos faltantes de `img/` se informan aparte y no cuentan como error.

---

## Publicar en GitHub Pages

El repositorio debe contener **el contenido de esta carpeta en su raíz**, incluido `index.html`. GitHub Pages publica los archivos directamente desde la rama `main`, sin un proceso de compilación.

1. En **Settings → Pages**, selecciona **Deploy from a branch**, la rama `main` y la carpeta `/(root)`.
2. Guarda la configuración. GitHub Pages publicará el sitio en `https://<usuario>.github.io/<repositorio>/`.
3. Los cambios que subas a `main` se publican automáticamente.

El archivo `.nojekyll` indica a GitHub que sirva el contenido estático tal como está. Si el repositorio se llama `<usuario>.github.io`, la dirección no incluye el nombre del repositorio.

El archivo `_redirects` solo funciona en Cloudflare Pages; GitHub Pages no aplica esas reglas de redirección.

---

## Publicar en Cloudflare Pages con el dominio cingles.cl

### 1. Subir el sitio

1. Entra a <https://dash.cloudflare.com> y crea una cuenta gratuita si no tienes.
2. Ve a **Workers & Pages → Create → Pages → Upload assets**.
3. Ponle de nombre `cingles` y arrastra la carpeta `cingles/` completa. Presiona **Deploy**.
4. Queda publicado en `https://cingles.pages.dev`. Revisa todo ahí antes de tocar el dominio.

Para **actualizar** el sitio más adelante, entra al proyecto y usa **Create deployment** para arrastrar de nuevo la carpeta. También puedes conectarlo a un repositorio de GitHub para que se publique solo con cada cambio.

### 2. Conectar el dominio sin tocar el correo (registros MX)

El correo `@cingles.cl` depende de los registros **MX** (y de los **TXT** de SPF, DKIM y DMARC). Esos registros **no se tocan**. Solo cambia el registro que apunta la web (`@` y `www`).

**Antes de empezar**, anota o saca captura de todos los registros DNS actuales. Para ver los MX, ejecuta en una terminal:

```
nslookup -type=mx cingles.cl
```

**Caso A: el DNS de cingles.cl ya está en Cloudflare**
1. En el proyecto de Pages ve a **Custom domains → Set up a custom domain**, escribe `cingles.cl` y confirma.
2. Cloudflare te propondrá reemplazar el registro `A` o `CNAME` de `@` (el que apunta al hosting de WordPress) por uno hacia Pages. Acepta solo eso.
3. Repite con `www.cingles.cl`.
4. **No borres** ningún registro `MX`, `TXT`, `autodiscover` ni `mail`.

**Caso B: el DNS está en otro lugar (NIC Chile, el hosting, etc.)**
1. En Cloudflare, **Add a site → cingles.cl → plan Free**. Cloudflare copia automáticamente los registros existentes.
2. **Compara registro por registro** con tu captura. Cada `MX` y cada `TXT` (SPF `v=spf1…`, DKIM, DMARC) debe estar idéntico. Si falta alguno, agrégalo a mano.
3. En NIC Chile (o donde compraste el dominio), cambia los **servidores de nombre (DNS)** por los dos que te indica Cloudflare.
4. Espera la confirmación (desde minutos hasta 24 horas) y sigue los pasos del Caso A.

**Después:** vuelve a ejecutar `nslookup -type=mx cingles.cl` y confirma que el resultado es el mismo de antes. Envía y recibe un correo de prueba.

### 3. Páginas del WordPress anterior

Todas las páginas del sitio WordPress que enlazaba el menú (historia, misión y visión, ciclos, áreas, equipos, CDE, CGPA, himno, etc.) **ahora existen en este sitio** con el mismo diseño de la portada. El texto y las fotos se tomaron de cingles.cl.

El archivo `_redirects` hace que las direcciones antiguas sigan funcionando al cambiar el dominio. Por ejemplo, `cingles.cl/misionyvision` lleva a `/mision-vision` y `cingles.cl/cde` lleva a `/centro-estudiantes`. Cloudflare Pages lee ese archivo solo. Las páginas que conservan su nombre (como `/historia` o `/himno`) no necesitan regla.

Si el colegio tiene enlaces directos a PDF antiguos (`/wp-content/uploads/...`) publicados en otros lugares, agrega una línea por cada uno en `_redirects` apuntando al archivo nuevo en `/docs/`.

---

## Pendientes marcados en el código

Busca estos textos para encontrarlos:

- `REEMPLAZAR`: los eventos de ejemplo de `js/calendario.js`, la fecha de la Jornada Sabatina y los aranceles (admision.html), los testimonios de exalumnos (textos, nombres y generaciones), las noticias de ejemplo en `js/noticias.js`, los pies de foto de la galería y los datos legales de la política de privacidad (razón social, RUT, proveedores y plazos).
- `REVISAR`: las descripciones de cada ciclo en `ciclos.html`. En `privacidad.html` está la marca `REVISAR CON ASESOR LEGAL`.
- `SUBIR A /docs`: el PDF del Plan Integral de Seguridad Escolar.
- `FORMSPREE`: dónde pegar la dirección de cada formulario.
- En `nosotros.html` hay un bloque comentado listo para el video institucional "Educación, pan y libertad", en YouTube con carga diferida.
