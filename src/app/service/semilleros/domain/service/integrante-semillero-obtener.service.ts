import { Injectable } from '@angular/core';
import { IntegranteSemilleroAdapter } from '../../infraestructure/integrante-semillero.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { Paginacion } from '../../../common/model/paginacion';
import { IntegranteSemilleroListar } from '../model/proyecciones/integranteSemilleroListarProyeccion';
import { RolIntegranteSemillero } from '../model/proyecciones/rolIntegranteSemillero';
import { IntegranteSemillero } from '../model/proyecciones/integranteSemilleroProyeccion';

@Injectable({
  providedIn: 'root'
})
export class IntegranteSemilleroObtenerService {
  protected rolIntegranteSemillero: RolIntegranteSemillero[] = [];
  constructor(private integranteSemilleroAdapter: IntegranteSemilleroAdapter) { }

  obtenerIntegrantesxSemilleroIdPaginado(
    idSemillero:string,
    numeroDocumento: string,
    rolSemillero:string,
    estado:string,
    pageNo?: number,
    pageSize?: number,
  ):Observable<Respuesta<Paginacion<IntegranteSemilleroListar>>>{
    return this.integranteSemilleroAdapter.obtenerIntegrantesxSemilleroIdPaginado(idSemillero,numeroDocumento,rolSemillero,estado,pageNo,pageSize);
  }

  obtenerIntegrantexId(
    idIntegrante:string
  ):Observable<Respuesta<IntegranteSemillero>>{
    return this.integranteSemilleroAdapter.obtenerIntegrantexId(idIntegrante);
  }

  getRolIntegranteSemillero(): RolIntegranteSemillero[]{
    return this.rolIntegranteSemillero;
  }

  setRolIntegranteSemillero(rolIntegrante: RolIntegranteSemillero[]){
    this.rolIntegranteSemillero= rolIntegrante;
  }
}
