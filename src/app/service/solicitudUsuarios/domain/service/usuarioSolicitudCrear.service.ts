import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/respuesta';
import { UsuarioSolicitudAdapter } from '../../infraestructure/UsuarioSolicitud.adapter';

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
}