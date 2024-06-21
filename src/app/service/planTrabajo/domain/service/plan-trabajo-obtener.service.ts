import { Injectable } from '@angular/core';
import { PlanTrabajoAdapter } from '../../infraestructure/plan-trabajo.adapter';
import { Respuesta } from '../../../common/model/respuesta';
import { Paginacion } from '../../../common/model/paginacion';
import { ObtenerPlanTrabajoxAnio } from '../model/proyecciones/obtenerPlanTrabajoxAnio';
import { Observable } from 'rxjs';
import { PlanTrabajo } from '../model/proyecciones/planTrabajo';

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


  obtenerPlanTrabajoxAnio(
    pageNo: number ,
    pageSize: number ,
    anio: Number,
    idSemillero:string,
    fechaInicio?: Date,
    fechaFin?: Date
  ):Observable<Respuesta<Paginacion<ObtenerPlanTrabajoxAnio>>>{
    console.log('datos del servicio----------------'+pageNo+','+pageSize+','+anio,idSemillero+','+fechaInicio+','+fechaFin);
    return this.planTrabajoAdapter.obtenerPlanTrabajoxAnio(pageNo,pageSize,anio,idSemillero,fechaInicio,fechaFin);
  }

}
