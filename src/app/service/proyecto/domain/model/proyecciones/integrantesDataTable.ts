import { RolProyecto } from "../enum/rolProyecto";
import { IntegrantesProyeccion } from "./proyectoInformaciónDetalladaProyección";

export class IntegranteDataTable {
  id: number;
  integrante: string;
  rol: RolProyecto;

  constructor(integrantesProyeccion: IntegrantesProyeccion){
    this.id = integrantesProyeccion.id;
    this.integrante = integrantesProyeccion.usuario.nombre + " " + integrantesProyeccion.usuario.apellido;
    this.rol = integrantesProyeccion.rolProyecto.nombre;
  }
}

export class IntegrantesDataTable {
  integrantes: IntegranteDataTable[];

  constructor(integrantesProyeccion: IntegrantesProyeccion[]){
    this.integrantes = [];
    
    integrantesProyeccion.forEach(integrante => {
      this.integrantes.push(new IntegranteDataTable(integrante));
    });
    
  }
}

