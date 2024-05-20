import { Injectable } from '@angular/core';
import { LineaInvestigacionAdapter } from '../../infraestructure/linea-investigacion.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { LineaInvestigacion } from '../model/proyecciones/lineaInvestigacion';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionObtenerService {

  constructor(private lineaInvestigacionAdapter: LineaInvestigacionAdapter) { }

  obtenerLineasxSemilleroId(
    semilleroId?: string
  ):Observable<Respuesta<LineaInvestigacion[]>>{
    return this.lineaInvestigacionAdapter.obtenerLineasxSemilleroId(semilleroId);
  }

}
