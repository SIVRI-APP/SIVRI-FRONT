import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { ListarObservacionSemilleroProyeccion } from '../domain/model/proyecciones/listarObservacionSemilleroProyeccion';

@Injectable({
  providedIn: 'root'
})
export class ObservacionSemilleroAdapter {
  apiUrl = environment.urlApi + 'observacionSemillero/';
  constructor(
    private http: HttpClient,
  ) { }
  obtenerObservacionesxSemilleroId(
    semilleroId: string = '',
    pageNo: number = 0,
    pageSize: number = 2,
  ): Observable<Respuesta<Paginacion<ListarObservacionSemilleroProyeccion>>> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('semilleroId', semilleroId);
    return this.http.get<Respuesta<Paginacion<ListarObservacionSemilleroProyeccion>>>(this.apiUrl + 'listarObservacionSemilleroPorIdSemillero',{params:params});
  }
}
