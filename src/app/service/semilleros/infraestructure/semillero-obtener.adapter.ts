import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { SemilleroListarConFiltroxMentorProyeccion } from '../domain/model/proyecciones/semilleroListarConFIltroxMentorProyeccion';

@Injectable({
  providedIn: 'root',
})
export class SemilleroObtenerAdapter {
  private apiUrl = environment.urlApi + 'semilleros/';
  constructor(private http: HttpClient){}

  listarConFiltro(
    pageNo: number = 0,
    pageSize: number = 2,
    idSemillero?: number,
    idUsuario?: number,
    nombre?: string,
    estado?: string
  ):Observable<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>>{
    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());
    // Añade condicionalmente los otros parámetros si existen.
    if (idSemillero!= null) params = params.set('idSemillero', idSemillero);
    if (idUsuario!= null) params = params.set('idUsuario', idUsuario);
    if (nombre !== undefined) params = params.set('nombre', nombre);
    if (estado !== undefined) params = params.set('estado', estado);
    return this.http.get<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>>(this.apiUrl+'listarSemilleroConFiltroxmentor',{params:params});
  }
}
