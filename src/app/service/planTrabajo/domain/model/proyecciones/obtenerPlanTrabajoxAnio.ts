import { EstadoPlantrabajo } from "../enum/EstadoPlanTrabajo";

export interface ObtenerPlanTrabajoxAnio{
  id:number;
  idPlan:number;
  evidenciaId: number;
  actividad:string;
  compromiso: string;
  fechaInicio: Date;
  fechaFin: Date;
  responsable: string;
}
