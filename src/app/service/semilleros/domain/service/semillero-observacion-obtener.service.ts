import { Injectable } from '@angular/core';
import { ObservacionSemilleroAdapter } from '../../infraestructure/observacion-semillero.adapter';

@Injectable({
  providedIn: 'root'
})
export class SemilleroObservacionObtenerService {

  constructor(
    private observacionSemilleroAdapter: ObservacionSemilleroAdapter,
  ) { }

  obtenerObservacionxSemilleroId(
    semilleroId: string = '',
    pageNo: number = 0,
    pageSize: number = 2,
  ){
    return this.observacionSemilleroAdapter.obtenerObservacionesxSemilleroId(semilleroId,pageNo,pageSize);
  }
}
