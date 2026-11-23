/* ==========================================================================
   Nuestros rectores (rectores.html)
   --------------------------------------------------------------------------
   Aquí se editan los rectores, sin tocar el diseño. La página dibuja, con
   estos datos, la línea de tiempo (tarjetas) y las reseñas históricas.

   Para agregar un rector, copia un bloque { ... } y pégalo en el lugar que
   le corresponde por fecha (la lista va en orden cronológico).

   id:     identificador sin espacios ni tildes; se usa en el enlace
           (por ejemplo rectores.html#resena-jorge-sepulveda-gomez)
   nombre: nombre completo
   desde:  año de inicio, por ejemplo "1988"
   hasta:  año de término; déjalo en "" si es el rector actual
   cargo:  texto bajo el nombre ("Rector", "Rector actual"...)
   foto:   retrato en img/rectores/ de 800×1000 px (proporción 4:5).
           Déjalo en "" si no hay foto: se verá un marco azul.
   cita:   frase destacada (opcional, "" para omitirla)
   resena: titulo  → título de la reseña (opcional, "" para omitirlo)
           parrafos → un texto entre comillas por párrafo, separados por coma

   Si agregas un rector sin reseña aún, puedes escribir un texto que
   empiece con [PENDIENTE]: se verá en la página con un recuadro punteado,
   para que no se publique por error sin notarlo.

   Cuida las comillas y la coma entre bloques.
   ========================================================================== */

