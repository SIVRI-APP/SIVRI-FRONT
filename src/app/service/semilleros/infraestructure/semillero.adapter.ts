import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { SemilleroListarConFiltroxMentorProyeccion } from '../domain/model/proyecciones/semilleroListarConFIltroxMentorProyeccion';
import { SemilleroObtenerService } from '../domain/service/semillero-obtener.service';
import { SemilleroProyeccion } from '../domain/model/proyecciones/semilleroProyeccion';
import { ListarSemilleroosFuncionarioProyeccion } from '../domain/model/proyecciones/liatarSemillerosFuncionarioProyeccion';

@Injectable({
  providedIn: 'root',
})
export class SemilleroAdapter {
  private apiUrl = environment.urlApi + 'semilleros/';
  constructor(private http: HttpClient) { }

  listarConFiltro(
    idSemillero: number | null,
    pageNo: number = 0,
    pageSize: number = 2,
    nombre?: string,
    estado?: string
  ): Observable<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    // Añade condicionalmente los otros parámetros si existen.
    if (idSemillero != null) params = params.set('semilleroId', idSemillero);
    if (nombre !== undefined) params = params.set('nombre', nombre);
    if (estado !== undefined) params = params.set('estado', estado);
    return this.http.get<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>>(this.apiUrl + 'listarSemilleroConFiltroxmentor', { params: params });
  }

  listarConFiltroFuncionario(
    pageNo: number = 0,
    pageSize: number = 2,
    nombre?: string,
    correo?: string,
    estado?: string
  ):Observable<Respuesta<Paginacion<ListarSemilleroosFuncionarioProyeccion>>>{
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    // Añade condicionalmente los otros parámetros si existen.
    if (nombre !== undefined) params = params.set('nombre', nombre);
    if (correo != undefined) params = params.set('correo', correo);
    if (estado !== undefined) params = params.set('estado', estado);
    return this.http.get<Respuesta<Paginacion<ListarSemilleroosFuncionarioProyeccion>>>(this.apiUrl+'listarSemilleroConFiltro',{params:params});
  }
  obtenerSemilleroInformacionDetallada(
    semilleroId: string = ''
  ): Observable<Respuesta<SemilleroProyeccion>> {
    let params = new HttpParams().set('semilleroId', semilleroId)
    return this.http.get<Respuesta<SemilleroProyeccion>>(this.apiUrl + 'obtenerSemillero', { params: params });
  }

  actualizarSemilleroxMentor(
    body: {
      semilleroId: string,
      nombre: string,
      correo: string,
      objetivo: string,
      mision: string,
      vision: string,
      sede: string,
      grupoId: number
    }
  ): Observable<Respuesta<boolean>> {
    return this.http.patch<Respuesta<boolean>>(this.apiUrl + 'actualizarSemilleroxMentor', body);
  }
  crearSemillero(body: {
    nombre: string,
    grupoId: number,
    mentorId: number
  }): Observable<Respuesta<boolean>> {
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'crearSemillero', body);
  }
}
