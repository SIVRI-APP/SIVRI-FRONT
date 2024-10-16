import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { ProyectoDetalladoDTO } from '../domain/model/proyecciones/proyectoDetalladoDTO';
import { PrepararAgregarCompromisoDTO } from '../domain/model/proyecciones/prepararAgregarCompromisoDTO';


@Injectable({
  providedIn: 'root',
})
export class CompromisosAdapter {
  private apiUrl = environment.urlApi + 'compromiso/';

  constructor(private http: HttpClient) { }

  prepararAgregarCompromiso(
    proyectoId: number
  ): Observable<Respuesta<PrepararAgregarCompromisoDTO>> {

    let params = new HttpParams()
    .set('proyectoId', proyectoId.toString())
  
    return this.http.get<Respuesta<PrepararAgregarCompromisoDTO>>(this.apiUrl + 'prepararAgregarCompromiso', { params: params });
  }

  agregarCompromiso(
    proyectoId: number,
    integranteId: number,
    productoId: number
  ): Observable<Respuesta<boolean>> {

    let params = new HttpParams()
    .set('proyectoId', proyectoId.toString())
    .set('integranteId', integranteId.toString())
    .set('productoId', productoId.toString())
  
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'agregarCompromiso', null, { params: params });
  }

  cargarDocCompromiso(
    formData: FormData
  ): Observable<Respuesta<any>> {
    return this.http.post<Respuesta<boolean>>(this.apiUrl + 'uploadDocCompromiso', formData);
  }

  descargarDocCompromiso(ruta: string): Observable<Blob> {
    const url = `${this.apiUrl}` +  `downloadDocCompromiso/${ruta}`;
  
    return this.http.get(url, { responseType: 'blob' });
  }

}
