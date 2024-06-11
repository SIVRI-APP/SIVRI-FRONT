import { Injectable } from '@angular/core';
import { LineaInvestigacionAdapter } from '../../infraestructure/linea-investigacion.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { LineaInvestigacion } from '../model/proyecciones/lineaInvestigacion';
import { IntegranteSemillero } from '../model/proyecciones/integranteSemilleroProyeccion';
import { Paginacion } from '../../../common/model/paginacion';
import { LineaInvestigacionProyeccion } from '../model/proyecciones/lineaInvestigacionProyeccion';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionObtenerService {

  constructor(private lineaInvestigacionAdapter: LineaInvestigacionAdapter) { }

  obtenerLineaxId( idLinea:string):Observable<Respuesta<LineaInvestigacion>>{
    return this.lineaInvestigacionAdapter.obtenerLineaxId(idLinea);
  }

  obtenerLineasPaginadoxSemilleroId(
    semilleroId?: string,
    pageNo?: number,
    pageSize?: number,
  ):Observable<Respuesta<Paginacion<LineaInvestigacionProyeccion>>>{
    return this.lineaInvestigacionAdapter.obtenerLineasPaginadoxSemilleroId(semilleroId,pageNo,pageSize);
  }

  obtenerLineasxSemilleroId(
    semilleroId?: string
  ):Observable<Respuesta<LineaInvestigacion[]>>{
    return this.lineaInvestigacionAdapter.obtenerLineasxSemilleroId(semilleroId);
  }

}
