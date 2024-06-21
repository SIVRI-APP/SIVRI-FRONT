import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { ListarProgramas } from '../model/proyecciones/listarProgramas';
import { Paginacion } from '../../../common/model/paginacion';
import { SemilleroProgramasAdapter } from '../../infraestructure/semillero-programa.adapter';

@Injectable({
  providedIn: 'root'
})
export class SemilleroProgramaObtenerService {

  constructor(private semilleroProgramaAdapter: SemilleroProgramasAdapter) { }

  obtenerProgramasxSemilleroId(
    semilleroId?: string,
    pageNo?: number ,
    pageSize?: number ,
  ):Observable<Respuesta<Paginacion<ListarProgramas>>>{
    return this.semilleroProgramaAdapter.obtenerProgramasxSemilleroId(semilleroId,pageNo,pageSize);
  }

}
