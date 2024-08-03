import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaActividadAdapter {
  private apiUrl=environment.urlApi+ 'evidenciaActividad/';
  constructor(private http: HttpClient) { }


    subirEvidenciaActividad(idActividad: number, base64File: string, fileName: string): Observable<any> {
      const payload = {
        file: base64File,
        fileName: fileName
      };

      return this.http.post<any>(this.apiUrl + `subirEvidenciaActividad?actividadId=${idActividad}`, payload);
  }

  descargarArchivo(id: number): Observable<Blob> {
    const url = `${this.apiUrl}descargarEvidenciaActividad/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
