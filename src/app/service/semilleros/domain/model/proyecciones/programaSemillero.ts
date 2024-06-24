import { SemilleroProyeccion } from "./semilleroProyeccion";
import { Programa } from "../../../../academica/domain/model/proyecciones/programa";

export interface ProgramaSemillero{
  id:number;
  semillero:SemilleroProyeccion;
  programa: Programa;

}
