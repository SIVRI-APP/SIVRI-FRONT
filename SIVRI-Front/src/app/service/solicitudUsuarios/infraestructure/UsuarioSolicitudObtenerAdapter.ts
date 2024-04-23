import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TipoDocumento } from '../domain/model/enum/tipoDocumento';
import { TipoUsuario } from '../domain/model/enum/tipoUsuario';
import { Respuesta } from '../../common/respuesta';
import { Paginacion } from '../../common/paginacion';
import { UsuarioSolicitudListarConFiltroProyeccion } from '../domain/model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudObtenerAdapter {
  private apiUrl = environment.urlApi + 'usuarioSolicitud/';

  constructor(private http: HttpClient) { }

  listarConFiltro(
    pageNo: number = 0,
    pageSize: number = 10,
    correo?: string | undefined,
    estado?: string | undefined,
    tipoDocumento?: TipoDocumento | undefined,
    numeroDocumento?: string | undefined,
    nombre?: string | undefined,
    apellido?: string | undefined,
    tipoUsuario?: TipoUsuario | undefined
  ): Observable<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>> {

    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());

    // Añade condicionalmente los otros parámetros si existen.
    if (correo !== undefined) params = params.set('correo', correo);
    if (estado !== undefined) params = params.set('estado', estado);
    if (tipoDocumento !== undefined) params = params.set('tipoDocumento', tipoDocumento);
    if (numeroDocumento !== undefined) params = params.set('numeroDocumento', numeroDocumento);
    if (nombre !== undefined) params = params.set('nombre', nombre);
    if (apellido !== undefined) params = params.set('apellido', apellido);
    if (tipoUsuario !== undefined) params = params.set('tipoUsuario', tipoUsuario);
  
    return this.http.get<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>>(this.apiUrl + 'listarTodoConFiltro', { params: params });
  }
}
