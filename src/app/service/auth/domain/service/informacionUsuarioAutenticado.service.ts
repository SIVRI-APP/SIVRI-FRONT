import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InformacionUsuarioAutenticadoService {

  constructor(protected authService: AuthService){
  }

  retornarRoles(){
    return this.authService.token.authorities;
  }

  retornarNombre(){
    return this.authService.token.nombreCompleto;
  }



}
