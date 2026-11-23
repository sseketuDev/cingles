/* ==========================================================================
   Libro del Taller de Literatura · «El amor y sus variantes» (2026)
   --------------------------------------------------------------------------
   Se usa en libro-taller-literatura.html y en la tarjeta destacada de la
   portada (index.html). Edita solo los valores de abajo.

   INSTAGRAM_POST_URL: dirección de la publicación del colegio sobre el libro,
     por ejemplo "https://www.instagram.com/p/XXXXXXXXXXX/".
     Mientras diga "INSTAGRAM_POST_URL", el botón lleva al perfil del colegio.

   FLIPBOOK_URL: opcional. Si subes el PDF a FlipHTML5 (igual que los anuarios),
     pega aquí su dirección, por ejemplo
     "https://online.fliphtml5.com/sunvalleycollege/xxxx/".
     Con eso el visor de la página muestra el libro con efecto de hojas.
     Si lo dejas en "", el visor muestra el PDF de docs/ directamente.

   PDF: archivo del libro dentro de docs/ (sin espacios ni tildes).

   AUTORES: nombres de los estudiantes autores, uno por línea, entre comillas
     y separados por coma. Mientras la lista diga [PENDIENTE], la página lo
     muestra con un recuadro punteado.
   ========================================================================== */

var INSTAGRAM_POST_URL = "INSTAGRAM_POST_URL";

window.LIBRO_LITERATURA = {
  instagram: INSTAGRAM_POST_URL,
  flipbook: "",
  pdf: "docs/libro-taller-literatura-2026.pdf",
  autores: [
    "[PENDIENTE] Nombres de los estudiantes autores"
  ]
};

/* --------------------------------------------------------------------------
   Aplica los datos (no es necesario editar desde aquí hacia abajo)
   -------------------------------------------------------------------------- */
(function () {
  var libro = window.LIBRO_LITERATURA;
  var PERFIL = 'https://instagram.com/sunvalleycollege/';
  var urlInstagram = /^https:\/\//.test(libro.instagram) ? libro.instagram : PERFIL;

  // Botones "Ver publicación en Instagram"
  document.querySelectorAll('[data-libro-instagram]').forEach(function (a) {
    a.href = urlInstagram;
    if (urlInstagram === PERFIL) a.setAttribute('data-sin-publicacion', '');
  });

  // Enlaces de lectura y descarga del PDF
  document.querySelectorAll('[data-libro-pdf]').forEach(function (a) { a.href = libro.pdf; });

  // Lista de autores
  var lista = document.getElementById('libro-autores');
  if (lista && Array.isArray(libro.autores)) {
    lista.innerHTML = '';
    libro.autores.forEach(function (nombre) {
      var li = document.createElement('li');
      li.textContent = nombre;
      if (/^\s*\[PENDIENTE\]/.test(nombre)) li.className = 'c-pendiente';
      lista.appendChild(li);
    });
  }

  // Visor: FlipHTML5 si hay dirección; si no, el PDF del sitio.
  // Los celulares no muestran PDF dentro de la página, así que ahí solo se
  // ofrece el botón para abrirlo (y no se descarga el PDF sin pedirlo).
  var visor = document.getElementById('libro-visor');
  if (visor) {
    var marco = visor.querySelector('iframe');
    if (/^https:\/\//.test(libro.flipbook)) {
      visor.classList.add('c-visor--flipbook');
      marco.setAttribute('allowfullscreen', '');
      marco.src = libro.flipbook;
    } else if (window.matchMedia('(min-width: 761px)').matches) {
      marco.src = libro.pdf + '#view=FitH&pagemode=none';
    }
  }
})();
