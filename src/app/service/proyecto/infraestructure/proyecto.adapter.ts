import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { ProyectoListarConFiltroProyeccion } from '../domain/model/proyecciones/proyectoListarConFiltroProyeccion';
import { ProyectoDetalladoDTO } from '../domain/model/proyecciones/proyectoDetalladoDTO';
import { CrearProyectoDTO } from '../domain/model/DTO/crearProyectoDTO';
import { FormalizarProyectoDTO } from '../domain/model/DTO/formalizarProyectoDTO';
import { GuardarProyectoDTO } from '../domain/model/DTO/guardarProyectoDTO';


@Injectable({
  providedIn: 'root',
})
export class ProyectoAdapter {
  private apiUrl = environment.urlApi + 'proyecto/';

  constructor(private http: HttpClient) { }

  listarConFiltro(
    pageNo: number = 0,
    pageSize: number = 10,
    id?: string,
    nombre?: string,
  ): Observable<Respuesta<Paginacion<ProyectoListarConFiltroProyeccion>>> {

    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());

    // Añade condicionalmente los otros parámetros si existen.
    if (id !== undefined) params = params.set('id', id);
    if (nombre !== undefined) params = params.set('nombre', nombre);
  
    return this.http.get<Respuesta<Paginacion<ProyectoListarConFiltroProyeccion>>>(this.apiUrl + 'listarTodoConFiltro', { params: params });
  }

  obtenerInformaciónDetallada(
    proyectoId: string = '0'
  ): Observable<Respuesta<ProyectoDetalladoDTO>> {

    let params = new HttpParams()
    .set('proyectoId', proyectoId)
  
    return this.http.get<Respuesta<ProyectoDetalladoDTO>>(this.apiUrl + 'obtenerInformacionDetallada', { params: params });
  }

  crear(
    body: CrearProyectoDTO
  ): Observable<Respuesta<boolean>> {
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'crear', body);
  }

  formalizar(
    body: FormalizarProyectoDTO
  ): Observable<Respuesta<boolean>> {
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'formalizar', body);
  }

  guardar(
    body: GuardarProyectoDTO
  ): Observable<Respuesta<boolean>> {
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'guardar', body);
  }

  asociarConvocatoria(
    proyectoId?: string,
    convocatoriaId?: string,
  ): Observable<Respuesta<boolean>> {

    let params = new HttpParams()
    // Añade condicionalmente los otros parámetros si existen.
    if (proyectoId !== undefined) params = params.set('proyectoId', proyectoId);
    if (convocatoriaId !== undefined) params = params.set('convocatoriaId', convocatoriaId);
  
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'asociarConvocatoria', null, { params: params });
  }

  cargarDocConvocatoria(
    formData: FormData
  ): Observable<Respuesta<any>> {
    return this.http.post<Respuesta<boolean>>(environment.urlApi + 'file/upload', formData);
  }

  descargarDocConvocatoria(ruta: string): Observable<HttpResponse<Blob>> {
    const url = `${environment.urlApi}/file/files/proyecto/${ruta}`;
  
    return this.http.get<Blob>(url, { observe: 'response' });
  }

}
