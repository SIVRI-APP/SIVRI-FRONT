import { Injectable } from '@angular/core';
import { SemilleroAdapter } from '../../infraestructure/semillero.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class SemilleroCrearService {

  constructor(private semilleroAdapter: SemilleroAdapter) { }

  crearSemillero(body:{
    nombre: string,
    grupoId: number,
    mentorId: number
  }):Observable<Respuesta<boolean>>{
    return this.semilleroAdapter.crearSemillero(body);
  }
  actualizarEstadoSemillero(idSemillero:number,body:{
    estado: string
  }): Observable<Respuesta<boolean>> {
    return this.semilleroAdapter.actualizarEstadoSemillero(idSemillero,body);
  }
}
