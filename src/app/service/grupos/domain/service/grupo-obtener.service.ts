import { Injectable } from '@angular/core';
import { GrupoAdapter } from '../../infraestructure/grupo.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { GrupoProyeccion } from '../model/proyecciones/grupoProyeccion';
import { ListarGrupoProyeccion } from '../model/proyecciones/listarGrupoProyeccion';

@Injectable({
  providedIn: 'root'
})
export class GrupoObtenerService {

  constructor(private grupoAdapter: GrupoAdapter) { }

  obtenerGrupoInformacionDetallada(
    grupoId: number
  ):Observable<Respuesta<GrupoProyeccion>>{
    return this.grupoAdapter.obtenerGrupoInformacionDetallada(grupoId);
  }
  obtenergruposxUsuario(): Observable<Respuesta<ListarGrupoProyeccion[]>> {
    return this.grupoAdapter.obtenerGruposxUsuario();
  }
}
