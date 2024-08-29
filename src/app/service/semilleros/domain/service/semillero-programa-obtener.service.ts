import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { Paginacion } from '../../../common/model/paginacion';
import { SemilleroProgramasAdapter } from '../../../semilleros/infraestructure/semillero-programa.adapter';
import { ListarProgramas } from '../../../academica/domain/model/proyecciones/listarProgramas';

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
    console.log('semillero id '+semilleroId+' pageno '+pageNo+' pagesize '+pageSize);

    return this.semilleroProgramaAdapter.obtenerProgramasxSemilleroId(semilleroId,pageNo,pageSize);
  }

}
