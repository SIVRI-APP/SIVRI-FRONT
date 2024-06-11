import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { ConvocatoriaAdapter } from '../../infraestructure/convocatoria.adapter';
import { CrearConvocatoriaDTO } from './DTO/crearConvocatoriaDTO';

@Injectable({
  providedIn: 'root',
})
export class ConvocatoriaCrearService {
  constructor(private convocatoriaAdapter: ConvocatoriaAdapter) {}

  crearSolicitudUsuario(
    body: CrearConvocatoriaDTO
  ): Observable<Respuesta<boolean>> {
    return this.convocatoriaAdapter.crear(body);
  }

}
