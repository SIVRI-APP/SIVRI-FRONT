import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginacion } from '../../common/model/paginacion';
import { ListarActividadPlan } from '../domain/model/proyecciones/listarActividadPlan';
import { Respuesta } from '../../common/model/respuesta';
import { ListarActividadxId } from '../domain/model/proyecciones/listarActividadxId';

@Injectable({
  providedIn: 'root'
})
export class ActividadPlanAdapter {
  private apiUrl = environment.urlApi + 'actividadesPlanTrabajo/';
  constructor(private http: HttpClient) { }

  obtenerActividadesPlanPaginado(
    idPlan: number,
    pageNo: number = 0,
    pageSize: number = 10,
    fechaInicio: string,
    fechaFin: string
  ): Observable<Respuesta<Paginacion<ListarActividadPlan>>> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
      // Añade condicionalmente los otros parámetros si existen.
      if (fechaInicio != null) params = params.set('fechaInicio', fechaInicio);
      if (fechaFin != null) params = params.set('fechaFin', fechaFin);
    return this.http.get<Respuesta<Paginacion<ListarActividadPlan>>>(this.apiUrl + `listarActividadesConFiltro/${idPlan}`, { params: params });
  }
  obtenerActividadxId(idActividad:number):Observable<Respuesta<ListarActividadxId>>{
    return this.http.get<Respuesta<ListarActividadxId>>(this.apiUrl+`${idActividad}`);
  }
  crearActividad(idPlan:number,
    body:{
      objetivo: string,
      actividad: string,
      idCompromiso:number,
      responsableUsuarioId:string,
      fechaInicio: string,
      fechaFin: string
    }
  ):Observable<Respuesta<boolean>>{
    return this.http.post<Respuesta<boolean>>(this.apiUrl+`crearActividadPlanTrabajo/${idPlan}`,body);
  }
  editarActividad(idActividad:number,body:{
    objetivo: string,
    actividad: string,
    fechaInicio: string,
    fechaFin:string,
    idCompromiso:number,
    responsableUsuarioId:string
  }):Observable<Respuesta<boolean>>{
    return this.http.patch<Respuesta<boolean>>(this.apiUrl+`actualizarActividad/${idActividad}`,body);
  }
}
