import { Observable } from 'rxjs';
import { SemilleroAdapter } from '../../infraestructure/semillero.adapter';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class SemilleroActualizarService {

  constructor(private semilleroAdapter: SemilleroAdapter) { }

  actualizarSemilleroxMentor(
    body:{
      semilleroId: string,
      nombre: string,
      correo: string,
      objetivo:string,
      mision: string,
      vision: string,
      sede: string,
      grupoId: number
    }
  ):Observable<Respuesta<boolean>>{
    console.log('datos del formulario que ingreso al service--------------'+body);
    return this.semilleroAdapter.actualizarSemilleroxMentor(body);
  }
}
