import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { ListarDisciplinaxGrupoIdProyeccion } from '../domain/model/proyecciones/listarDisciplinasxGrupoIdProyeccion';

@Injectable({
  providedIn: 'root'
})
export class GrupoDisciplinaObtenerAdapter {
  private apiUrl= environment.urlApi+ 'gruposDisciplinas/';
  constructor(private http: HttpClient) { }

  //obtener disciplinas x grupo id
  obtenerDisciplinasxGrupoId(
    grupoId: number
  ):Observable<Respuesta<ListarDisciplinaxGrupoIdProyeccion[]>>{
    let params = new HttpParams().set('idGrupo',grupoId)
    return this.http.get<Respuesta<ListarDisciplinaxGrupoIdProyeccion[]>>(this.apiUrl+'listarDisciplinasxGrupoId',{params:params});
  }
}
