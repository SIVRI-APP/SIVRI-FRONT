import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { ProyectoDetalladoDTO } from '../domain/model/proyecciones/proyectoDetalladoDTO';


@Injectable({
  providedIn: 'root',
})
export class CompromisosAdapter {
  private apiUrl = environment.urlApi + 'compromiso/';

  constructor(private http: HttpClient) { }

  prepararAgregarCompromiso(
    proyectoId: string
  ): Observable<Respuesta<ProyectoDetalladoDTO>> {

    let params = new HttpParams()
    .set('proyectoId', proyectoId.toString())
  
    return this.http.get<Respuesta<ProyectoDetalladoDTO>>(this.apiUrl + 'prepararAgregarCompromiso', { params: params });
  }


}
