import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioSolicitudObtenerCU } from '../../application/UsuarioSolicitudObtenerCU';
import { TipoDocumento } from '../model/enum/tipoDocumento';
import { TipoUsuario } from '../model/enum/tipoUsuario';
import { UsuarioSolicitudListarConFiltroProjection } from '../model/UsuarioSolicitudListarConFiltro.projection';
import { Paginacion } from '../../../common/paginacion';
import { Respuesta } from '../../../common/respuesta';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudObtenerService {
  constructor(private usuarioSolicitudObtenerCU: UsuarioSolicitudObtenerCU) {}

  listarConFiltro(
    pageNo?: number | undefined,
    pageSize?: number | undefined,
    correo?: string | undefined,
    estado?: string | undefined,
    tipoDocumento?: TipoDocumento | undefined,
    numeroDocumento?: string | undefined,
    nombres?: string | undefined,
    apellidos?: string | undefined,
    tipoUsuario?: TipoUsuario | undefined
  ): Observable<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>>> {
    return this.usuarioSolicitudObtenerCU.listarConFiltro(
      pageNo,
      pageSize,
      correo,
      estado,
      tipoDocumento,
      numeroDocumento,
      nombres,
      apellidos,
      tipoUsuario
    );
  }
}
