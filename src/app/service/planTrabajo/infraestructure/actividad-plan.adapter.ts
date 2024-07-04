import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginacion } from '../../common/model/paginacion';
import { ListarActividadPlan } from '../domain/model/proyecciones/listarActividadPlan';
import { Respuesta } from '../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ActividadPlanAdapter {
  private apiUrl = environment.urlApi + 'actividadesPlanTrabajo/';
  constructor(private http: HttpClient) { }

  obtenerActividadesPlanPaginado(
    idPlan: number,
    pageNo: number = 0,
    pageSize: number = 2,
    fechaInicio: Date,
    fechaFin: Date
  ): Observable<Respuesta<Paginacion<ListarActividadPlan>>> {
    let params = new HttpParams()
      .set('idPlan', idPlan)
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
      // Añade condicionalmente los otros parámetros si existen.
      if (fechaInicio != null) params = params.set('fechaInicio', fechaInicio.toDateString());
      if (fechaFin != null) params = params.set('fechaFin', fechaFin.toISOString());
    return this.http.get<Respuesta<Paginacion<ListarActividadPlan>>>(this.apiUrl + 'listarActividadesConFiltro', { params: params });
  }
}
