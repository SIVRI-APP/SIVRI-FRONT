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
      semillero_Id: string,
      nombre: string,
      correo: string,
      objetivo:string,
      mision: string,
      vision: string,
      sede: string,
      grupoId: number
    }
  ):Observable<Respuesta<boolean>>{
    return this.semilleroAdapter.actualizarSemilleroxMentor(body);
  }
  actualizarSemilleroxFuncionario(
    body: {
      semillero_Id: string,
      nombre: string,
      correo: string,
      objetivo: string,
      mision: string,
      vision: string,
      estado: string,
      sede: string,
      grupoId: number
    }
  ): Observable<Respuesta<boolean>> {
    return this.semilleroAdapter.actualizarSemilleroxFuncionario(body);
  }
}
