import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { LineaInvestigacion } from '../domain/model/proyecciones/lineaInvestigacion';
import { LineaInvestigacionProyeccion } from '../domain/model/proyecciones/lineaInvestigacionProyeccion';
import { Paginacion } from '../../common/model/paginacion';
import { EnumTranslationService } from '../../common/enum-translation.service';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionAdapter {
  apiUrl = environment.urlApi + 'lineasInvestigacion/';
  constructor(private http: HttpClient,

  ) { }

  crearLineaInvestigacion(
    body: {
      semilleroId: string,
      linea: string
    }): Observable<Respuesta<boolean>> {
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'asociarLinea', body);
  }

  actualizarLineaInvestigacion(
    idLinea:string,
    body: {
      linea: string
    }):Observable<Respuesta<boolean>> {
      return this.http.patch<Respuesta<boolean>>(this.apiUrl+`actualizarLinea/${idLinea}`,body);
  }

  obtenerLineaxId(
    idLinea:string
  ):Observable<Respuesta<LineaInvestigacion>>{
    return this.http.get<Respuesta<LineaInvestigacion>>(this.apiUrl+`${idLinea}`);
  }

  obtenerLineasPaginadoxSemilleroId(
    semilleroId: string = '',
    pageNo: number = 0,
    pageSize: number = 2,
  ): Observable<Respuesta<Paginacion<LineaInvestigacionProyeccion>>> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('idSemillero', semilleroId)
    return this.http.get<Respuesta<Paginacion<LineaInvestigacionProyeccion>>>(this.apiUrl + 'LineasInvestigacionPorIdSemillero', { params: params });
  }

  obtenerLineasxSemilleroId(
    semilleroId: string = ''
  ): Observable<Respuesta<LineaInvestigacion[]>> {
    let params = new HttpParams().set('idSemillero', semilleroId)
    return this.http.get<Respuesta<LineaInvestigacion[]>>(this.apiUrl + 'LineastotInvestigacionPorIdSemillero', { params: params })
  }

  eliminarLinea(
    idLinea:number
  ):Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(this.apiUrl+`eliminarLinea/${idLinea}`);
  }
}