window.RECTORES = [
  {
    id: "jorge-sepulveda-gomez",
    nombre: "Jorge Sepúlveda Gómez",
    desde: "1988",
    hasta: "1989",
    cargo: "Rector",
    foto: "img/rectores/jorge-sepulveda-gomez.jpg",
    cita: "El Sun Valley será una alternativa educativa diferente para el Valle del Aconcagua.",
    resena: {
      titulo: "“La visión que dio origen al colegio”",
      parrafos: [
        "Jorge Sepúlveda Gómez fue uno de los principales impulsores del nacimiento del Colegio Inglés de Los Andes. Fue quien propuso crear una alternativa educativa diferente para el Valle de Aconcagua y se reunió con cuatro reconocidos empresarios y profesionales andinos para convertir esa idea en un proyecto concreto. Juntos asumieron el desafío de ofrecer a las familias de la zona una nueva propuesta de educación, con identidad propia y una mirada hacia el futuro.",
        "Su contribución estuvo en imaginar ese colegio y convocar las voluntades necesarias para hacerlo posible. En una época en que predominaban modelos educativos más tradicionales, el proyecto apostó por una formación humanista, pluralista y cercana, donde cada estudiante fuera reconocido como una persona única, valorada y acompañada en su desarrollo.",
        "Como primer rector, le correspondió conducir el tránsito entre la idea fundacional de 1988 y la apertura del colegio en marzo de 1989. Su legado permanece en esa convicción inicial: creer que era posible enriquecer la educación de Aconcagua y asumir la responsabilidad de dar los primeros pasos para lograrlo."
      ]
    }
  },
  {
    id: "antonio-yelincic-beros",
    nombre: "Antonio Yelincic Beros",
    desde: "1990",
    hasta: "1991",
    cargo: "Rector",
    foto: "img/rectores/antonio-yelincic-beros.jpg",
    cita: "",
    resena: {
      titulo: "“La organización y continuidad del proyecto fundacional”",
      parrafos: [
        "Antonio Yelincic Beros asumió la responsabilidad de continuar el legado de los fundadores durante los primeros años de funcionamiento del colegio. Su rectoría se desarrolló en una etapa decisiva, cuando era necesario transformar el entusiasmo inicial en una organización capaz de sostener el trabajo educativo y acompañar el crecimiento de la comunidad.",
        "Para avanzar en esa tarea, convocó a profesionales de San Felipe y Los Andes y conformó un equipo que incorporó, junto con la Rectoría, una Unidad Técnico-Pedagógica y una Inspectoría General. Esta estructura permitió distribuir responsabilidades y fortalecer tanto la conducción académica como la organización de la vida escolar.",
        "Su aporte representa el trabajo de dar estabilidad y continuidad a un proyecto que recién comenzaba. Con el respaldo de profesionales de la zona, contribuyó a establecer las bases humanas y organizativas sobre las cuales las siguientes rectorías pudieron construir nuevas etapas de desarrollo."
      ]
    }
  },
  {
    id: "daniel-rivas-monje",
    nombre: "Daniel Rivas Monje",
    desde: "1991",
    hasta: "1992",
    cargo: "Rector",
    foto: "img/rectores/daniel-rivas-monje.jpg",
    cita: "La exigencia académica y el inglés como segunda lengua es nuestro desafío.",
    resena: {
      titulo: "“La primera generación y los primeros logros académicos”",
      parrafos: [
        "La rectoría de Daniel Rivas Monje estuvo vinculada a un acontecimiento que ocupa un lugar especial en la memoria del colegio: el egreso de su primera generación de Cuarto Medio, en 1992. Este hito permitió observar, por primera vez, cómo el proyecto educativo comenzaba a proyectarse hacia la educación superior y la vida profesional de sus estudiantes.",
        "Durante su gestión se fortaleció la exigencia académica y se acompañó a una generación que alcanzó destacados resultados, con estudiantes que ingresaron a universidades estatales. Aquellos jóvenes abrieron el camino de quienes posteriormente se convertirían en las primeras generaciones de profesionales egresados del Colegio Inglés de Los Andes.",
        "Su contribución fue dar impulso a una etapa en la que las aspiraciones fundacionales comenzaron a expresarse en logros concretos. El egreso de esa primera generación fortaleció la confianza de las familias en la propuesta del colegio y estableció una referencia para el trabajo académico de los años siguientes."
      ]
    }
  },
  {
    id: "horacio-aranguiz-donoso",
    nombre: "Horacio Aránguiz Donoso",
    desde: "1993",
    hasta: "2012",
    cargo: "Rector",
    foto: "img/rectores/horacio-aranguiz-donoso.jpg",
    cita: "La disciplina y la formación son el eje de nuestro proyecto.",
    resena: {
      titulo: "“La consolidación de la identidad y el prestigio del colegio”",
      parrafos: [
        "Horacio Aránguiz Donoso, exministro de Educación, asumió la Rectoría aportando una amplia experiencia en el ámbito educacional. Su gestión, la más extensa en la historia del colegio, permitió desarrollar un trabajo sostenido que dejó una huella en distintas generaciones de estudiantes, familias y trabajadores.",
        "Durante su rectoría reformuló el proyecto educativo y la estructura organizacional, dando continuidad a los avances de sus predecesores. La disciplina, la formación y la exigencia académica ocuparon un lugar central en su conducción, marcada por un estilo firme que debe comprenderse en el contexto educativo y social de su época.",
        "Bajo su liderazgo, el colegio vivió una etapa de importantes logros que contribuyeron a consolidar su prestigio en el Valle de Aconcagua. La continuidad de su gestión permitió afianzar una identidad asociada al esfuerzo, la responsabilidad y las altas expectativas sobre las capacidades de los estudiantes.",
        "Su legado está ligado a la consolidación de un proyecto que había comenzado años antes y que, durante su rectoría, alcanzó reconocimiento por su trabajo formativo y académico. Esta trayectoria también recoge el aporte de los equipos docentes, directivos y administrativos que lo acompañaron y que hicieron posible una etapa especialmente significativa para el colegio."
      ]
    }
  },
  {
    id: "guillermo-carvajal-oyanedel",
    nombre: "Guillermo Carvajal Oyanedel",
    desde: "2012",
    hasta: "2024",
    cargo: "Rector",
    foto: "img/rectores/guillermo-carvajal-oyanedel.jpg",
    cita: "Hay que abrir la mirada a la diversidad.",
    resena: {
      titulo: "“Más allá de formar buenos estudiantes, nuestra verdadera misión es formar buenas personas”",
      parrafos: [
        "Durante su gestión como rector del Colegio Inglés de Los Andes, Guillermo Carvajal Oyanedel fortaleció una educación integral guiada por la «excelencia académica a escala humana». Desde esa visión, promovió el respeto y la formación en valores, junto con el desarrollo de las capacidades de cada estudiante.",
        "«Somos formadores de buenas personas» fue una convicción que orientó su labor. Para él, la excelencia académica y la formación humana debían avanzar juntas. Los aprendizajes cobraban mayor sentido cuando ayudaban a los estudiantes a actuar con honestidad, respeto y solidaridad, y a asumir con responsabilidad su papel en la sociedad.",
        "Desde la Rectoría, impulsó un liderazgo basado en el trabajo colaborativo y la participación de las familias. Buscó construir una comunidad educativa que reconociera los logros individuales y valorara el crecimiento colectivo. Su experiencia previa como director del Liceo Mixto San Felipe amplió su perspectiva sobre la gestión escolar y reafirmó la importancia de generar oportunidades de desarrollo para niños y jóvenes.",
        "Su gestión buscó conjugar la tradición del colegio con la innovación y una mirada centrada en las personas. Entendía que preparar a los estudiantes para continuar sus estudios o incorporarse al mundo laboral era parte de una tarea más amplia: acompañarlos para que enfrentaran la vida con autonomía, valores sólidos y sentido de responsabilidad social."
      ]
    }
  },
  {
    id: "javier-aguayo-ballestero",
    nombre: "Javier Aguayo Ballestero",
    desde: "2024",
    hasta: "",
    cargo: "Rector actual",
    foto: "img/rectores/javier-aguayo-ballestero.jpg",
    cita: "Recuperar la esencia y la excelencia académica para proyectar al colegio hacia sus próximos 40 años.",
    resena: {
      titulo: "“Dirigir un colegio es dar continuidad a su historia y abrir nuevas oportunidades para quienes la construyen”",
      parrafos: [
        "El rector Mister Javier Aguayo Ballestero se incorporó al Colegio Inglés de Los Andes – Sun Valley College el 15 de abril de 2024 y asumió oficialmente como rector el 2 de mayo del mismo año, cargo que desempeña hasta la fecha.",
        "Su gestión ha impulsado el ordenamiento administrativo y contractual, la reformulación del Proyecto Educativo Institucional y la conformación de un nuevo equipo directivo. En este proceso, creó el área de Formación y Familia e incorporó dos encargadas de Convivencia Escolar y dos responsables del área Académica.",
        "Asimismo, fortaleció el apoyo psicoeducativo, amplió y diversificó los talleres extraprogramáticos y promovió mejoras en seguridad, con una nueva enfermería y la incorporación de un prevencionista de riesgos. Entre 2024 y 2026, la dotación aumentó de 60 a 78 funcionarios para mejorar el servicio educativo. También renovó la página web, potenció las redes sociales e implementó una nueva propuesta de admisión escolar sabatina.",
        "Actualmente, su principal enfoque está en consolidar estas mejoras y proyectar los cuarenta años del colegio en 2028. Entre sus metas destacan el bilingüismo desde prekínder hasta cuarto básico, como sello distintivo en el Aconcagua, y la consolidación de dos cursos por nivel en enseñanza media. Este crecimiento, iniciado con la apertura de I° Medio B en 2025, permitirá contar en 2028 con la primera generación de IV° Medio A y B, marcando un hito histórico para la comunidad educativa."
      ]
    }
  }
];

