import { Injectable } from '@angular/core';
import { IntegrantesGrupoAdapter } from '../../infraestructure/integrantes-grupo.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { IntegrantesMentores } from '../model/proyecciones/integrantesMentores';

@Injectable({
  providedIn: 'root'
})
export class IntegrantesGrupoObtenerService {
  private mentoresxGrupoId:Observable<Respuesta<IntegrantesMentores[]>>;
  constructor(
    private integrantesGrupoAdapter: IntegrantesGrupoAdapter
  ) {
    this.mentoresxGrupoId=new Observable;
  }

  obtenerMentores(
    idGrupo:number
  ):Observable<Respuesta<IntegrantesMentores[]>>{
     this.mentoresxGrupoId = this.integrantesGrupoAdapter.obtenerIntegrantesGrupoId(idGrupo);
     return this.mentoresxGrupoId;
  }
  getMentoresxGrupoId(){
    return this.mentoresxGrupoId;
  }


}
