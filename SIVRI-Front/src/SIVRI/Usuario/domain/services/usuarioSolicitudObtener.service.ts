import { Observable } from 'rxjs';
import { usuarioSolicitudObtenerCU } from '../../applicación/usuarioSolicitudObtenerCU';
import { UsuarioSolicitudListarConFiltroProyección } from '../models/UsuarioSolicitudListarConFiltroProyección.model';
import { TipoDocumento } from '../models/tipoDocumento';
import { TipoUsuario } from '../models/tipoUsuario';


export class usuarioSolicitudObtener{

    constructor(private usuarioSolicitudObtenerService: usuarioSolicitudObtenerCU) { }

    execute(
        pageNo?: number, 
        pageSize?: number, 
        correo?: string, 
        tipoDocumento?: TipoDocumento, 
        numeroDocumento?: string, 
        nombres?: string, 
        apellidos?: string, 
        tipoUsuario?: TipoUsuario
    ): Observable<UsuarioSolicitudListarConFiltroProyección[]> {
        return this.usuarioSolicitudObtenerService.listarConFiltro(
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