import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoProyeccion } from '../domain/model/proyecciones/grupoProyeccion';
import { Respuesta } from '../../common/model/respuesta';
import { ListarGrupoProyeccion } from '../domain/model/proyecciones/listarGrupoProyeccion';

@Injectable({
  providedIn: 'root'
})
export class GrupoAdapter {

  private apiUrl = environment.urlApi + 'grupos/';
  constructor(private http: HttpClient) { }

  //obtener grupo por idGrupo
  obtenerGrupoInformacionDetallada(
    grupoId: number
  ): Observable<Respuesta<GrupoProyeccion>> {
    let params = new HttpParams().set('idgrupo', grupoId)
    return this.http.get<Respuesta<GrupoProyeccion>>(this.apiUrl + 'obtenerxid', { params: params });
  }
  //obtiene los grupos del usuario que este logeado en el sistema
  obtenerGruposxUsuario(): Observable<Respuesta<ListarGrupoProyeccion[]>> {
    return this.http.get<Respuesta<ListarGrupoProyeccion[]>>(this.apiUrl + 'listarGruposPorIdDirector');
  }
}
