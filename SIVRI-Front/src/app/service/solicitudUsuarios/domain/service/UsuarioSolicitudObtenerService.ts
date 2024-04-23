import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TipoDocumento } from '../model/enum/tipoDocumento';
import { TipoUsuario } from '../model/enum/tipoUsuario';
import { UsuarioSolicitudListarConFiltroProyeccion } from '../model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { Paginacion } from '../../../common/paginacion';
import { Respuesta } from '../../../common/respuesta';
import { UsuarioSolicitudObtenerAdapter } from '../../infraestructure/UsuarioSolicitudObtenerAdapter';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudObtenerService {
  constructor(private usuarioSolicitudObtenerAdapter: UsuarioSolicitudObtenerAdapter) {}

  listarConFiltro(
    pageNo?: number | undefined,
    pageSize?: number | undefined,
    correo?: string | undefined,
    estado?: string | undefined,
    tipoDocumento?: TipoDocumento | undefined,
    numeroDocumento?: string | undefined,
    nombre?: string | undefined,
    apellido?: string | undefined,
    tipoUsuario?: TipoUsuario | undefined
  ): Observable<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>> {
    return this.usuarioSolicitudObtenerAdapter.listarConFiltro(
      pageNo,
      pageSize,
      correo,
      estado,
      tipoDocumento,
      numeroDocumento,
      nombre,
      apellido,
      tipoUsuario
    );
  }
}
