// Proyectos Data

var datosProyectoJSON = [
  {
    id: 1,
    titulo: "Proyecto A",
    estado: "Aprobado",
    fechaInicio: "2023-01-10",
    fechaFin: "2023-05-15",
    director: "Juan Pérez",
  },
  {
    id: 2,
    titulo: "Proyecto B",
    estado: "Ejecucion",
    fechaInicio: "2023-02-20",
    fechaFin: "2023-07-30",
    director: "María Gómez",
  },
  {
    id: 3,
    titulo: "Proyecto C",
    estado: "Ejecucion Prorroga",
    fechaInicio: "2023-03-15",
    fechaFin: "2023-08-16",
    director: "Luis Rodríguez",
  },
  {
    id: 4,
    titulo: "Proyecto D",
    estado: "Eliminado",
    fechaInicio: "2023-04-05",
    fechaFin: "2023-09-25",
    director: "Ana Martínez",
  },
  {
    id: 5,
    titulo: "Proyecto E",
    estado: "Formulado",
    fechaInicio: "2023-05-20",
    fechaFin: "2023-08-10",
    director: "Carlos Sánchez",
  },
  {
    id: 6,
    titulo: "Proyecto F",
    estado: "Formulado con Observaciones",
    fechaInicio: "2023-06-10",
    fechaFin: "2023-09-16",
    director: "Laura Ramírez",
  },
  {
    id: 7,
    titulo: "Proyecto G",
    estado: "Revision Comite Etica",
    fechaInicio: "2023-07-01",
    fechaFin: "2023-10-05",
    director: "Miguel Torres",
  },
  {
    id: 8,
    titulo: "Proyecto H",
    estado: "Revision VRI",
    fechaInicio: "2023-08-05",
    fechaFin: "2023-12-20",
    director: "Elena Fernández",
  },
  {
    id: 9,
    titulo: "Proyecto I",
    estado: "Suspendido",
    fechaInicio: "2023-09-15",
    fechaFin: "2023-11-10",
    director: "Pedro Navarro",
  },
  {
    id: 10,
    titulo: "Proyecto J",
    estado: "Terminado",
    fechaInicio: "2023-10-10",
    fechaFin: "2023-12-25",
    director: "Sofía López",
  },
  {
    id: 11,
    titulo: "Proyecto K",
    estado: "Terminado con Pendientes",
    fechaInicio: "2023-11-20",
    fechaFin: "2024-03-15",
    director: "Andrés Mendoza",
  },
  {
    id: 12,
    titulo: "Proyecto L",
    estado: "Aprobado",
    fechaInicio: "2023-12-10",
    fechaFin: "2024-02-05",
    director: "Isabel Cruz",
  },
  {
    id: 13,
    titulo: "Proyecto M",
    estado: "Ejecucion",
    fechaInicio: "2024-01-05",
    fechaFin: "2024-05-20",
    director: "Hugo Ramírez",
  },
  {
    id: 14,
    titulo: "Proyecto N",
    estado: "Ejecucion Prorroga",
    fechaInicio: "2024-02-20",
    fechaFin: "2024-06-30",
    director: "Daniela Vargas",
  },
  {
    id: 15,
    titulo: "Proyecto O",
    estado: "Eliminado",
    fechaInicio: "2024-03-15",
    fechaFin: "2024-07-10",
    director: "Gustavo López",
  },
  {
    id: 16,
    titulo: "Proyecto P",
    estado: "Formulado",
    fechaInicio: "2024-04-10",
    fechaFin: "2024-08-05",
    director: "Paula Martínez",
  },
  {
    id: 17,
    titulo: "Proyecto Q",
    estado: "Formulado con Observaciones",
    fechaInicio: "2024-05-20",
    fechaFin: "2024-09-15",
    director: "Roberto Sánchez",
  },
  {
    id: 18,
    titulo: "Proyecto R",
    estado: "Revision Comite Etica",
    fechaInicio: "2024-06-10",
    fechaFin: "2024-10-20",
    director: "Marina Gómez",
  },
  {
    id: 19,
    titulo: "Proyecto S",
    estado: "Revision VRI",
    fechaInicio: "2024-07-01",
    fechaFin: "2024-11-10",
    director: "Antonio Torres",
  },
  {
    id: 20,
    titulo: "Proyecto T",
    estado: "Suspendido",
    fechaInicio: "2024-08-05",
    fechaFin: "2024-12-20",
    director: "María Fernández",
  },
];

