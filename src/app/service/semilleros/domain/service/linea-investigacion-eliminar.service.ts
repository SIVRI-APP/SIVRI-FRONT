import { Injectable } from '@angular/core';
import { LineaInvestigacionAdapter } from '../../infraestructure/linea-investigacion.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionEliminarService {

  constructor(private lineaInvestigacionAdapter: LineaInvestigacionAdapter) { }
  eliminarLinea(idLinea:number):Observable<Respuesta<boolean>>{
    return this.lineaInvestigacionAdapter.eliminarLinea(idLinea);
  }

}
