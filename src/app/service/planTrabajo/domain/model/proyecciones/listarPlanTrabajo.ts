import { EstadoPlantrabajo } from "../enum/EstadoPlanTrabajo";

export interface ListarPlanTrabajo{
  id: number;
  nombrePlan:string;
  estado:EstadoPlantrabajo;
  anio:number;
}
