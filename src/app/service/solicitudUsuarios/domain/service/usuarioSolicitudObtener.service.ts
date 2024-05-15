import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioSolicitudListarConFiltroProyeccion } from '../model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { Paginacion } from '../../../common/model/paginacion';
import { Respuesta } from '../../../common/model/respuesta';
import { UsuarioSolicitudAdapter } from '../../infraestructure/UsuarioSolicitud.adapter';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudObtenerService {

  private solicitudUsuarioInformaciónDetallada: Observable<Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>>;

  constructor(private usuarioSolicitudAdapter: UsuarioSolicitudAdapter) {
    this.solicitudUsuarioInformaciónDetallada = new Observable;
  }

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
    this.solicitudUsuarioInformaciónDetallada = this.usuarioSolicitudAdapter.obtenerSolicitudUsuarioInformaciónDetallada(
      solicitudUsuarioId
    );

    return this.solicitudUsuarioInformaciónDetallada;
  }

  getSolicitudUsuarioInformaciónDetallada(){
    return this.solicitudUsuarioInformaciónDetallada;
  }
}
