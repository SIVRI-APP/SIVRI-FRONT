import { Injectable } from '@angular/core';
import { SemilleroProgramaObtenerAdapter } from '../../infraestructure/semillero-programa-obtener.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { ListarProgramas } from '../model/proyecciones/listarProgramas';
import { Paginacion } from '../../../common/model/paginacion';

@Injectable({
  providedIn: 'root'
})
export class SemilleroProgramaObtenerService {

  constructor(private semilleroProgramaObtenerAdapter: SemilleroProgramaObtenerAdapter) { }

  obtenerProgramasxSemilleroId(
    semilleroId?: string
  ):Observable<Respuesta<Paginacion<ListarProgramas>>>{
    return this.semilleroProgramaObtenerAdapter.obtenerProgramasxSemilleroId(semilleroId);
  }

}
