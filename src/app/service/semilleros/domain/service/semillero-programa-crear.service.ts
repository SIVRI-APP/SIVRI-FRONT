import { Injectable } from '@angular/core';
import { SemilleroProgramasAdapter } from '../../infraestructure/semillero-programa.adapter';
import { Respuesta } from '../../../common/model/respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemilleroProgramaCrearService {

  constructor(private semilleroProgramaAdapter: SemilleroProgramasAdapter) { }

  crearProgramaSemillero(
    idSemillero: string='',
    programaId: string
  ):Observable<Respuesta<boolean>>{
    console.log(idSemillero,programaId)
    return this.semilleroProgramaAdapter.crearProgramaSemillero(idSemillero,programaId);
  }
}
