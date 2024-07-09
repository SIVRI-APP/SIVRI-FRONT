import { Injectable } from '@angular/core';
import { ObservacionSemilleroAdapter } from '../../infraestructure/observacion-semillero.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { Paginacion } from '../../../common/model/paginacion';
import { ObservacionSemillero } from '../model/proyecciones/observacionSemillero';

@Injectable({
  providedIn: 'root'
})
export class SemilleroObservacionObtenerService {

  constructor(
    private observacionSemilleroAdapter: ObservacionSemilleroAdapter,
  ) { }
  obtenerObservacionxId(
     idObservacion:string
  ): Observable<Respuesta<ObservacionSemillero>>{
     return this.observacionSemilleroAdapter.obtenerObservacionxId(idObservacion);
  }
  obtenerObservacionxSemilleroId(
    semilleroId: string = '',
    pageNo: number ,
    pageSize: number ,
  ){
    return this.observacionSemilleroAdapter.obtenerObservacionesxSemilleroId(semilleroId,pageNo,pageSize);
  }
}
