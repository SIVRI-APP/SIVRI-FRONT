// Definimos la interfaz para el usuario
export interface ObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion {
  id: number;
  nombre: string;
  apellido: string;
}

// Definimos la interfaz para los integrantes que incluye la interfaz de usuario
export interface IntegranteObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion {
  id: number;
  usuario: ObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion;
}

// Definimos la interfaz principal que incluye la interfaz de los integrantes
export interface GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion {
  id: number;
  nombre: string;
  integrantes: IntegranteObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion[];
}
