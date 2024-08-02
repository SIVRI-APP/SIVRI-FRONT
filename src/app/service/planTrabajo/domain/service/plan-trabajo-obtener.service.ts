import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { Paginacion } from '../../../common/model/paginacion';
import { ObtenerPlanTrabajoxAnio } from '../model/proyecciones/obtenerPlanTrabajoxAnio';
import { Observable } from 'rxjs';
import { PlanTrabajo } from '../model/proyecciones/planTrabajo';
import { ListarPlanTrabajo } from '../model/proyecciones/listarPlanTrabajo';
import { PlanTrabajoAdapter } from '../../infraestructure/plan-trabajo.adapter';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoObtenerService {

  constructor(private planTrabajoAdapter: PlanTrabajoAdapter) { }

  ObtenerPlanTrabajoxId(
    id:number
  ):Observable<Respuesta<PlanTrabajo>>{
    return this.planTrabajoAdapter.obtenerPlanTrabajoxId(id);
  }

  listarPlanTrabajo(
    pageNo: number = 0,
    pageSize: number = 2,
    anio: string,
    idSemillero: string,
    estado: string
  ): Observable<Respuesta<Paginacion<ListarPlanTrabajo>>> {
    return this.planTrabajoAdapter.listarPlanTrabajoxFiltro(pageNo,pageSize,anio,idSemillero,estado);
  }
  obtenerPlanTrabajoxAnio(
    pageNo: number ,
    pageSize: number ,
    anio: Number,
    idSemillero:string,
    fechaInicio?: Date,
    fechaFin?: Date
  ):Observable<Respuesta<Paginacion<ObtenerPlanTrabajoxAnio>>>{
    return this.planTrabajoAdapter.obtenerPlanTrabajoxAnio(pageNo,pageSize,anio,idSemillero,fechaInicio,fechaFin);
  }

}
