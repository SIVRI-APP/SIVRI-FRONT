import { Injectable } from '@angular/core';
import { LineaInvestigacionAdapter } from '../../infraestructure/linea-investigacion.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionCrearService {

  constructor(private lineaInvestigacionAdapter: LineaInvestigacionAdapter) { }
  crearLineaInvestigacion(
    body: {
      semilleroId: string,
      linea: string
    }
  ): Observable<Respuesta<boolean>> {
    return this.lineaInvestigacionAdapter.crearLineaInvestigacion(body);
  }

  actualizarLineaInvestigacion(
    idLinea: string,
    body: {
      linea: string
    }): Observable<Respuesta<boolean>> {
      return this.lineaInvestigacionAdapter.actualizarLineaInvestigacion(idLinea,body);
  }
}
