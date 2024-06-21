import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { IntegrantesMentores } from '../domain/model/proyecciones/integrantesMentores';

@Injectable({
  providedIn: 'root'
})
export class IntegrantesGrupoAdapter {
  private apiUrl=environment.urlApi+'integrantes/';
  constructor(private http: HttpClient) { }

  obtenerIntegrantesGrupoId(
    idGrupo:number
  ):Observable<Respuesta<IntegrantesMentores[]>>{
    let params = new HttpParams().set('idGrupo',idGrupo);
    return this.http.get<Respuesta<IntegrantesMentores[]>>(this.apiUrl+'integrantesMentoresPorGrupoId',{params:params});
  }
}