/* --------------------------------------------------------------------------
   Dibujo de la página (no es necesario editar desde aquí hacia abajo)
   Este archivo se carga antes que js/main.js, así las tarjetas nuevas
   también reciben la animación de aparición.
   -------------------------------------------------------------------------- */
(function () {
  var linea = document.getElementById('lista-rectores');
  var resenas = document.getElementById('lista-resenas');
  var datos = Array.isArray(window.RECTORES) ? window.RECTORES : [];
  if (!linea || !datos.length) return;

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pendiente(t) { return /^\s*\[PENDIENTE\]/.test(String(t || '')); }
  function claseTexto(t) { return pendiente(t) ? ' class="c-pendiente"' : ''; }
  function periodo(r) {
    return '<time datetime="' + esc(r.desde) + '">' + esc(r.desde) + '</time> – ' +
      (r.hasta ? '<time datetime="' + esc(r.hasta) + '">' + esc(r.hasta) + '</time>' : '<span>Actualidad</span>');
  }
  function foto(r, clase) {
    var nombre = r.foto ? r.foto.replace(/^img\//, '') : 'Sin fotografía';
    if (!r.foto) return '<div class="' + clase + ' foto sin-foto" data-nombre="' + esc(nombre) + '"></div>';
    return '<div class="' + clase + ' foto" data-nombre="' + esc(nombre) + '"><img src="' + esc(r.foto) +
      '" width="800" height="1000" loading="lazy" decoding="async" alt="Retrato de ' + esc(r.nombre) +
      '" data-nombre="' + esc(nombre) + '" onerror="sinFoto(this)"></div>';
  }
  function tieneResena(r) { return r.resena && Array.isArray(r.resena.parrafos) && r.resena.parrafos.length; }

  linea.innerHTML = datos.map(function (r, i) {
    var actual = !r.hasta;
    return '<li class="c-rector' + (actual ? ' c-rector--actual' : '') + ' aparecer" id="' + esc(r.id) + '">' +
      '<article class="c-rector__ficha" aria-labelledby="r-' + esc(r.id) + '">' +
        '<p class="c-rector__periodo"><span class="c-rector__numero" aria-hidden="true">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' + periodo(r) + '</p>' +
        foto(r, 'c-rector__foto') +
        '<div class="c-rector__texto">' +
          '<h3 id="r-' + esc(r.id) + '">' + esc(r.nombre) + '</h3>' +
          '<p>' + esc(r.cargo || 'Rector') + '</p>' +
          (r.cita ? '<blockquote class="c-rector__cita"><p>' + esc(r.cita) + '</p></blockquote>' : '') +
          (tieneResena(r) && resenas ? '<a class="c-rector__mas" href="#resena-' + esc(r.id) + '">Leer reseña histórica<span class="visualmente-oculto"> de ' + esc(r.nombre) + '</span></a>' : '') +
        '</div>' +
      '</article>' +
    '</li>';
  }).join('');

  if (!resenas) return;
  resenas.innerHTML = datos.filter(tieneResena).map(function (r) {
    var titulo = r.resena.titulo || '';
    return '<article class="c-resena aparecer" id="resena-' + esc(r.id) + '" aria-labelledby="rs-' + esc(r.id) + '">' +
      '<header class="c-resena__cabecera">' +
        foto(r, 'c-resena__foto') +
        '<div>' +
          '<p class="c-resena__periodo">' + periodo(r) + '</p>' +
          '<h3 id="rs-' + esc(r.id) + '">' + esc(r.nombre) + '</h3>' +
          (titulo ? '<p class="c-resena__titulo' + (pendiente(titulo) ? ' c-pendiente' : '') + '">' + esc(titulo) + '</p>' : '') +
        '</div>' +
      '</header>' +
      '<div class="c-texto">' + r.resena.parrafos.map(function (p) { return '<p' + claseTexto(p) + '>' + esc(p) + '</p>'; }).join('') + '</div>' +
      '<a class="c-resena__volver" href="#' + esc(r.id) + '">Volver a la línea de tiempo</a>' +
    '</article>';
  }).join('');
})();
