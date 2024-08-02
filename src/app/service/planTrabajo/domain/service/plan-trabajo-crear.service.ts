import { Injectable } from '@angular/core';
import { PlanTrabajoAdapter } from '../../infraestructure/plan-trabajo.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoCrearService {

  constructor(private plantrabajoAdapter: PlanTrabajoAdapter) { }

  crearPlanTrabajo(
    body:{
      idSemillero:string,
      nombrePlan:string,
      anio:number,
      estado:string
    }
  ):Observable<Respuesta<boolean>>{
    return this.plantrabajoAdapter.crearPlanTrabajo(body);
  }

}
