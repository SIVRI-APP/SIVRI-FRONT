import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InformacionUsuarioAutenticadoService {

  constructor(protected authService: AuthService){
  }

  public retornarRoles(){
    return this.authService.token.authorities;
  }

  public retornarNombre(){
    return this.authService.token.nombreCompleto;
  }

  public retornarTipoUsuario(){
    return this.authService.token.tipoUsuario;
  }

  esFuncionario(){
    return this.authService.esFuncionario();
  }

  esInvestigadorConPermisosAdmin(){
    const roles = this.retornarRoles();
    return roles.includes("PROYECTO:DIRECTOR") || roles.includes("GRUPO:DIRECTOR") || roles.includes("SEMILLERO:MENTOR");
  }

  esInvestigadorConPermisosAdminYNoEsDirectorProyecto(){
    const roles = this.retornarRoles();
    return roles.includes("GRUPO:DIRECTOR") || roles.includes("SEMILLERO:MENTOR");
  }

}
