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

// Obtén la referencia al elemento <tbody>
var tbody = document.getElementById("proyectosDatatable");

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

// Espera a que la página se cargue completamente
document.addEventListener("DOMContentLoaded", function () {
  // Obtén el elemento select por su ID
  var estadoSelect = document.getElementById("estadoSelect");

  // Establece el valor seleccionado en una opción vacía (null)
  estadoSelect.value = null;
});