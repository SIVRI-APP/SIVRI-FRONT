import { Injectable } from '@angular/core';
import { RolSemilleroAdapter } from '../../infraestructure/rol-semillero.adapter';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../common/model/respuesta';
import { RolIntegranteSemillero } from '../model/proyecciones/rolIntegranteSemillero';

@Injectable({
  providedIn: 'root'
})
export class RolSemilleroObtenerService {
  protected rolIntegranteSemillero: RolIntegranteSemillero[] = [];
  constructor(private rolSemilleroAdapter:RolSemilleroAdapter) { }

  obtenerRolesSemillero():Observable<Respuesta<RolIntegranteSemillero[]>>{
    return this.rolSemilleroAdapter.obtenerRolesSemillero();
  }
  getRolIntegranteSemillero(): RolIntegranteSemillero[]{
    return this.rolIntegranteSemillero;
  }

  setRolIntegranteSemillero(rolIntegrante: RolIntegranteSemillero[]){
    this.rolIntegranteSemillero= rolIntegrante;
  }
}
