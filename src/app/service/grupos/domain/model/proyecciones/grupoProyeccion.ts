import { Departamento } from "../../../../academica/domain/model/proyecciones/departamento";

export interface GrupoProyeccion{
  grupoId:number;
  nombre:string;
  estado:string;
  fechaCreacion:Date;
  direccion:string;
  telefono:number;
  email:string;
  sitioWeb:string;
  escalafonColciencias:string;
  direccionGrupLac:string;
  codigoColciencias:string;
  centroInvestigaciones:string;
  objetivo:string;
  mision:string;
  vision:string;
  realizaciones:string;
  perspectivas:string;
  departamento:Departamento;

}
