import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { ListarProgramas } from '../domain/model/proyecciones/listarProgramas';
import { Paginacion } from '../../common/model/paginacion';

@Injectable({
  providedIn: 'root'
})
export class SemilleroProgramaObtenerAdapter {
  private apiUrl= environment.urlApi+'semillerosProgramas/';

  constructor(private http: HttpClient) { }

  obtenerProgramasxSemilleroId(
    semilleroId: string='',
    pageNo: number = 0,
    pageSize: number = 100,
  ):Observable<Respuesta<Paginacion<ListarProgramas>>>{
    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString())
    .set('semilleroId',semilleroId);
    return this.http.get<Respuesta<Paginacion<ListarProgramas>>>(this.apiUrl+'obtenerProgramasPorSemilleroId',{params:params});
  }

}
