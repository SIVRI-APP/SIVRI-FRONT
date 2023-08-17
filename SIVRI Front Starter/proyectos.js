// Proyectos Data

var datosProyectoJSON = [
  {
    Acciones: "A1",
    Id: 1,
    Titulo: "Proyecto A",
    Estado: "Aprobado",
    FechaInicio: "2023-01-10",
    FechaFin: "2023-05-15",
    Director: "Juan Pérez",
  },
  {
    Acciones: "A2",
    Id: 2,
    Titulo: "Proyecto B",
    Estado: "Ejecucion",
    FechaInicio: "2023-02-20",
    FechaFin: "2023-07-30",
    Director: "María Gómez",
  },
  {
    Acciones: "A3",
    Id: 3,
    Titulo: "Proyecto C",
    Estado: "Ejecucion Prorroga",
    FechaInicio: "2023-03-15",
    FechaFin: "2023-08-16",
    Director: "Luis Rodríguez",
  },
  {
    Acciones: "A4",
    Id: 4,
    Titulo: "Proyecto D",
    Estado: "Eliminado",
    FechaInicio: "2023-04-05",
    FechaFin: "2023-09-25",
    Director: "Ana Martínez",
  },
  {
    Acciones: "A5",
    Id: 5,
    Titulo: "Proyecto E",
    Estado: "Formulado",
    FechaInicio: "2023-05-20",
    FechaFin: "2023-08-10",
    Director: "Carlos Sánchez",
  },
  {
    Acciones: "A6",
    Id: 6,
    Titulo: "Proyecto F",
    Estado: "Formulado con Observaciones",
    FechaInicio: "2023-06-10",
    FechaFin: "2023-09-16",
    Director: "Laura Ramírez",
  },
  {
    Acciones: "A7",
    Id: 7,
    Titulo: "Proyecto G",
    Estado: "Revision Comite Etica",
    FechaInicio: "2023-07-01",
    FechaFin: "2023-10-05",
    Director: "Miguel Torres",
  },
  {
    Acciones: "A8",
    Id: 8,
    Titulo: "Proyecto H",
    Estado: "Revision VRI",
    FechaInicio: "2023-08-05",
    FechaFin: "2023-12-20",
    Director: "Elena Fernández",
  },
  {
    Acciones: "A9",
    Id: 9,
    Titulo: "Proyecto I",
    Estado: "Suspendido",
    FechaInicio: "2023-09-15",
    FechaFin: "2023-11-10",
    Director: "Pedro Navarro",
  },
  {
    Acciones: "A10",
    Id: 10,
    Titulo: "Proyecto J",
    Estado: "Terminado",
    FechaInicio: "2023-10-10",
    FechaFin: "2023-12-25",
    Director: "Sofía López",
  },
  {
    Acciones: "A11",
    Id: 11,
    Titulo: "Proyecto K",
    Estado: "Terminado con Pendientes",
    FechaInicio: "2023-11-20",
    FechaFin: "2024-03-15",
    Director: "Andrés Mendoza",
  },
  {
    Acciones: "A12",
    Id: 12,
    Titulo: "Proyecto L",
    Estado: "Aprobado",
    FechaInicio: "2023-12-10",
    FechaFin: "2024-02-05",
    Director: "Isabel Cruz",
  },
  {
    Acciones: "A13",
    Id: 13,
    Titulo: "Proyecto M",
    Estado: "Ejecucion",
    FechaInicio: "2024-01-05",
    FechaFin: "2024-05-20",
    Director: "Hugo Ramírez",
  },
  {
    Acciones: "A14",
    Id: 14,
    Titulo: "Proyecto N",
    Estado: "Ejecucion Prorroga",
    FechaInicio: "2024-02-20",
    FechaFin: "2024-06-30",
    Director: "Daniela Vargas",
  },
  {
    Acciones: "A15",
    Id: 15,
    Titulo: "Proyecto O",
    Estado: "Eliminado",
    FechaInicio: "2024-03-15",
    FechaFin: "2024-07-10",
    Director: "Gustavo López",
  },
  {
    Acciones: "A16",
    Id: 16,
    Titulo: "Proyecto P",
    Estado: "Formulado",
    FechaInicio: "2024-04-10",
    FechaFin: "2024-08-05",
    Director: "Paula Martínez",
  },
  {
    Acciones: "A17",
    Id: 17,
    Titulo: "Proyecto Q",
    Estado: "Formulado con Observaciones",
    FechaInicio: "2024-05-20",
    FechaFin: "2024-09-15",
    Director: "Roberto Sánchez",
  },
  {
    Acciones: "A18",
    Id: 18,
    Titulo: "Proyecto R",
    Estado: "Revision Comite Etica",
    FechaInicio: "2024-06-10",
    FechaFin: "2024-10-20",
    Director: "Marina Gómez",
  },
  {
    Acciones: "A19",
    Id: 19,
    Titulo: "Proyecto S",
    Estado: "Revision VRI",
    FechaInicio: "2024-07-01",
    FechaFin: "2024-11-10",
    Director: "Antonio Torres",
  },
  {
    Acciones: "A20",
    Id: 20,
    Titulo: "Proyecto T",
    Estado: "Suspendido",
    FechaInicio: "2024-08-05",
    FechaFin: "2024-12-20",
    Director: "María Fernández",
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
      "Acciones",
      "Id",
      "Titulo",
      "Estado",
      "FechaInicio",
      "FechaFin",
      "Director",
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
        celda.innerHTML = datos[columnas[0]];
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

  alert(celdas[1].textContent);
}
