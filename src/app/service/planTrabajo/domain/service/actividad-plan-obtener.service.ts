import { Injectable } from '@angular/core';
import { ActividadPlanAdapter } from '../../infraestructure/actividad-plan.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { Paginacion } from '../../../common/model/paginacion';
import { ListarActividadPlan } from '../model/proyecciones/listarActividadPlan';
import { ListarActividadxId } from '../model/proyecciones/listarActividadxId';

@Injectable({
  providedIn: 'root'
})
export class ActividadPlanObtenerService {

  constructor(private actividadPlanAdapter: ActividadPlanAdapter) { }

  listarActividadxPlan(
    idPlan: number,
    pageNo: number,
    pageSize: number,
    fechaInicio: string,
    fechaFin: string
  ): Observable<Respuesta<Paginacion<ListarActividadPlan>>> {
    return this.actividadPlanAdapter.obtenerActividadesPlanPaginado(idPlan,pageNo,pageSize,fechaInicio,fechaFin);
  }
  obtenerActividadxId(idActividad:number):Observable<Respuesta<ListarActividadxId>>{
    return this.actividadPlanAdapter.obtenerActividadxId(idActividad);
  }
}
