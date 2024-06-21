import { Injectable } from '@angular/core';
import { GrupoDisciplinaObtenerAdapter } from '../../infraestructure/grupo-disciplina-obtener.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { ListarDisciplinaxGrupoIdProyeccion } from '../model/proyecciones/listarDisciplinasxGrupoIdProyeccion';

@Injectable({
  providedIn: 'root'
})
export class GrupoDisciplinaObtenerService {

  constructor(private grupoDisciplinaObtenerAdapter: GrupoDisciplinaObtenerAdapter) { }

  obtenerDisciplinasxGrupoId(
    grupoId: number
  ):Observable<Respuesta<ListarDisciplinaxGrupoIdProyeccion[]>>{
    return this.grupoDisciplinaObtenerAdapter.obtenerDisciplinasxGrupoId(grupoId);
  }
}
