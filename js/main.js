/* ==========================================================================
   Sun Valley College · main.js
   JavaScript puro, sin dependencias. Cada bloque se activa solo si su
   elemento existe en la página.
   ========================================================================== */
(function () {
  'use strict';

  var TELEFONO = '+56 9 2604 2383';
  var CORREO = 'secretariaescolar@cingles.cl';
  var movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');

  function $(selector, contexto) { return (contexto || document).querySelector(selector); }
  function $$(selector, contexto) { return Array.prototype.slice.call((contexto || document).querySelectorAll(selector)); }

  function enfocables(contenedor) {
    return $$('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])', contenedor)
      .filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
  }

  /* ------------------------------------------------------------------
     Año automático en el pie
     ------------------------------------------------------------------ */
  $$('[data-anio-actual]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ------------------------------------------------------------------
     Cabecera: transparente sobre el hero, sólida al hacer scroll
     ------------------------------------------------------------------ */
  var encabezado = $('.encabezado');
  if (encabezado) {
    var actualizarCabecera = function () {
      encabezado.classList.toggle('con-scroll', window.scrollY > 40);
    };
    actualizarCabecera();
    window.addEventListener('scroll', actualizarCabecera, { passive: true });
  }

  /* ------------------------------------------------------------------
     Menú: submenús accesibles con teclado + panel móvil
     ------------------------------------------------------------------ */
  var menu = $('#menu-principal');
  var hamburguesa = $('.hamburguesa');

  function cerrarSubmenus(excepto) {
    $$('.menu__item.abierto').forEach(function (item) {
      if (item === excepto) return;
      item.classList.remove('abierto');
      var b = $('.menu__desplegar', item);
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }

  $$('.menu__desplegar').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var item = boton.closest('.menu__item');
      var abrir = boton.getAttribute('aria-expanded') !== 'true';
      cerrarSubmenus(item);
      item.classList.toggle('abierto', abrir);
      boton.setAttribute('aria-expanded', String(abrir));
      if (abrir && !menuMovilAbierto()) {
        var primero = $('.submenu a', item);
        if (primero && boton.dataset.teclado === '1') primero.focus();
      }
      boton.dataset.teclado = '';
    });
    boton.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') boton.dataset.teclado = '1';
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        boton.dataset.teclado = '1';
        if (boton.getAttribute('aria-expanded') !== 'true') boton.click();
        else { var primero = $('.submenu a', boton.closest('.menu__item')); if (primero) primero.focus(); }
      }
    });
  });

  // Flechas dentro del submenú
  $$('.submenu').forEach(function (sub) {
    sub.addEventListener('keydown', function (e) {
      var enlaces = $$('a', sub);
      var i = enlaces.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); enlaces[(i + 1) % enlaces.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); enlaces[(i - 1 + enlaces.length) % enlaces.length].focus(); }
    });
  });

  // Cerrar submenús al hacer clic fuera o al salir con Tab
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu__item')) cerrarSubmenus();
  });
  $$('.menu__item').forEach(function (item) {
    item.addEventListener('focusout', function (e) {
      if (!menuMovilAbierto() && e.relatedTarget && !item.contains(e.relatedTarget)) cerrarSubmenus();
    });
  });

  function menuMovilAbierto() { return menu && menu.classList.contains('abierto'); }

  function abrirMenuMovil() {
    menu.classList.add('abierto');
    document.body.classList.add('menu-abierto');
    hamburguesa.setAttribute('aria-expanded', 'true');
    var cerrar = $('.menu__cerrar-movil', menu);
    if (cerrar) cerrar.focus();
  }
  function cerrarMenuMovil(devolverFoco) {
    menu.classList.remove('abierto');
    document.body.classList.remove('menu-abierto');
    hamburguesa.setAttribute('aria-expanded', 'false');
    cerrarSubmenus();
    if (devolverFoco) hamburguesa.focus();
  }

  if (menu && hamburguesa) {
    hamburguesa.addEventListener('click', function () {
      if (menuMovilAbierto()) cerrarMenuMovil(true); else abrirMenuMovil();
    });
    var cerrarMovil = $('.menu__cerrar-movil', menu);
    if (cerrarMovil) cerrarMovil.addEventListener('click', function () { cerrarMenuMovil(true); });

    // Al elegir un enlace (por ejemplo, #contacto) se cierra el panel
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { if (menuMovilAbierto()) cerrarMenuMovil(false); });
    });

    // Foco atrapado dentro del panel móvil
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !menuMovilAbierto()) return;
      var lista = enfocables(menu);
      if (!lista.length) return;
      var primero = lista[0], ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    });

    // Si la ventana crece a escritorio, se cierra el panel
    window.matchMedia('(min-width: 1181px)').addEventListener('change', function (m) {
      if (m.matches && menuMovilAbierto()) cerrarMenuMovil(false);
    });
  }

  // Esc cierra el menú móvil y los submenús
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (menuMovilAbierto()) { cerrarMenuMovil(true); return; }
    var abierto = $('.menu__item.abierto');
    if (abierto) {
      cerrarSubmenus();
      var b = $('.menu__desplegar', abierto);
      if (b) b.focus();
    }
  });

  /* ------------------------------------------------------------------
     Hero: crossfade lento entre fotos, con botón de pausa
     ------------------------------------------------------------------ */
  var fotosHero = $$('.hero__foto');
  var pausaHero = $('.hero__pausa');
  if (fotosHero.length > 1) {
    var actual = 0, temporizador = null;
    var siguienteFoto = function () {
      // Solo rota entre fotos que sí existen
      var disponibles = fotosHero.filter(function (f) { return !f.classList.contains('sin-foto'); });
      if (disponibles.length < 2) return;
      var i = disponibles.indexOf(fotosHero[actual]);
      var nueva = disponibles[(i + 1) % disponibles.length];
      fotosHero[actual].classList.remove('activa');
      nueva.classList.add('activa');
      // Reinicia el zoom lento de la foto que entra
      var img = $('img', nueva);
      if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }
      actual = fotosHero.indexOf(nueva);
    };
    var iniciar = function () {
      detener();
      temporizador = setInterval(siguienteFoto, 7000);
      if (pausaHero) { pausaHero.setAttribute('aria-pressed', 'false'); $('span', pausaHero).textContent = 'Pausar fotos'; }
    };
    var detener = function () {
      clearInterval(temporizador); temporizador = null;
      if (pausaHero) { pausaHero.setAttribute('aria-pressed', 'true'); $('span', pausaHero).textContent = 'Reanudar fotos'; }
    };
    if (!movimientoReducido.matches) iniciar(); else detener();
    if (pausaHero) {
      pausaHero.addEventListener('click', function () { if (temporizador) detener(); else iniciar(); });
      // El botón de pausa solo aparece si hay al menos dos fotos reales para rotar
      window.addEventListener('load', function () {
        var reales = fotosHero.filter(function (f) { return !f.classList.contains('sin-foto'); });
        pausaHero.hidden = reales.length < 2;
      });
    }
  }


  /* ------------------------------------------------------------------
     Hero con video: se carga solo si la persona no prefiere menos
     movimiento ni tiene activado el ahorro de datos. Botón de pausa.
     ------------------------------------------------------------------ */
  var heroVideo = $('.f-hero__video');
  if (heroVideo) {
    var heroF = heroVideo.closest('.f-hero');
    var botonVideo = $('.f-hero__pausa', heroF);
    var ahorroDatos = navigator.connection && navigator.connection.saveData;
    var textoVideo = function (reproduciendo) {
      botonVideo.setAttribute('aria-pressed', String(!reproduciendo));
      $('span', botonVideo).textContent = reproduciendo ? 'Pausar video' : 'Reproducir video';
      $('use', botonVideo).setAttribute('href', reproduciendo ? '#i-pausa' : '#i-reproducir');
    };
    var fuentes = $$('source', heroVideo);
    if (fuentes.length) {
      // Si falla la última fuente, no hay video: queda la imagen fija
      fuentes[fuentes.length - 1].addEventListener('error', function () {
        heroF.classList.add('sin-video');
        botonVideo.hidden = true;
      });
    }
    heroVideo.addEventListener('playing', function () { botonVideo.hidden = false; textoVideo(true); });
    heroVideo.addEventListener('pause', function () { textoVideo(false); });
    botonVideo.addEventListener('click', function () {
      if (heroVideo.paused) { heroVideo.preload = 'auto'; heroVideo.play().catch(function () {}); }
      else heroVideo.pause();
    });
    if (!movimientoReducido.matches && !ahorroDatos) {
      heroVideo.preload = 'auto';
      heroVideo.load();
      var intento = heroVideo.play();
      if (intento) intento.catch(function () { botonVideo.hidden = false; textoVideo(false); });
    } else {
      // Con movimiento reducido: sin reproducción automática, pero con opción de verlo
      botonVideo.hidden = false;
      textoVideo(false);
    }
    // Ahorra batería: pausa el video cuando el hero sale de la pantalla
    if ('IntersectionObserver' in window) {
      var pausadoPorScroll = false;
      new IntersectionObserver(function (e) {
        if (!e[0].isIntersecting && !heroVideo.paused) { heroVideo.pause(); pausadoPorScroll = true; }
        else if (e[0].isIntersecting && pausadoPorScroll) { heroVideo.play().catch(function () {}); pausadoPorScroll = false; }
      }).observe(heroF);
    }
  }

  /* ------------------------------------------------------------------
     Navegación interna de admisión: marca la sección visible
     ------------------------------------------------------------------ */
  var subnav = $('.f-subnav');
  if (subnav && 'IntersectionObserver' in window) {
    var enlacesSub = $$('a[href^="#"]:not(.f-subnav__cta)', subnav);
    var marcar = function (id) {
      enlacesSub.forEach(function (a) {
        var activo = a.getAttribute('href') === '#' + id;
        if (activo) {
          a.setAttribute('aria-current', 'true');
          // Desplaza la barra (en celulares) para que el enlace activo quede a la vista
          var lista = a.closest('ul');
          var izq = a.offsetLeft - lista.clientWidth / 2 + a.clientWidth / 2;
          lista.scrollTo({ left: izq, behavior: movimientoReducido.matches ? 'auto' : 'smooth' });
        } else a.removeAttribute('aria-current');
      });
    };
    var secciones = enlacesSub.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    var visibles = {};
    var obsSub = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { visibles[en.target.id] = en.isIntersecting; });
      var primera = secciones.filter(function (s) { return visibles[s.id]; })[0];
      if (primera) marcar(primera.id);
    }, { rootMargin: '-30% 0px -60% 0px' });
    secciones.forEach(function (s) { obsSub.observe(s); });
  }

  /* ------------------------------------------------------------------
     Buscador de preguntas frecuentes
     ------------------------------------------------------------------ */
  var faq = $('[data-faq]');
  if (faq) {
    var buscador = $('#buscar-faq', faq);
    var preguntas = $$('details', faq);
    var grupos = $$('.f-faq__grupo', faq);
    var vacio = $('.f-faq__vacio', faq);
    var resultado = $('#faq-resultado', faq);
    var normalizar = function (t) { return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); };
    buscador.addEventListener('input', function () {
      var q = normalizar(buscador.value.trim());
      var total = 0;
      preguntas.forEach(function (d) {
        var coincide = !q || normalizar(d.textContent).indexOf(q) !== -1;
        d.hidden = !coincide;
        if (coincide) total++;
        // Abre las coincidencias cuando se busca algo
        if (q && coincide) d.open = true;
        if (!q) d.open = false;
      });
      grupos.forEach(function (g) { g.hidden = !$$('details:not([hidden])', g).length; });
      vacio.hidden = total > 0;
      resultado.textContent = q ? total + (total === 1 ? ' pregunta encontrada' : ' preguntas encontradas') : '';
    });
  }


  /* ------------------------------------------------------------------
     Calendario con filtro por curso (datos en js/calendario.js)
     ------------------------------------------------------------------ */
  var cal = $('[data-calendario]');
  if (cal) {
    var ORDEN = ['Colegio', 'Playgroup', 'Prekínder', 'Kínder', '1° básico', '2° básico', '3° básico', '4° básico',
      '5° básico', '6° básico', '7° básico', '8° básico', 'I° medio', 'II° medio', 'III° medio', 'IV° medio'];
    var POR_PAGINA = 7;
    var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    var aFecha = function (t) { var p = String(t).split('-'); return new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1); };
    var eventos = (Array.isArray(window.CALENDARIO) ? window.CALENDARIO : [])
      .filter(function (e) { return aFecha(e.fecha) >= hoy; })
      .sort(function (a, b) { return String(a.fecha).localeCompare(String(b.fecha)); });
    var cursos = [];
    eventos.forEach(function (e) { (e.cursos || []).forEach(function (c) { if (cursos.indexOf(c) === -1) cursos.push(c); }); });
    cursos.sort(function (a, b) {
      var ia = ORDEN.indexOf(a), ib = ORDEN.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    var chips = $('.c-chips', cal), cuerpo = $('tbody', cal);
    var estadoPag = $('.c-paginas__estado', cal), anterior = $('.c-paginas__anterior', cal), siguiente = $('.c-paginas__siguiente', cal);
    var filtro = 'Todos', pagina = 0;
    var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
    var dosDigitos = function (n) { return (n < 10 ? '0' : '') + n; };

    var pintar = function () {
      // Un curso ve sus eventos y los de todo el colegio
      var lista = filtro === 'Todos' ? eventos : eventos.filter(function (e) {
        var c = e.cursos || []; return c.indexOf(filtro) !== -1 || c.indexOf('Colegio') !== -1;
      });
      var total = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
      pagina = Math.min(pagina, total - 1);
      var trozo = lista.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);
      cuerpo.innerHTML = trozo.length ? trozo.map(function (e) {
        var f = aFecha(e.fecha);
        return '<tr><td><time datetime="' + esc(e.fecha) + '">' + dosDigitos(f.getDate()) + '/' + dosDigitos(f.getMonth() + 1) + '/' + f.getFullYear() + '</time></td>' +
          '<td>' + esc(e.evento) + '</td><td>' + esc((e.cursos || []).join(', ')) + '</td></tr>';
      }).join('') : '<tr><td colspan="3" class="c-calendario__vacio">No hay eventos próximos' + (filtro === 'Todos' ? '' : ' para ' + esc(filtro)) + '.</td></tr>';
      estadoPag.textContent = 'Página ' + (pagina + 1) + ' de ' + total;
      anterior.disabled = pagina === 0;
      siguiente.disabled = pagina >= total - 1;
      $$('button', chips).forEach(function (b) { b.setAttribute('aria-pressed', String(b.textContent === filtro)); });
    };

    ['Todos'].concat(cursos).forEach(function (c) {
      var li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.textContent = c;
      b.addEventListener('click', function () { filtro = c; pagina = 0; pintar(); });
      li.appendChild(b); chips.appendChild(li);
    });
    anterior.addEventListener('click', function () { pagina--; pintar(); });
    siguiente.addEventListener('click', function () { pagina++; pintar(); });
    pintar();
  }

  /* ------------------------------------------------------------------
     Aparición suave de fotos grandes al hacer scroll
     ------------------------------------------------------------------ */
  var aparecer = $$('.aparecer');
  if (aparecer.length && 'IntersectionObserver' in window && !movimientoReducido.matches) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) { entrada.target.classList.add('visible'); observador.unobserve(entrada.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    aparecer.forEach(function (el) { observador.observe(el); });
  } else {
    aparecer.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ------------------------------------------------------------------
     Galería: lightbox propio (teclado, swipe, Esc, foco atrapado)
     ------------------------------------------------------------------ */
  var lightbox = $('#lightbox');
  var botonesGaleria = $$('[data-galeria]');
  if (lightbox && botonesGaleria.length) {
    var lbFoto = $('.foto', lightbox);
    var lbImg = $('img', lightbox);
    var lbPie = $('.lightbox__pie', lightbox);
    var lbContador = $('.lightbox__contador', lightbox);
    var indice = 0, origen = null;

    var mostrar = function (i) {
      indice = (i + botonesGaleria.length) % botonesGaleria.length;
      var fuente = $('img', botonesGaleria[indice]);
      lbFoto.classList.remove('sin-foto');
      lbFoto.setAttribute('data-nombre', fuente.getAttribute('data-nombre') || '');
      lbImg.onerror = function () { window.sinFoto(lbImg); };
      lbImg.src = fuente.getAttribute('src');
      lbImg.alt = fuente.alt;
      lbPie.textContent = botonesGaleria[indice].getAttribute('data-pie') || fuente.alt;
      lbContador.textContent = 'Foto ' + (indice + 1) + ' de ' + botonesGaleria.length;
    };

    botonesGaleria.forEach(function (boton, i) {
      boton.addEventListener('click', function () {
        origen = boton;
        mostrar(i);
        lightbox.showModal();
        document.body.style.overflow = 'hidden';
        $('.lightbox__cerrar', lightbox).focus();
      });
    });

    $('.lightbox__anterior', lightbox).addEventListener('click', function () { mostrar(indice - 1); });
    $('.lightbox__siguiente', lightbox).addEventListener('click', function () { mostrar(indice + 1); });
    $('.lightbox__cerrar', lightbox).addEventListener('click', function () { lightbox.close(); });

    lightbox.addEventListener('close', function () {
      document.body.style.overflow = '';
      if (origen) origen.focus();
    });
    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(indice - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(indice + 1); }
      if (e.key === 'Tab') {
        var lista = enfocables(lightbox);
        var primero = lista[0], ultimo = lista[lista.length - 1];
        if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
      }
    });
    // Clic en el fondo oscuro cierra
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });

    // Swipe en móvil
    var inicioX = null;
    lightbox.addEventListener('touchstart', function (e) { inicioX = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      if (inicioX === null) return;
      var dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 50) mostrar(indice + (dx < 0 ? 1 : -1));
      inicioX = null;
    });
  }

  /* ------------------------------------------------------------------
     Testimonios: carrusel accesible (sin avance automático)
     ------------------------------------------------------------------ */
  var carrusel = $('.testimonios');
  if (carrusel) {
    var diapositivas = $$('.testimonio', carrusel);
    var puntos = $('.testimonios__puntos', carrusel);
    var estado = $('.testimonios__estado', carrusel);
    var actualT = 0;

    diapositivas.forEach(function (d, i) {
      var p = document.createElement('button');
      p.type = 'button';
      p.setAttribute('aria-label', 'Ver testimonio ' + (i + 1) + ' de ' + diapositivas.length);
      p.addEventListener('click', function () { irA(i); });
      puntos.appendChild(p);
    });

    var irA = function (i) {
      actualT = (i + diapositivas.length) % diapositivas.length;
      diapositivas.forEach(function (d, j) { d.hidden = j !== actualT; });
      $$('button', puntos).forEach(function (p, j) {
        if (j === actualT) p.setAttribute('aria-current', 'true'); else p.removeAttribute('aria-current');
      });
      estado.textContent = 'Testimonio ' + (actualT + 1) + ' de ' + diapositivas.length;
    };
    $('.flecha--anterior', carrusel).addEventListener('click', function () { irA(actualT - 1); });
    $('.flecha--siguiente', carrusel).addEventListener('click', function () { irA(actualT + 1); });
    irA(0);
  }

  /* ------------------------------------------------------------------
     Noticias: se cargan desde js/noticias.js
     ------------------------------------------------------------------ */
  var listaNoticias = $('#lista-noticias');
  if (listaNoticias && Array.isArray(window.NOTICIAS)) {
    var formatoFecha = function (texto) {
      var partes = String(texto).split('-');
      var fecha = new Date(+partes[0], (+partes[1] || 1) - 1, +partes[2] || 1);
      if (isNaN(fecha)) return texto;
      return fecha.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
    };
    var escapar = function (t) {
      return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    };
    var noticias = window.NOTICIAS.slice().sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); }).slice(0, 3);
    listaNoticias.innerHTML = noticias.map(function (n) {
      var externo = /^https?:\/\//.test(n.enlace || '') && !/^https:\/\/cingles\.cl/.test(n.enlace);
      var nombre = String(n.imagen || '').replace(/^img\//, '');
      return '<li class="noticia"><a href="' + escapar(n.enlace || 'https://instagram.com/sunvalleycollege/') + '"' +
        (externo ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<div class="foto" data-nombre="' + escapar(nombre) + '">' +
        '<img src="' + escapar(n.imagen) + '" alt="" width="1200" height="800" loading="lazy" decoding="async" data-nombre="' + escapar(nombre) + '" onerror="sinFoto(this)">' +
        '</div>' +
        '<time datetime="' + escapar(n.fecha) + '">' + escapar(formatoFecha(n.fecha)) + '</time>' +
        '<h3>' + escapar(n.titulo) + '</h3>' +
        '<p>' + escapar(n.bajada) + '</p>' +
        '</a></li>';
    }).join('');
  }

  /* ------------------------------------------------------------------
     Video institucional: fachada liviana, YouTube solo al hacer clic
     ------------------------------------------------------------------ */
  $$('.video-fachada').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var id = boton.getAttribute('data-youtube');
      if (!id) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      iframe.title = boton.getAttribute('data-titulo') || 'Video institucional';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      boton.replaceWith(iframe);
      iframe.focus();
    });
  });

  /* ------------------------------------------------------------------
     Formularios: validación en español + envío con Formspree
     ------------------------------------------------------------------ */
  var MENSAJES = {
    email: 'Escribe un correo válido, por ejemplo nombre@correo.cl.',
    tel: 'Escribe un teléfono chileno de 9 dígitos, por ejemplo +56 9 1234 5678.',
    url: 'Pega un enlace válido que empiece con https://, por ejemplo de Google Drive.',
    casilla: 'Debes marcar esta autorización para poder enviar el formulario.',
    requerido: 'Este campo es obligatorio.'
  };

  function validarCampo(campo) {
    var valor = (campo.value || '').trim();
    var error = '';
    if (campo.type === 'checkbox') {
      if (campo.required && !campo.checked) error = campo.dataset.error || MENSAJES.casilla;
    } else if (campo.required && !valor) {
      error = campo.dataset.error || MENSAJES.requerido;
    } else if (valor && campo.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
      error = MENSAJES.email;
    } else if (valor && campo.type === 'tel') {
      var digitos = valor.replace(/\D/g, '').replace(/^56/, '');
      if (!/^9\d{8}$/.test(digitos) && !/^[2-7]\d{8}$/.test(digitos)) error = MENSAJES.tel;
    } else if (valor && campo.type === 'url' && !/^https?:\/\/\S+\.\S+/.test(valor)) {
      error = MENSAJES.url;
    }
    var caja = document.getElementById(campo.id + '-error');
    if (caja) caja.textContent = error;
    if (error) campo.setAttribute('aria-invalid', 'true'); else campo.removeAttribute('aria-invalid');
    return !error;
  }

  $$('form[data-formulario]').forEach(function (form) {
    var campos = $$('input:not([type="hidden"]):not([name="_gotcha"]), select, textarea', form);
    var avisoError = $('.aviso--error', form);
    var boton = $('button[type="submit"]', form);
    var textoBoton = boton.textContent;

    campos.forEach(function (campo) {
      // Valida al salir del campo y corrige en vivo si ya tenía error
      campo.addEventListener('blur', function () { if (campo.value || campo.type === 'checkbox') validarCampo(campo); });
      campo.addEventListener('input', function () { if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo); });
      campo.addEventListener('change', function () { if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo); });
    });

    var mostrarError = function (texto) {
      avisoError.innerHTML = texto;
      avisoError.hidden = false;
      avisoError.focus();
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      avisoError.hidden = true;

      var primeroConError = null;
      campos.forEach(function (campo) {
        if (!validarCampo(campo) && !primeroConError) primeroConError = campo;
      });
      if (primeroConError) { primeroConError.focus(); return; }

      var tarjeta = form.closest('.tarjeta-formulario');
      var exito = function () {
        var titulo = form.dataset.exitoTitulo || 'Mensaje enviado';
        var texto = form.dataset.exitoTexto || 'Te contactaremos en un plazo de 48 horas hábiles.';
        tarjeta.innerHTML =
          '<div class="exito" role="status" tabindex="-1">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>' +
          '<h3>' + titulo + '</h3><p>' + texto + '</p></div>';
        $('.exito', tarjeta).focus();
      };

      // Honeypot: si un robot llenó el campo oculto, fingimos éxito sin enviar
      var trampa = $('[name="_gotcha"]', form);
      if (trampa && trampa.value) { exito(); return; }

      var destino = form.getAttribute('action');
      if (!destino) {
        mostrarError('El formulario todavía no está conectado, así que tu mensaje no se envió. ' +
          'Por favor llámanos al <a href="tel:+56926042383">' + TELEFONO + '</a> o escríbenos a ' +
          '<a href="mailto:' + CORREO + '">' + CORREO + '</a>.');
        return;
      }

      boton.disabled = true;
      boton.textContent = 'Enviando…';

      fetch(destino, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('respuesta ' + r.status);
          exito();
        })
        .catch(function () {
          boton.disabled = false;
          boton.textContent = textoBoton;
          mostrarError('No pudimos enviar tu mensaje. Puede ser un problema de conexión o del servicio de formularios. ' +
            'Tus datos siguen escritos: inténtalo de nuevo en unos minutos o llámanos al ' +
            '<a href="tel:+56926042383">' + TELEFONO + '</a>.');
        });
    });
  });
})();
