import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TipoDocumento } from '../domain/model/enum/tipoDocumento';
import { TipoUsuario } from '../domain/model/enum/tipoUsuario';
import { Respuesta } from '../../common/respuesta';
import { Paginacion } from '../../common/paginacion';
import { UsuarioSolicitudListarConFiltroProjection } from '../domain/model/UsuarioSolicitudListarConFiltro.projection';
import { UsuarioSolicitudObtenerCU } from '../application/UsuarioSolicitudObtenerCU';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudObtenerAdapter extends UsuarioSolicitudObtenerCU {
  private apiUrl = environment.urlApi + 'usuarioSolicitud/';

  constructor(private http: HttpClient) {
    super();
  }

  listarConFiltro(
    pageNo: number,
    pageSize: number,
    correo?: string | undefined,
    estado?: string | undefined,
    tipoDocumento?: TipoDocumento | undefined,
    numeroDocumento?: string | undefined,
    nombres?: string | undefined,
    apellidos?: string | undefined,
    tipoUsuario?: TipoUsuario | undefined
  ): Observable<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>>> {

    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());

    // Añade condicionalmente los otros parámetros si existen.
    if (correo !== undefined) params = params.set('correo', correo);
    if (estado !== undefined) params = params.set('estado', estado);
    if (tipoDocumento !== undefined) params = params.set('tipoDocumento', tipoDocumento);
    if (numeroDocumento !== undefined) params = params.set('numeroDocumento', numeroDocumento);
    if (nombres !== undefined) params = params.set('nombres', nombres);
    if (apellidos !== undefined) params = params.set('apellidos', apellidos);
    if (tipoUsuario !== undefined) params = params.set('tipoUsuario', tipoUsuario);
  
    return this.http.get<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>>>(this.apiUrl + 'listarTodoConFiltro', { params: params });
  }
}
