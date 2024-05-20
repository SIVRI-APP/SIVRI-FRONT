import { Injectable } from '@angular/core';
import { GrupoObtenerAdapter } from '../../infraestructure/grupo-obtener.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { GrupoProyeccion } from '../model/proyecciones/grupoProyeccion';

@Injectable({
  providedIn: 'root'
})
export class GrupoObtenerService {

  constructor(private grupoObtenerAdapter: GrupoObtenerAdapter) { }

  obtenerGrupoInformacionDetallada(
    grupoId: number
  ):Observable<Respuesta<GrupoProyeccion>>{
    return this.grupoObtenerAdapter.obtenerGrupoInformacionDetallada(grupoId);
  }

}
