import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioSolicitudListarConFiltroProyeccion } from '../model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { Paginacion } from '../../../common/paginacion';
import { Respuesta } from '../../../common/respuesta';
import { UsuarioSolicitudAdapter } from '../../infraestructure/UsuarioSolicitud.adapter';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudObtenerService {
  constructor(private usuarioSolicitudAdapter: UsuarioSolicitudAdapter) {}

  listarConFiltro(
    pageNo?: number,
    pageSize?: number,
    correo?: string,
    estado?: string,
    tipoDocumento?: string,
    numeroDocumento?: string,
    nombre?: string,
    apellido?: string,
    tipoUsuario?: string
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

  obtenerSolicitudUsuarioInformaciónDetallada(
    solicitudUsuarioId?: string
  ): Observable<Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>> {
    return this.usuarioSolicitudAdapter.obtenerSolicitudUsuarioInformaciónDetallada(
      solicitudUsuarioId
    );
  }
}
