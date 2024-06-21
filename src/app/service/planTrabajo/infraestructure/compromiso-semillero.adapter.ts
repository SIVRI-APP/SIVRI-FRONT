import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { CompromisoSemillero } from '../domain/model/proyecciones/compromisoSemillero';

@Injectable({
  providedIn: 'root'
})
export class CompromisoSemilleroAdapter {
  private apiUrl = environment.urlApi+'compromisosSemillero/';
  constructor(private http: HttpClient) { }

  obtenerCompromisosSemillero(
  ):Observable<Respuesta<CompromisoSemillero[]>>{
    return this.http.get<Respuesta<CompromisoSemillero[]>>(this.apiUrl+'obtenerCompromisos');
  }
}
