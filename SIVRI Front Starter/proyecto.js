var datosProyectoJSON = [
  {
    id: "1",
    tituloProyecto: "Proyecto A1",
    convocatoria: "Convocatoria 2023",
    fechaInicio: "2023-08-01",
    fechaFin: "2023-12-31",
    estado: "Aprobado",
    directorProyecto: "Juan Pérez",
    organismoDeInvestigacion: "Universidad XYZ",
    planteamiento: "El proyecto busca investigar...",
    objetivoGeneral: "El objetivo general del proyecto es...",
    objetivosEspecificos: ["Investigar...", "Analizar...", "Desarrollar..."],
    justificacion: "La investigación es relevante...",
    enfoqueMetodologico: "Se utilizará un enfoque cuantitativo...",
    aspectosEticosLegales: "Se respetarán los aspectos éticos...",
    manejoDeConfidencialidadDeLaInformacion: "La información recopilada...",
    efectosAdversos: "No se anticipan efectos adversos...",
    impactoYResultadosEsperados: "Se espera que los resultados...",
    observaciones: "Se requiere más financiamiento...",
    integrantes: [
      {
        rol: "Investigador Principal",
        nombre: "Juan Pérez",
        numeroDocumento: "1231",
      },
      {
        rol: "Investigador Asociado",
        nombre: "María Gómez",
        numeroDocumento: "1232",
      },
    ],
    cooperaciones: [
      {
        organismoDeInvestigacion: "Instituto ABC",
      },
    ],
    lineasDeInvestigacionProyecto: [
      {
        nombre: "Ciencias Sociales",
      },
      {
        nombre: "Tecnología y Desarrollo",
      },
    ],
    documentosProyecto: [
      {
        nombre: "Propuesta de Proyecto",
        estado: "Aprobado",
        administrativo: "Sí",
        obligatorio: "Sí",
        estapa: "Inicio",
        cantidad: "1",
        rutaAlmacenamiento:
          "https://ruta-documentos.com/proyecto1/propuesta.pdf",
      },
      {
        nombre: "Informe de Avance",
        estado: "En proceso",
        administrativo: "No",
        obligatorio: "Sí",
        estapa: "Desarrollo",
        cantidad: "2",
        rutaAlmacenamiento:
          "https://ruta-documentos.com/proyecto1/informe1.pdf",
      },
    ],
    compromisos: [
      {
        nombre: "Entrega de Resultados Finales",
        rutaAlmacenamiento:
          "https://ruta-documentos.com/proyecto1/resultados-finales.pdf",
        estado: "Cumplido",
      },
    ],
  },
];

// Obtener los parámetros de la URL
var urlParams = new URLSearchParams(window.location.search);
// Obtener el valor de un parámetro específico
var proyectoId = urlParams.get("id");

