import { Observable } from 'rxjs';
import { Respuesta } from '../../common/respuesta';
import { Paginacion } from '../../common/paginacion';
import { TipoDocumento } from '../domain/model/enum/tipoDocumento';
import { TipoUsuario } from '../domain/model/enum/tipoUsuario';
import { UsuarioSolicitudListarConFiltroProjection } from '../domain/model/UsuarioSolicitudListarConFiltro.projection';

export abstract class UsuarioSolicitudObtenerCU {
    
  abstract listarConFiltro(
    pageNo?: number | undefined,
    pageSize?: number | undefined,
    correo?: string | undefined,
    estado?: string | undefined,
    tipoDocumento?: TipoDocumento | undefined,
    numeroDocumento?: string | undefined,
    nombres?: string | undefined,
    apellidos?: string | undefined,
    tipoUsuario?: TipoUsuario | undefined
  ): Observable<
    Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>>
  >;
}
