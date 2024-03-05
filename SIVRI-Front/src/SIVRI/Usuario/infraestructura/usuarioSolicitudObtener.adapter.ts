import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Respuesta } from '../../../common/respuesta';
import { Paginacion } from '../../../common/paginacion';
import { TipoDocumento } from '../domain/models/enums/tipoDocumento';
import { TipoUsuario } from '../domain/models/enums/tipoUsuario';
import { UsuarioSolicitudListarConFiltroProjection } from '../domain/models/projections/UsuarioSolicitudListarConFiltro.projection';

@Injectable({
    providedIn: 'root'
})
export class UsuarioSolicitudObtenerAdapter {
    
    private apiUrl = environment.urlApi + 'usuarioSolicitud/';

    constructor(private http: HttpClient) {}

    listarConFiltro(
        pageNo?: number | undefined, 
        pageSize?: number | undefined, 
        correo?: string | undefined, 
        tipoDocumento?: TipoDocumento | undefined, 
        numeroDocumento?: string | undefined, 
        nombres?: string | undefined, 
        apellidos?: string | undefined, 
        tipoUsuario?: TipoUsuario | undefined
        ): Observable<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>>> {

        return this.http.get<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>>>(this.apiUrl+'listarTodoConFiltro?pageNo=0&pageSize=10')
    }

}