import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { usuarioSolicitudObtenerCU } from '../applicación/usuarioSolicitudObtenerCU';
import { TipoDocumento } from '../domain/models/tipoDocumento';
import { TipoUsuario } from '../domain/models/tipoUsuario';
import { UsuarioSolicitudListarConFiltroProyección } from '../domain/models/UsuarioSolicitudListarConFiltroProyección.model';

@Injectable({
    providedIn: 'root',
})
export class UsuarioSolicitudObtenerAdapter extends usuarioSolicitudObtenerCU {
    
    private apiUrl = environment.urlApi + 'usuarioSolicitud/';

    constructor(private http: HttpClient) {
        super();
    }
    
    override listarConFiltro(
        pageNo?: number | undefined, 
        pageSize?: number | undefined, 
        correo?: string | undefined, 
        tipoDocumento?: TipoDocumento | undefined, 
        numeroDocumento?: string | undefined, 
        nombres?: string | undefined, 
        apellidos?: string | undefined, 
        tipoUsuario?: TipoUsuario | undefined): Observable<UsuarioSolicitudListarConFiltroProyección[]> {

        return this.http.get<UsuarioSolicitudListarConFiltroProyección[]>(this.apiUrl+'listarTodoConFiltro?pageNo=0&pageSize=10')
    }

}