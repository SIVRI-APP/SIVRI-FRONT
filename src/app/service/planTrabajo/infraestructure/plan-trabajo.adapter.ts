import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { ObtenerPlanTrabajoxAnio } from '../domain/model/proyecciones/obtenerPlanTrabajoxAnio';
import { PlanTrabajo } from '../domain/model/proyecciones/planTrabajo';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoAdapter {
  private apiUrl= environment.urlApi + 'planesTrabajo/';
  constructor(private http: HttpClient) { }

  obtenerPlanTrabajoxId(
    id:number
  ):Observable<Respuesta<PlanTrabajo>>{
    let params= new HttpParams()
    .set('id',id);
    return this.http.get<Respuesta<PlanTrabajo>>(this.apiUrl+'obtenerPlanxId',{params:params});
  }

  obtenerPlanTrabajoxAnio(
    pageNo: number = 0,
    pageSize: number = 2,
    anio: Number,
    idSemillero: string,
    fechaInicio?: Date ,
    fechaFin?: Date

  ):Observable<Respuesta<Paginacion<ObtenerPlanTrabajoxAnio>>>{
    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString())
    .set('anio',anio.toString())
    .set('idSemillero',idSemillero);
    // Añade condicionalmente los otros parámetros si existen.
    if(fechaInicio!=undefined) params=params.set('fechaInicio', fechaInicio.toDateString());
    if(fechaFin!=undefined) params=params.set('fechaFin',fechaFin.toISOString());
    return this.http.get<Respuesta<Paginacion<ObtenerPlanTrabajoxAnio>>>(this.apiUrl + 'obtenerPlanTrabajoxAnio',{params:params});
  }

  crearPlanTrabajo(
    body:{
      idSemillero:string,
      nombrePlan:string,
      anio:number,
      estado:string
    }
  ):Observable<Respuesta<boolean>>{
    return this.http.post<Respuesta<boolean>>(this.apiUrl+'crearPlanTrabajo',body);
  }
}
