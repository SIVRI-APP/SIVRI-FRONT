import { Injectable } from '@angular/core';
import { ActividadPlanAdapter } from '../../infraestructure/actividad-plan.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ActividadPlanCrearService {

  constructor(private actividadPlanAdapter: ActividadPlanAdapter) { }

  crearActividad(idPlan:number,
    body:{
      objetivo: string,
      actividad: string,
      idCompromiso:number,
      responsableUsuarioId:string,
      fechaInicio: string,
      fechaFin: string
    }):Observable<Respuesta<boolean>>{
     return this.actividadPlanAdapter.crearActividad(idPlan,body);
  }
  editarActividad(idActividad:number,body:{
    objetivo: string,
    actividad: string,
    fechaInicio: string,
    fechaFin:string,
    idCompromiso:number,
    responsableUsuarioId:string
  }):Observable<Respuesta<boolean>>{
    return this.actividadPlanAdapter.editarActividad(idActividad,body);
  }
}
