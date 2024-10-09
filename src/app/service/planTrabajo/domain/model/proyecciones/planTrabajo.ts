import { SemilleroProyeccion } from "../../../../semilleros/domain/model/proyecciones/semilleroProyeccion";
import { EstadoPlantrabajo } from "../enum/EstadoPlanTrabajo";

export interface PlanTrabajo{
  id:number;
  nombrePlan:string;
  estado:EstadoPlantrabajo;
  idSemillero:number;
  anio:number;
}
