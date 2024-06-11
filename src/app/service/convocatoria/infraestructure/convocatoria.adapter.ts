import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { ConvocatoriaListarConFiltroProyeccion } from '../domain/model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { ConvocatoriaInformaciónDetalladaProyección } from '../domain/model/proyecciones/convocatoriaInformaciónDetalladaProyección';
import { CrearConvocatoriaDTO } from '../domain/service/DTO/crearConvocatoriaDTO';

@Injectable({
  providedIn: 'root',
})
export class ConvocatoriaAdapter {
  private apiUrl = environment.urlApi + 'convocatoria/';

  constructor(private http: HttpClient) { }

  listarConFiltro(
    pageNo: number = 0,
    pageSize: number = 10,
    id?: string,
    nombre?: string,
    estado?: string,
    tipoFinanciacion?: string,
  ): Observable<Respuesta<Paginacion<ConvocatoriaListarConFiltroProyeccion>>> {

    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());

    // Añade condicionalmente los otros parámetros si existen.
    if (id !== undefined) params = params.set('id', id);
    if (nombre !== undefined) params = params.set('nombre', nombre);
    if (estado !== undefined) params = params.set('estado', estado);
    if (tipoFinanciacion !== undefined) params = params.set('tipoFinanciacion', tipoFinanciacion);
  
    return this.http.get<Respuesta<Paginacion<ConvocatoriaListarConFiltroProyeccion>>>(this.apiUrl + 'listarTodoConFiltro', { params: params });
  }

  obtenerInformaciónDetallada(
    convocatoriaId: string = '0'
  ): Observable<Respuesta<ConvocatoriaInformaciónDetalladaProyección>> {

    let params = new HttpParams()
    .set('convocatoriaId', convocatoriaId)
  
    return this.http.get<Respuesta<ConvocatoriaInformaciónDetalladaProyección>>(this.apiUrl + 'obtenerInformacionDetallada', { params: params });
  }

  crear(
    body: CrearConvocatoriaDTO
  ): Observable<Respuesta<boolean>> {
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'crear', body);
  }


}
