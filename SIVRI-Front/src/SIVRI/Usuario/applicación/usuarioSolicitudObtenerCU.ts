import { Observable } from 'rxjs';
import { UsuarioSolicitudListarConFiltroProyección } from '../domain/models/UsuarioSolicitudListarConFiltroProyección.model';
import { TipoDocumento } from '../domain/models/tipoDocumento';
import { TipoUsuario } from '../domain/models/tipoUsuario';

export abstract class usuarioSolicitudObtenerCU {
    abstract listarConFiltro(
        pageNo?: number, 
        pageSize?: number, 
        correo?: string, 
        tipoDocumento?: TipoDocumento, 
        numeroDocumento?: string, 
        nombres?: string, 
        apellidos?: string, 
        tipoUsuario?: TipoUsuario
    ): Observable<UsuarioSolicitudListarConFiltroProyección[]>;
}