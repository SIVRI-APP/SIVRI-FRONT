import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { RolProyectoProyeccion } from '../model/proyecciones/rolProyectoProyeccion';
import { RolProyectoAdapter } from '../../infraestructure/rol-proyecto.adapter';
import { TipoUsuario } from '../../../solicitudUsuarios/domain/model/enum/tipoUsuario';

@Injectable({
  providedIn: 'root',
})
export class RolProyectoService {

  constructor(
    private rolProyectoAdapter: RolProyectoAdapter
  ){}

  listarRoles(
    tipoUsuario: TipoUsuario
  ): Observable<Respuesta<RolProyectoProyeccion[]>>{
    return this.rolProyectoAdapter.listarRoles(tipoUsuario);
  }

}
