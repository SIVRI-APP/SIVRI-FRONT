import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaActividadAdapter {
  private apiUrl=environment.urlApi+ 'evidenciaActividad/';
  constructor(private http: HttpClient) { }
  subirEvidenciaActividad(
    idActividad: number,
    formData:FormData
  ):Observable<Respuesta<boolean>>{
    return this.http.post<Respuesta<boolean>>(this.apiUrl+`subirEvidenciaActividad?actividadId=${idActividad}`,formData);
  }
}
