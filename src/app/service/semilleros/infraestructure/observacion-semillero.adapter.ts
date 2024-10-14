import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { ListarObservacionSemilleroProyeccion } from '../domain/model/proyecciones/listarObservacionSemilleroProyeccion';
import { ObservacionSemillero } from '../domain/model/proyecciones/observacionSemillero';

@Injectable({
  providedIn: 'root'
})
export class ObservacionSemilleroAdapter {
  apiUrl = environment.urlApi + 'observacionSemillero/';
  constructor(
    private http: HttpClient,
  ) { }
  obtenerObservacionxId(
    idObservacion:string = ''
  ): Observable<Respuesta<ObservacionSemillero>>{
    return this.http.get<Respuesta<ObservacionSemillero>>(this.apiUrl+`${idObservacion}`);
  }
  obtenerObservacionesxSemilleroId(
    semilleroId: string = '',
    pageNo: number = 0,
    pageSize: number = 10,
  ): Observable<Respuesta<Paginacion<ListarObservacionSemilleroProyeccion>>> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('semilleroId', semilleroId);
    return this.http.get<Respuesta<Paginacion<ListarObservacionSemilleroProyeccion>>>(this.apiUrl + 'listarObservacionSemilleroPorIdSemillero',{params:params});
  }
  crearObservacion(
    semilleroId: string = '',
    body:{
      observacion:string
    }
  ):Observable<Respuesta<boolean>>{
    return this.http.post<Respuesta<boolean>>(this.apiUrl+`asociarObservacion/${semilleroId}`,body);
  }
  actualizarObservacion(
    idObservacion:string = '',
    body:{observacion:string}
  ):Observable<Respuesta<boolean>>{
    return this.http.patch<Respuesta<boolean>>(this.apiUrl+`actualizarObservacion/${idObservacion}`,body);
  }

}
