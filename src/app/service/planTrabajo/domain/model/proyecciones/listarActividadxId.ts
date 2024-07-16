import { CompromisoSemillero } from "./compromisoSemillero";

export interface ListarActividadxId{
  id:number;
  actividad: string;
  compromiso: CompromisoSemillero;
  fechaInicio:Date;
  fechaFin:Date;
  responsableUsuarioId: string;
  objetivo: string;
  planTrabajoId: number;
  evidenciaActividad: EvidenciaActividad;

}

export interface EvidenciaActividad{
  id: number;
  evidencia: string;
}
