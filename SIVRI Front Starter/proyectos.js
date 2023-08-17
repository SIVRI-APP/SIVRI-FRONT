// Proyectos Data

var datosProyectoJSON = [
  {
    "Rendering engine": "WebKit",
    Browser: "Safari 1.2",
    "Platform(s)": "OSX.3",
    "Engine version": "125.5",
    "CSS grade": "A",
  },
  {
    "Rendering engine": "Presto",
    Browser: "Opera 7.0",
    "Platform(s)": "Win 95+ / OSX.1+",
    "Engine version": "7",
    "CSS grade": "A",
  },
  {
    "Rendering engine": "Gecko",
    Browser: "Firefox 1.5",
    "Platform(s)": "Win 98+ / OSX.2+",
    "Engine version": "1.8",
    "CSS grade": "A",
  },
  {
    "Rendering engine": "KHTML",
    Browser: "Konqueror 3.1",
    "Platform(s)": "KDE 3.1",
    "Engine version": "3.1",
    "CSS grade": "C",
  },
  {
    "Rendering engine": "Tasman",
    Browser: "Internet Explorer 5.2",
    "Platform(s)": "Mac OS 8-9/X",
    "Engine version": "1",
    "CSS grade": "C",
  },
  {
    "Rendering engine": "Misc",
    Browser: "NetFront 3.1",
    "Platform(s)": "Embedded devices",
    "Engine version": "-",
    "CSS grade": "C",
  },
  {
    "Rendering engine": "Misc",
    Browser: "Nintendo DS ",
    "Platform(s)": "Nintendo DS",
    "Engine version": "8.5",
    "CSS grade": "C/A<sup>1</sup>",
  },
  {
    "Rendering engine": "Misc",
    Browser: "IE Mobile",
    "Platform(s)": "Windows Mobile 6",
    "Engine version": "-",
    "CSS grade": "C",
  },
  {
    "Rendering engine": "Misc",
    Browser: "PlayStation Portable",
    "Platform(s)": "PlayStation Portable",
    "Engine version": "-",
    "CSS grade": "B",
  },
  {
    "Rendering engine": "Other",
    Browser: "All others",
    "Platform(s)": "-",
    "Engine version": "-",
    "CSS grade": "U",
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
      "Rendering engine",
      "Browser",
      "Platform(s)",
      "Engine version",
      "CSS grade",
    ];

    for (var j = 0; j < columnas.length; j++) {
      var celda = fila.insertCell(j);
      celda.innerHTML = datos[columnas[j]];
    }
  }

  // Reinicializar la tabla con la nueva configuración
  $("#proyectosDatatable").DataTable({
    "responsive": true, "lengthChange": false, "autoWidth": false,
    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#proyectosDatatable_wrapper .col-md-6:eq(0)');
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
  var inputFechaIncio = document.getElementById("fechaInicioInput").value = "";
  var inputFechaFin= document.getElementById("fechaFinInput").value = "";;
  var selectEstado = document.getElementById("estadoSelect").value = "";;
  var inputTitutloProyecto = document.getElementById("tituloProyectoInput").value = "";;
  var inputDirectorPoryecto = document.getElementById("ditectorProyectoInput").value = "";;

  // Reinicializar la tabla con la nueva configuración
  $("#proyectosDatatable").DataTable().clear().draw();

}