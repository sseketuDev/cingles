/* ==========================================================================
   Calendario de la portada
   --------------------------------------------------------------------------
   Para agregar un evento, copia un bloque { ... } y cambia sus datos.
   La portada muestra solo los eventos desde hoy en adelante, ordenados por
   fecha, de 7 en 7. Los botones de filtro se crean solos según los cursos
   que aparezcan aquí.

   fecha:  año-mes-día, por ejemplo "2026-10-15"
   evento: nombre corto (puede incluir la hora, por ejemplo "Muestra de ciencias 10:00")
   cursos: lista entre corchetes. Usa "Colegio" para eventos de todo el colegio.
           Nombres válidos: "Colegio", "Playgroup", "Prekínder", "Kínder",
           "1° básico" … "8° básico", "I° medio", "II° medio", "III° medio", "IV° medio"

   Cuida las comillas y la coma entre bloques.
   ========================================================================== */

window.CALENDARIO = [
  // REEMPLAZAR: todos estos eventos son de ejemplo. Borra los que no correspondan.
  { fecha: "2026-10-03", evento: "(Ejemplo) Jornada Sabatina de Admisión 2027", cursos: ["Colegio"] },
  { fecha: "2026-10-08", evento: "(Ejemplo) Reunión de apoderados", cursos: ["Playgroup", "Prekínder", "Kínder"] },
  { fecha: "2026-10-15", evento: "(Ejemplo) Feria científica", cursos: ["5° básico", "6° básico", "7° básico", "8° básico"] },
  { fecha: "2026-10-22", evento: "(Ejemplo) Ensayo de evacuación", cursos: ["Colegio"] },
  { fecha: "2026-10-29", evento: "(Ejemplo) Salida pedagógica", cursos: ["3° básico"] },
  { fecha: "2026-11-05", evento: "(Ejemplo) Exámenes Cambridge", cursos: ["I° medio", "II° medio"] },
  { fecha: "2026-11-12", evento: "(Ejemplo) Muestra de inglés", cursos: ["1° básico", "2° básico"] },
  { fecha: "2026-11-26", evento: "(Ejemplo) Licenciatura de IV° medio", cursos: ["IV° medio"] },
  { fecha: "2026-12-11", evento: "(Ejemplo) Término del año escolar", cursos: ["Colegio"] }
];