// Popular la tabla cuando se da click sobre el boton Buscar
// Obtener una referencia al botón por su ID
var btnBuscarProyectos = document.getElementById("btnBuscarProyectos");

// Agregar un evento click al botón
btnBuscarProyectos.addEventListener("click", function () {
  buscarProyectos();
});

// Definir la función buscarProyectos
function buscarProyectos() {
  limpiarProyectos();

  // Obtener una referencia a la tabla por su ID
  var tablaProyectos = $("#proyectosDatatable");
  // Obtén la referencia al elemento <tbody> de la tabla Proyectos
  var tbody = document.getElementById("proyectosDatatableBody");

  // Destruir la instancia actual de DataTables
  if ($.fn.DataTable.isDataTable(tablaProyectos)) {
    tablaProyectos.DataTable().destroy();
  }

  // Itera sobre los datos del JSON y agrega filas y celdas a la tabla
  for (var i = 0; i < datosProyectoJSON.length; i++) {
    var fila = tbody.insertRow();

    var datos = datosProyectoJSON[i];
    var columnas = [
      "acciones",
      "id",
      "titulo",
      "estado",
      "fechaInicio",
      "fechaFin",
      "director",
    ];

    // Definimos que icono tendra la accion segun el estado del proyecto
    switch (datos[columnas[3]]) {
      case "Aprobado":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-play"></i></a>';
        break;
      case "Ejecucion":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-pen"></i></a>';
        break;
      case "Ejecucion Prorroga":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-pen"></i></a>';
        break;
      case "Eliminado":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-eye"></i></a>';
        break;
      case "Formulado":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-eye"></i></a>';
        break;
      case "Formulado con Observaciones":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-eye"></i></a>';
        break;
      case "Revision Comite Etica":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-play"></i></a>';
        break;
      case "Revision VRI":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-pen"></i></a>';
        break;
      case "Suspendido":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-pen"></i></a>';
        break;
      case "Terminado":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-eye"></i></a>';
        break;
      case "Terminado con Pendientes":
        var celda = fila.insertCell(0);
        celda.innerHTML =
          '<a href="#" onclick="detallesProyecto(event)"><i class="nav-icon fas fa-pen"></i></a>';
        break;
      default:
        var celda = fila.insertCell(0);
        celda.innerHTML = "error";
    }

    // Almacenamos la informacion en las respectivas columnas
    for (var j = 1; j < columnas.length; j++) {
      var celda = fila.insertCell(j);
      celda.innerHTML = datos[columnas[j]];
    }
  }

  // Reinicializar la tabla con la nueva configuración
  $("#proyectosDatatable")
    .DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
    })
    .buttons()
    .container()
    .appendTo("#proyectosDatatable_wrapper .col-md-6:eq(0)");
}

// Limpiar la tabla y los campos cuando se da click sobre el boton Limpiar
// Obtener una referencia al botón por su ID
var btnLimpiarProyectos = document.getElementById("btnLimpiarProyectos");

// Agregar un evento click al botón
btnLimpiarProyectos.addEventListener("click", function () {
  limpiarProyectos();
});

// Definir la función buscarProyectos
function limpiarProyectos() {
  // Obtener una referencia al botón por su ID
  var inputFechaIncio = (document.getElementById("fechaInicioInput").value =
    "");
  var inputFechaFin = (document.getElementById("fechaFinInput").value = "");
  var selectEstado = (document.getElementById("estadoSelect").value = "");
  var inputTitutloProyecto = (document.getElementById(
    "tituloProyectoInput"
  ).value = "");
  var inputDirectorPoryecto = (document.getElementById(
    "ditectorProyectoInput"
  ).value = "");
  var inputIdPoryecto = (document.getElementById("idProyectoInput").value = "");

  // Reinicializar la tabla con la nueva configuración
  $("#proyectosDatatable").DataTable().clear().draw();
}

//Evento al ingresar a los detalles de un proyecto
function detallesProyecto(event) {
  // Acceder al <tr> padre del <a> en el que se hizo clic
  var fila = event.target.closest("tr");
  // Obtener las celdas de la fila
  var celdas = fila.cells;

  window.location.href = 'http://127.0.0.1:5500/proyecto.html?id=' + celdas[1].textContent;
}
