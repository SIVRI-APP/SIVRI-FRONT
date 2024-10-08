import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { RolProyectoProyeccion } from '../domain/model/proyecciones/rolProyectoProyeccion';
import { TipoUsuario } from '../../solicitudUsuarios/domain/model/enum/tipoUsuario';


@Injectable({
  providedIn: 'root',
})
export class RolProyectoAdapter {
  private apiUrl = environment.urlApi + 'rol-proyecto/';

  constructor(private http: HttpClient) { }

  listarRoles(
    tipoUsuario: TipoUsuario,
    proyectoId: number
  ): Observable<Respuesta<RolProyectoProyeccion[]>> {

    let params = new HttpParams()
    .set('tipoUsuario', tipoUsuario.toString())
    .set('proyectoId', proyectoId.toString())
  
    return this.http.get<Respuesta<RolProyectoProyeccion[]>>(this.apiUrl + 'listarRoles', { params: params });
  }

  obtenesRolesParaAsignarRolProyecto(
    usuarioId: string,
    proyectoId: number
  ): Observable<Respuesta<RolProyectoProyeccion[]>> {

    let params = new HttpParams()
    .set('usuarioId', usuarioId)
    .set('proyectoId', proyectoId.toString())

    return this.http.get<Respuesta<RolProyectoProyeccion[]>>(this.apiUrl + 'obtenesRolesParaAsignarRolProyecto', { params: params });
  }

}
