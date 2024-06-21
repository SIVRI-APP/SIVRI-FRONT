import { SemilleroProyeccion } from "../../../../semilleros/domain/model/proyecciones/semilleroProyeccion";
import { Programa } from "./programa";

export interface ProgramaSemillero{
  id:number;
  semillero:SemilleroProyeccion;
  programa: Programa;

}
