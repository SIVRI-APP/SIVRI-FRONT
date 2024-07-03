import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { ListarOrganismosParaAsociarProyectoProyeccion } from '../domain/model/proyecciones/listarOrganismosParaAsociarProyectoProyeccion';
import { GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion } from '../domain/model/proyecciones/obtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion';

@Injectable({
  providedIn: 'root',
})
export class OrganismoAdapter {
  private apiUrl = environment.urlApi + 'organismo/';

  constructor(private http: HttpClient) { }

  listarConFiltro(
    pageNo: number = 0,
    pageSize: number = 10,
    tipoOrganismo: string,
    id?: string,
    nombre?: string
  ): Observable<Respuesta<Paginacion<ListarOrganismosParaAsociarProyectoProyeccion>>> {

    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString())
    .set('tipoOrganismo', tipoOrganismo);

    // Añade condicionalmente los otros parámetros si existen.
    if (id !== undefined) params = params.set('id', id);
    if (nombre !== undefined) params = params.set('nombre', nombre);
  
    return this.http.get<Respuesta<Paginacion<ListarOrganismosParaAsociarProyectoProyeccion>>>(this.apiUrl + 'listarTodoConFiltro', { params: params });
  }

  listarIntegrantesDocenteOrganismo(
    organismoId: string = '1'
  ): Observable<Respuesta<GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion>> {

    let params = new HttpParams()
    .set('organismoId', organismoId)
  
    return this.http.get<Respuesta<GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion>>(this.apiUrl + 'listarIntegrantesDocenteOrganismo', { params: params });
  }

}
