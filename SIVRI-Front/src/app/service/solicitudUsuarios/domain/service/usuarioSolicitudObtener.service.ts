import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TipoDocumento } from '../model/enum/tipoDocumento';
import { TipoUsuario } from '../model/enum/tipoUsuario';
import { UsuarioSolicitudListarConFiltroProyeccion } from '../model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { Paginacion } from '../../../common/paginacion';
import { Respuesta } from '../../../common/respuesta';
import { UsuarioSolicitudAdapter } from '../../infraestructure/UsuarioSolicitud.adapter';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudObtenerService {
  constructor(private usuarioSolicitudAdapter: UsuarioSolicitudAdapter) {}

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
    return this.usuarioSolicitudAdapter.listarConFiltro(
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
