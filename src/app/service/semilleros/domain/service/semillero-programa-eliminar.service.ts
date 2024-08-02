import { Injectable } from '@angular/core';
import { SemilleroProgramasAdapter } from '../../infraestructure/semillero-programa.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class SemilleroProgramaEliminarService {

  constructor(private programaSemilleroAdapter: SemilleroProgramasAdapter) { }

  eliminarProgramaSemillero(idPrograma:number):Observable<Respuesta<boolean>>{
    return this.programaSemilleroAdapter.eliminarProgramaSemillero(idPrograma);
  }
}
