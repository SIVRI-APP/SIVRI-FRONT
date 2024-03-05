import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../../common/respuesta';
import { Paginacion } from '../../../../common/paginacion';
import { TipoDocumento } from '../models/enums/tipoDocumento';
import { TipoUsuario } from '../models/enums/tipoUsuario';
import { UsuarioSolicitudListarConFiltroProjection } from '../models/projections/UsuarioSolicitudListarConFiltro.projection';
import { UsuarioSolicitudObtenerAdapter } from '../../infraestructura/usuarioSolicitudObtener.adapter';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSolicitudObtenerService {

  constructor(private usuarioSolicitudObtenerAdapter: UsuarioSolicitudObtenerAdapter) { }

  listarConFiltro(
    pageNo?: number, 
    pageSize?: number, 
    correo?: string, 
    tipoDocumento?: TipoDocumento, 
    numeroDocumento?: string, 
    nombres?: string, 
    apellidos?: string, 
    tipoUsuario?: TipoUsuario
): Observable<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>>> {
    return this.usuarioSolicitudObtenerAdapter.listarConFiltro(
        pageNo, 
        pageSize, 
        correo, 
        tipoDocumento, 
        numeroDocumento, 
        nombres, 
        apellidos, 
        tipoUsuario
    );
}
}
