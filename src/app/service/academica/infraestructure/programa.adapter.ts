import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { ListarProgramas } from '../domain/model/proyecciones/listarProgramas';

@Injectable({
  providedIn: 'root'
})
export class ProgramaAdapter {
  private apiUrl= environment.urlApi+'programas/';
  constructor(private http: HttpClient) { }

  obtenerProgramasxdepartamento(
    semilleroId: string=''
  ):Observable<Respuesta<ListarProgramas[]>>{
    let params = new HttpParams()
    .set('semilleroId',semilleroId);
    return this.http.get<Respuesta<ListarProgramas[]>>(this.apiUrl+'obtenerProgramasxdepartamento',{params:params});
  }

}
