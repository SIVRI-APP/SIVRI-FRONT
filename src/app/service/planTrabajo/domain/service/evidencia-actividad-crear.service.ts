import { Injectable } from '@angular/core';
import { EvidenciaActividadAdapter } from '../../infraestructure/evidencia-actividad.adapter';
import { Respuesta } from '../../../common/model/respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaActividadCrearService {

  constructor(private evidenciaActividadAdapter: EvidenciaActividadAdapter) { }

  subirEvidenciaActividad(idActividad: number, base64File: string, fileName: string): Observable<any> {

    return this.evidenciaActividadAdapter.subirEvidenciaActividad(idActividad,base64File,fileName);
  }

  descargarArchivo(id: number): Observable<Blob> {
    return this.evidenciaActividadAdapter.descargarArchivo(id);
  }
}
