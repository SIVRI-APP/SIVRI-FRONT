import { Injectable } from '@angular/core';
import { ActividadPlanAdapter } from '../../infraestructure/actividad-plan.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { Paginacion } from '../../../common/model/paginacion';
import { ListarActividadPlan } from '../model/proyecciones/listarActividadPlan';

@Injectable({
  providedIn: 'root'
})
export class ActividadPlanObtenerService {

  constructor(private actividadPlanAdapter: ActividadPlanAdapter) { }

  listarActividadxPlan(
    idPlan: number,
    pageNo: number,
    pageSize: number,
    fechaInicio: Date,
    fechaFin: Date
  ): Observable<Respuesta<Paginacion<ListarActividadPlan>>> {
    return this.actividadPlanAdapter.obtenerActividadesPlanPaginado(idPlan,pageNo,pageSize,fechaInicio,fechaFin);
  }

}
