import { Injectable } from '@angular/core';
import { ObservacionSemilleroAdapter } from '../../infraestructure/observacion-semillero.adapter';
import { Respuesta } from '../../../common/model/respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemilleroObservacionCrearService {

  constructor(private observacionSemilleroAdapter: ObservacionSemilleroAdapter,) { }
  crearObservacionSemillero(semilleroId: string = '',
    body:{
      observacion:string
    }):Observable<Respuesta<boolean>>{
      return this.observacionSemilleroAdapter.crearObservacion(semilleroId,body);
  }

  actualizarObservacionSemillero(
    idObservacion:string = '',
    body:{observacion:string}
  ):Observable<Respuesta<boolean>>{
    return this.observacionSemilleroAdapter.actualizarObservacion(idObservacion,body);
  }
}
