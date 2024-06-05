import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CredencialService } from './credencial.service';
import { LoginRequest } from '../model/loginRequest';
import { TokenModel } from '../model/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string | null = null;
  public token: TokenModel;

  constructor(private credencialService: CredencialService) {
    // Asignación de valores a la instancia
    this.token = {
      isLoggedIn: false,
      access_token: '',
      nombreCompleto: '',
      tipoUsuario: '',
      authorities: []
    };
  }

  esFuncionario(){
    for (const cadena of this.token.authorities) {
      if (cadena.includes("FUNCIONARIO")) {
          return true;
      }
    }
    return false;
  }

  isAuth() {
    return this.token.isLoggedIn;
  }

  login(loginRequest: LoginRequest): Observable<TokenModel> {
    return this.credencialService.autenticar(loginRequest).pipe(
      tap((token: TokenModel) => {
        if (token && token.access_token) {
          this.token = token;
          this.token.isLoggedIn = true;
        }
      })
    );
  }

  logout(): void {
    this.token = {
      isLoggedIn: false,
      access_token: '', 
      nombreCompleto: '', 
      tipoUsuario: '',
      authorities: []
    };
  }
}
