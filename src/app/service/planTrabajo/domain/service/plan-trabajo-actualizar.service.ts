import { Injectable } from '@angular/core';
import { PlanTrabajoAdapter } from '../../infraestructure/plan-trabajo.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoActualizarService {

  constructor(private plantrabajoAdapter: PlanTrabajoAdapter) { }
  actualizarPlanTrabajo(idPlan:number,body:{
    nombrePlan: string,
      anio: number,
      estado: string
  }):Observable<Respuesta<boolean>>{
    return this.plantrabajoAdapter.actualizarPlanTrabajo(idPlan,body);
  }
}
