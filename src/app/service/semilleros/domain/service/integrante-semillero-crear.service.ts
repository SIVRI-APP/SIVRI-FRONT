import { Injectable } from '@angular/core';
import { IntegranteSemilleroAdapter } from '../../infraestructure/integrante-semillero.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class IntegranteSemilleroCrearService {

  constructor(private integranteSemilleroAdapter: IntegranteSemilleroAdapter) { }

  crearIntegranteSemillero(
    body:{
      semilleroId:string,
      usuarioId:number,
      rolSemilleroId: number
    }
  ):Observable<Respuesta<boolean>>{
      return this.integranteSemilleroAdapter.crearIntegranteSemillero(body);
  }

  actualizarIntegranteSemillero(
    body:{
      id:string,
      estado:string,
      rolSemilleroId:number,
      fechaRetiro:string
    }
  ):Observable<Respuesta<boolean>>{
    return this.integranteSemilleroAdapter.actualizarIntegranteSemillero(body);
  }
}
