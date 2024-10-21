import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { UsuarioListarConFiltroProyeccion } from '../domain/model/proyecciones/usuarioListarConFiltroProyeccion';
import { UsuarioInformaciónDetalladaProyección } from '../domain/model/proyecciones/usuarioInformaciónDetalladaProyección';
import { TipoDocumento } from '../domain/model/enum/tipoDocumento';

@Injectable({
  providedIn: 'root',
})
export class UsuarioAdapter {
  private apiUrl = environment.urlApi + 'usuario/';

  constructor(private http: HttpClient) { }

  listarConFiltro(
    pageNo: number = 0,
    pageSize: number = 10,
    correo?: string,
    tipoDocumento?: string,
    numeroDocumento?: string,
    nombre?: string,
    apellido?: string,
    tipoUsuario?: string
  ): Observable<Respuesta<Paginacion<UsuarioListarConFiltroProyeccion>>> {

    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());

    // Añade condicionalmente los otros parámetros si existen.
    if (correo !== undefined) params = params.set('correo', correo);
    if (tipoDocumento !== undefined) params = params.set('tipoDocumento', tipoDocumento);
    if (numeroDocumento !== undefined) params = params.set('numeroDocumento', numeroDocumento);
    if (nombre !== undefined) params = params.set('nombre', nombre);
    if (apellido !== undefined) params = params.set('apellido', apellido);
    if (tipoUsuario !== undefined) params = params.set('tipoUsuario', tipoUsuario);

    return this.http.get<Respuesta<Paginacion<UsuarioListarConFiltroProyeccion>>>(this.apiUrl + 'listarTodoConFiltro', { params: params });
  }

  obtenerUsuarioInformaciónDetallada(
    usuarioId: string = '0'
  ): Observable<Respuesta<UsuarioInformaciónDetalladaProyección>> {

    let params = new HttpParams()
    .set('usuarioId', usuarioId)

    return this.http.get<Respuesta<UsuarioInformaciónDetalladaProyección>>(this.apiUrl + 'obtenerUsuario', { params: params });
  }

  obtenerUsuarioInformaciónDetalladaPorDoc(
    usuarioNumDoc: string,
    tipoDocumento: TipoDocumento,
  ): Observable<Respuesta<UsuarioInformaciónDetalladaProyección>> {

    let params = new HttpParams()
    .set('usuarioNumDoc', usuarioNumDoc)
    .set('tipoDocumento', tipoDocumento)

    return this.http.get<Respuesta<UsuarioInformaciónDetalladaProyección>>(this.apiUrl + 'obtenerUsuarioPorDoc', { params: params });
  }

}
