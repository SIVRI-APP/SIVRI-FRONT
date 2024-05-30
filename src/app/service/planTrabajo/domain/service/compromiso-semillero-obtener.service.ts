import { Injectable } from '@angular/core';
import { CompromisoSemilleroAdapter } from '../../infraestructure/compromiso-semillero.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { CompromisoSemillero } from '../model/proyecciones/compromisoSemillero';

@Injectable({
  providedIn: 'root'
})
export class CompromisoSemilleroObtenerService {
  //variable para guardar la informacion de los compromisos
  private compromisos:Observable<Respuesta<CompromisoSemillero>>
  constructor(private compromisoSemilleroAdapter:CompromisoSemilleroAdapter) {
    this.compromisos=new Observable;
  }
  obtenerCompromisosSemilleros(
    ):Observable<Respuesta<CompromisoSemillero>>{
      this.compromisos= this.compromisoSemilleroAdapter.obtenerCompromisosSemillero();
      return this.compromisos;
  }
  getCompromisosSemillero(){
    return this.compromisos;
  }
}
