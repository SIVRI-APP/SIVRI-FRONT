import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { ListarProgramas } from '../../academica/domain/model/proyecciones/listarProgramas';
import { Paginacion } from '../../common/model/paginacion';
import { ListarProgramaSemilleroProyeccion } from '../../academica/domain/model/proyecciones/listarProgramaSemilleroProyeccion';

@Injectable({
  providedIn: 'root'
})
export class SemilleroProgramasAdapter {
  private apiUrl = environment.urlApi + 'semillerosProgramas/';

  constructor(private http: HttpClient) { }

  obtenerProgramasxSemilleroId(
    semilleroId: string = '',
    pageNo: number = 0,
    pageSize: number = 100,
  ): Observable<Respuesta<Paginacion<ListarProgramas>>> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('semilleroId', semilleroId);
     return this.http.get<Respuesta<Paginacion<ListarProgramas>>>(this.apiUrl + 'obtenerProgramasPorSemilleroId', { params: params });
  }
  crearProgramaSemillero(
    idSemillero: string='',
    programaId: string
  ): Observable<Respuesta<boolean>> {
    let params = new HttpParams()
    .set('idSemillero', idSemillero)
    .set('programaId', programaId);
    return this.http.post<Respuesta<boolean>>(this.apiUrl + `crearProgramaSemillero?programaId=${programaId}&idSemillero=${idSemillero}`,{params:params});
  }

  eliminarProgramaSemillero(
    idPrograma: number
  ): Observable<Respuesta<boolean>> {
    return this.http.delete<Respuesta<boolean>>(this.apiUrl + `eliminarSemilleroPrograma/${idPrograma}`);
  }
}
