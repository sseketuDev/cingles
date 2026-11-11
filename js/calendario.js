/* ==========================================================================
   Calendario de la portada
   --------------------------------------------------------------------------
   Para agregar un evento, copia un bloque { ... } y cambia sus datos.
   La portada muestra solo los eventos desde hoy en adelante, ordenados por
   fecha, de 7 en 7.

   fecha:  año-mes-día, por ejemplo "2026-10-15"
   hasta:  (opcional) último día, para eventos de varios días, por ejemplo "2026-10-20"
   evento: nombre corto (puede incluir la hora, por ejemplo "Muestra de ciencias 10:00")
   cursos: lista entre corchetes. Usa "Colegio" para eventos de todo el colegio.
           Nombres válidos: "Colegio", "Playgroup", "Prekínder", "Kínder",
           "1° básico" … "8° básico", "I° medio", "II° medio", "III° medio", "IV° medio",
           "Funcionarios" (actividades solo del personal)
           También puedes usar los grupos definidos más abajo (INFANT, MEDIA, etc.).

   Cuida las comillas y la coma entre bloques.

   Fuente: Calendario Escolar 2026, Equipo Directivo SVC.
   ========================================================================== */

// Grupos de cursos para no repetir listas largas
var INFANT = ["Playgroup", "Prekínder", "Kínder"];
var BASICA_1_A_6 = ["1° básico", "2° básico", "3° básico", "4° básico", "5° básico", "6° básico"];
var MEDIA_I_A_III = ["I° medio", "II° medio", "III° medio"];
var MEDIA = MEDIA_I_A_III.concat(["IV° medio"]);
var INFANT_A_6 = INFANT.concat(BASICA_1_A_6);
var SEPTIMO_A_III = ["7° básico", "8° básico"].concat(MEDIA_I_A_III);
var SEPTIMO_A_IV = ["7° básico", "8° básico"].concat(MEDIA);
var PRIMERO_A_III = BASICA_1_A_6.concat(SEPTIMO_A_III);
var PRIMERO_A_IV = BASICA_1_A_6.concat(SEPTIMO_A_IV);
var SIMCE_4_6_II = ["4° básico", "6° básico", "II° medio"];
var SIMCE_2_4_6_II = ["2° básico"].concat(SIMCE_4_6_II);
var FUNCIONARIOS = ["Funcionarios"];

