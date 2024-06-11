import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { UsuarioSolicitudAdapter } from '../../infraestructure/usuarioSolicitud.adapter';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudCrearService {
  constructor(private usuarioSolicitudAdapter: UsuarioSolicitudAdapter) {}

  crearSolicitudUsuario(
    body: {
      correo?: string,
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
    return this.usuarioSolicitudAdapter.crearSolicitudUsuario(body);
  }

  resolverObservacion(
    observacionId?: number
  ): Observable<Respuesta<boolean>> {
    return this.usuarioSolicitudAdapter.resolverObservacion(observacionId);
  }


  aprobarSolicitudUsuario(
    solicitudUsuarioId?: number
  ): Observable<Respuesta<boolean>> {
    return this.usuarioSolicitudAdapter.aprobarSolicitudUsuario(solicitudUsuarioId);
  }

  rechazarSolicitudUsuario(
    body: {
      usuarioSolicitudId?: string,
      observacion?: string,
    }
  ): Observable<Respuesta<boolean>> {
    return this.usuarioSolicitudAdapter.rechazarSolicitudUsuario(body);
  }
}
