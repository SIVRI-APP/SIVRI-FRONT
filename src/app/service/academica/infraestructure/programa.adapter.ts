import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { ListarProgramas } from '../domain/model/proyecciones/listarProgramas';
import { Programa } from '../domain/model/proyecciones/programa';

@Injectable({
  providedIn: 'root'
})
export class ProgramaAdapter {
  private apiUrl= environment.urlApi+'programas/';
  constructor(private http: HttpClient) { }

  obtenerProgramas():Observable<Respuesta<Programa[]>>{
    return this.http.get<Respuesta<Programa[]>>(this.apiUrl+'obtenerProgramas');
  }

  obtenerProgramasxdepartamento(
    semilleroId: string=''
  ):Observable<Respuesta<ListarProgramas[]>>{
    let params = new HttpParams()
    .set('semilleroId',semilleroId);
    return this.http.get<Respuesta<ListarProgramas[]>>(this.apiUrl+'obtenerProgramasxdepartamento',{params:params});
  }

}