window.CALENDARIO = [
  // ---------- Febrero ----------
  { fecha: "2026-02-16", evento: "Ingreso de personal administrativo, auxiliares e informático", cursos: FUNCIONARIOS },
  { fecha: "2026-02-25", evento: "Ingreso del Equipo Directivo y Equipo de Apoyo Pedagógico", cursos: FUNCIONARIOS },
  { fecha: "2026-02-26", evento: "Ingreso nuevos funcionarios", cursos: FUNCIONARIOS },
  { fecha: "2026-02-27", evento: "Ingreso docentes, equipo psicoeducativo y asistentes de aula (08:30 a 13:30 hrs)", cursos: FUNCIONARIOS },

  // ---------- Marzo ----------
  { fecha: "2026-03-02", hasta: "2026-03-03", evento: "Jornada de planificación (08:30 a 13:30 hrs)", cursos: FUNCIONARIOS },
  { fecha: "2026-03-04", hasta: "2026-03-06", evento: "Ingreso de estudiantes Infant a High School (jornada de 08:30 a 13:30 hrs hasta el viernes 06)", cursos: ["Colegio"] },
  { fecha: "2026-03-04", evento: "Acto de bienvenida 2026", cursos: ["Colegio"] },
  { fecha: "2026-03-09", evento: "Día de la mujer", cursos: ["Colegio"] },
  { fecha: "2026-03-16", evento: "Día contra el ciberacoso", cursos: ["Colegio"] },
  { fecha: "2026-03-16", hasta: "2026-03-31", evento: "Aplicación Diagnóstico Integral Socioemocional Inicial (DIA)", cursos: ["Colegio"] },
  { fecha: "2026-03-16", hasta: "2026-03-31", evento: "Pruebas de cobertura curricular diagnóstica Santillana (1° básico a IV° medio) o I Ensayo SIMCE Santillana (4°, 6° y II° A y B). Las asignaturas que rindan ensayo no rinden prueba de cobertura", cursos: PRIMERO_A_IV },
  { fecha: "2026-03-30", evento: "I Reunión de apoderados Infant a 6° básico (18:30 a 19:45 hrs)", cursos: INFANT_A_6 },
  { fecha: "2026-03-31", evento: "I Reunión de apoderados 7° básico a High School (18:30 a 19:45 hrs)", cursos: SEPTIMO_A_IV },

  // ---------- Abril ----------
  { fecha: "2026-04-02", evento: "Día de la Concienciación sobre el Autismo", cursos: ["Colegio"] },
  { fecha: "2026-04-02", evento: "Jueves Santo: jornada de estudiantes de 08:30 a 11:45 hrs", cursos: ["Colegio"] },
  { fecha: "2026-04-03", evento: "Feriado legal: Viernes Santo", cursos: ["Colegio"] },
  { fecha: "2026-04-06", evento: "Día de la Actividad Física y Vida Saludable", cursos: ["Colegio"] },
  { fecha: "2026-04-14", evento: "Olimpiadas de Matemática", cursos: ["Colegio"] },
  { fecha: "2026-04-23", evento: "Día del Libro", cursos: ["Colegio"] },
  { fecha: "2026-04-27", evento: "Día del Carabinero", cursos: ["Colegio"] },
  { fecha: "2026-04-27", hasta: "2026-05-08", evento: "II Ensayo SIMCE Santillana (2°, 4°, 6° y II° A y B)", cursos: SIMCE_2_4_6_II },
  { fecha: "2026-04-27", hasta: "2026-05-08", evento: "I Ensayo PAES Santillana (III° y IV°)", cursos: ["III° medio", "IV° medio"] },
  { fecha: "2026-04-29", evento: "Día de la Convivencia Escolar", cursos: ["Colegio"] },

  // ---------- Mayo ----------
  { fecha: "2026-05-01", evento: "Feriado legal: Día del trabajador", cursos: ["Colegio"] },
  { fecha: "2026-05-14", evento: "Día del Estudiante (salida de estudiantes 13:30 hrs)", cursos: ["Colegio"] },
  { fecha: "2026-05-15", evento: "Día Internacional de la Familia", cursos: ["Colegio"] },
  { fecha: "2026-05-20", evento: "Acto de las Glorias Navales en patio de Infant", cursos: ["Colegio"] },
  { fecha: "2026-05-21", evento: "Feriado legal: Día de las Glorias Navales", cursos: ["Colegio"] },
  { fecha: "2026-05-22", evento: "Interferiado", cursos: ["Colegio"] },
  { fecha: "2026-05-25", hasta: "2026-05-29", evento: "Semana de la Seguridad Escolar - PISE", cursos: ["Colegio"] },
  { fecha: "2026-05-25", evento: "II Reunión de apoderados Infant a 6° básico (18:30 a 19:45 hrs)", cursos: INFANT_A_6 },
  { fecha: "2026-05-26", evento: "II Reunión de apoderados 7° básico a High School (18:30 a 19:45 hrs)", cursos: SEPTIMO_A_IV },

  // ---------- Junio ----------
  { fecha: "2026-06-01", evento: "Inicio de inscripción PAES", cursos: ["IV° medio"] },
  { fecha: "2026-06-05", evento: "Día Mundial del medio ambiente", cursos: ["Colegio"] },
  { fecha: "2026-06-08", hasta: "2026-06-17", evento: "III Ensayo SIMCE Santillana (4°, 6° y II° A y B)", cursos: SIMCE_4_6_II },
  { fecha: "2026-06-08", hasta: "2026-06-17", evento: "II Ensayo PAES Santillana (IV°)", cursos: ["IV° medio"] },
  { fecha: "2026-06-12", evento: "Cierre de notas 1° semestre", cursos: ["Colegio"] },
  { fecha: "2026-06-18", evento: "Último día de clases del primer semestre (salida de estudiantes 13:30 hrs). Envío de informe de notas del primer semestre vía NotasNet", cursos: ["Colegio"] },
  { fecha: "2026-06-19", evento: "Jornada de Planificación, Evaluación y Análisis Curricular: docentes, asistentes de aula y de convivencia (08:30 a 13:30 hrs)", cursos: FUNCIONARIOS },
  { fecha: "2026-06-22", hasta: "2026-07-03", evento: "Vacaciones de invierno", cursos: ["Colegio"] },

  // ---------- Julio ----------
  { fecha: "2026-07-06", evento: "Inicio de clases del segundo semestre", cursos: ["Colegio"] },
  { fecha: "2026-07-16", evento: "Feriado legal", cursos: ["Colegio"] },
  { fecha: "2026-07-17", evento: "Interferiado", cursos: ["Colegio"] },
  { fecha: "2026-07-22", evento: "Finaliza plazo de inscripción PAES regular", cursos: ["IV° medio"] },

  // ---------- Agosto ----------
  { fecha: "2026-08-03", hasta: "2026-08-14", evento: "IV Ensayo SIMCE Santillana (2°, 4°, 6° y II° A y B)", cursos: SIMCE_2_4_6_II },
  { fecha: "2026-08-03", hasta: "2026-08-14", evento: "III Ensayo PAES Santillana (III° y IV°)", cursos: ["III° medio", "IV° medio"] },
  { fecha: "2026-08-12", evento: "Feria de Ciencias", cursos: ["Colegio"] },
  { fecha: "2026-08-17", evento: "Día de la Solidaridad", cursos: ["Colegio"] },
  { fecha: "2026-08-24", evento: "III Reunión de apoderados Infant a 6° básico (18:30 a 19:45 hrs)", cursos: INFANT_A_6 },
  { fecha: "2026-08-25", evento: "III Reunión de apoderados 7° básico a High School (18:30 a 19:45 hrs)", cursos: SEPTIMO_A_IV },
  { fecha: "2026-08-26", evento: "Simulacro PISE", cursos: ["Colegio"] },
  { fecha: "2026-08-28", evento: "II Versión Festival de Bandas SVC", cursos: ["Colegio"] },

  // ---------- Septiembre ----------
  { fecha: "2026-09-09", evento: "Fiesta de la Chilenidad: 1° a 6° básico (jornada finaliza 13:30 hrs)", cursos: BASICA_1_A_6 },
  { fecha: "2026-09-10", evento: "Fiesta de la Chilenidad: 7° básico a IV° medio (jornada finaliza 13:30 hrs)", cursos: SEPTIMO_A_IV },
  { fecha: "2026-09-11", evento: "Fiesta de la Chilenidad: Infant", cursos: INFANT },
  { fecha: "2026-09-14", hasta: "2026-09-18", evento: "Receso Fiestas Patrias", cursos: ["Colegio"] },
  { fecha: "2026-09-21", evento: "Vuelta a clases post receso de Fiestas Patrias", cursos: ["Colegio"] },
  { fecha: "2026-09-21", hasta: "2026-09-30", evento: "V Ensayo SIMCE Santillana (2°, 4°, 6° y II° A y B)", cursos: SIMCE_2_4_6_II },
  { fecha: "2026-09-21", hasta: "2026-09-30", evento: "IV Ensayo PAES Santillana (IV°)", cursos: ["IV° medio"] },

  // ---------- Octubre ----------
  { fecha: "2026-10-01", evento: "Día de la Asistente de la Educación (la celebración se concentrará en el “Día del profesor”)", cursos: ["Colegio"] },
  { fecha: "2026-10-12", evento: "Feriado legal: Encuentro de dos mundos", cursos: ["Colegio"] },
  { fecha: "2026-10-15", evento: "Acto día del profesor y Asistentes de la Educación. Recepción Jardines", cursos: ["Colegio"] },
  { fecha: "2026-10-16", evento: "Feriado día del Profesor", cursos: ["Colegio"] },
  { fecha: "2026-10-23", evento: "III Versión Olimpiadas Deportivas SVC", cursos: ["Colegio"] },
  { fecha: "2026-10-28", evento: "Día uno Aniversario del Colegio (jornada de tarde). Inicio de actividades: 14:00 hrs", cursos: ["Colegio"] },
  { fecha: "2026-10-29", evento: "Día dos Aniversario del Colegio (jornada completa)", cursos: ["Colegio"] },
  { fecha: "2026-10-30", evento: "Celebración Aniversario del Colegio", cursos: ["Colegio"] },

  // ---------- Noviembre ----------
  { fecha: "2026-11-02", hasta: "2026-11-12", evento: "V Ensayo PAES Santillana (III° y IV°)", cursos: ["III° medio", "IV° medio"] },
  { fecha: "2026-11-02", evento: "Última reunión de apoderados IV° medio (18:30 a 19:45 hrs)", cursos: ["IV° medio"] },
  { fecha: "2026-11-06", evento: "English Day", cursos: ["Colegio"] },
  { fecha: "2026-11-13", evento: "Último día IV° medio (10:00 a 12:00 hrs)", cursos: ["IV° medio"] },
  { fecha: "2026-11-16", hasta: "2026-11-20", evento: "Aplicación Diagnóstico Integral Socioemocional Cierre (DIA)", cursos: ["Colegio"] },
  { fecha: "2026-11-20", evento: "Cierre de Actas Cuarto Medio", cursos: ["IV° medio"] },
  { fecha: "2026-11-23", evento: "Última reunión de apoderados Infant a 6° básico (18:30 a 19:45 hrs)", cursos: INFANT_A_6 },
  { fecha: "2026-11-24", evento: "Última reunión de apoderados 7° básico a III° medio (18:30 a 19:45 hrs)", cursos: SEPTIMO_A_III },
  { fecha: "2026-11-25", evento: "Cierre de Promedios e Informes Infant a III° medio", cursos: INFANT.concat(PRIMERO_A_III) },
  { fecha: "2026-11-27", evento: "Cierre de campaña Teletón (por confirmar)", cursos: ["Colegio"] },
  { fecha: "2026-11-30", hasta: "2026-12-02", evento: "Aplicación PAES Regular", cursos: ["IV° medio"] },

  // ---------- Diciembre ----------
  { fecha: "2026-11-30", hasta: "2026-12-04", evento: "Pruebas Santillana de cobertura curricular de cierre (1° básico a III° medio)", cursos: PRIMERO_A_III },
  { fecha: "2026-12-02", evento: "Premiación Infant (jornada de mañana)", cursos: INFANT },
  { fecha: "2026-12-02", evento: "Licenciatura Kínder (jornada de mañana)", cursos: ["Kínder"] },
  { fecha: "2026-12-03", evento: "Premiación 1° a 6° básico (jornada de mañana)", cursos: BASICA_1_A_6 },
  { fecha: "2026-12-03", evento: "Licenciatura 8° básico (jornada de tarde)", cursos: ["8° básico"] },
  { fecha: "2026-12-04", evento: "Premiación 7° básico a III° medio (jornada de mañana)", cursos: SEPTIMO_A_III },
  { fecha: "2026-12-04", evento: "Último día de clases año lectivo 2026", cursos: ["Colegio"] },
  { fecha: "2026-12-04", evento: "Licenciatura IV° medio (jornada de tarde)", cursos: ["IV° medio"] },
  { fecha: "2026-12-23", evento: "Salida de vacaciones de profesores y asistentes de aula", cursos: FUNCIONARIOS }
];
