import { RolProyecto } from "../enum/rolProyecto";
import { Integrantes } from "./proyectoDetalladoDTO";

export class IntegranteDataTable {
  id: number;
  integrante: string;
  rol: RolProyecto;
  usuarioId: number;

  constructor(integrantesProyeccion: Integrantes){
    this.id = integrantesProyeccion.id;
    this.integrante = integrantesProyeccion.usuario.nombre + " " + integrantesProyeccion.usuario.apellido;
    this.rol = integrantesProyeccion.rolProyecto.nombre;
    this.usuarioId = integrantesProyeccion.usuario.id
  }
}

export class IntegrantesDataTable {
  integrantes: IntegranteDataTable[];

  constructor(integrantesProyeccion: Integrantes[]){
    this.integrantes = [];
    
    integrantesProyeccion.forEach(integrante => {
      this.integrantes.push(new IntegranteDataTable(integrante));
    });
    
  }
}

