import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/respuesta';
import { Paginacion } from '../../common/paginacion';
import { UsuarioSolicitudListarConFiltroProyeccion } from '../domain/model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../domain/model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudAdapter {
  private apiUrl = environment.urlApi + 'usuarioSolicitud/';

  constructor(private http: HttpClient) { }

  listarConFiltro(
    pageNo: number = 0,
    pageSize: number = 10,
    correo?: string,
    estado?: string,
    tipoDocumento?: string,
    numeroDocumento?: string,
    nombre?: string,
    apellido?: string,
    tipoUsuario?: string
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

  obtenerSolicitudUsuarioInformaciónDetallada(
    solicitudUsuarioId: string = '0'
  ): Observable<Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>> {

    let params = new HttpParams()
    .set('solicitudUsuarioId', solicitudUsuarioId)
  
    return this.http.get<Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>>(this.apiUrl + 'obtenerSolicitudUsuario', { params: params });
  }

  crearSolicitudUsuario(
    body: {
      tipoDocumento?: string,
      numeroDocumento?: string,
      sexo?: string,
      tipoUsuario?: string,
      nombre?: string,
      apellido?: string,
      telefono?: string,
      cvLac?: string,
      nota?: string,
      programaId?: number,
      organismoDeInvestigacionId?: number,
      rolGrupoId?: number
    }
  ): Observable<Respuesta<boolean>> {
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'crearSolicitudUsuario', body);
  }

  aprobarSolicitudUsuario(
    solicitudUsuarioId: string = '0'
  ): Observable<Respuesta<boolean>> {

    console.log("adapter")
    console.log(solicitudUsuarioId);

    let params = new HttpParams()
    .set('solicitudUsuarioId', solicitudUsuarioId)

    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'aprobar', null, { params: params });
  }
}
