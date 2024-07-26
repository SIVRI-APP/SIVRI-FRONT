import { Injectable } from '@angular/core';
import { EvidenciaActividadAdapter } from '../../infraestructure/evidencia-actividad.adapter';
import { Respuesta } from '../../../common/model/respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaActividadCrearService {

  constructor(private evidenciaActividadAdapter: EvidenciaActividadAdapter) { }
  subirEvidenciaActividad(idActividad: number,
    formData:FormData):Observable<Respuesta<boolean>>{
    return this.evidenciaActividadAdapter.subirEvidenciaActividad(idActividad,formData);
  }
}
