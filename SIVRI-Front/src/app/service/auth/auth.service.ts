import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CredencialService } from './domain/service/credencial.service';
import { LoginRequest } from './domain/model/loginRequest';
import { TokenModel } from './domain/model/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string | null = null;
  public token: TokenModel;

  constructor(private credencialService: CredencialService) {
    // Asignación de valores a la instancia
    this.token = {
      isLoggedIn: false, // Por defecto, no está logueado
      access_token: '', // Cadena vacía
      refresh_token: '', // Cadena vacía
      nombreCompleto: '', // Cadena vacía
      tipoUsuario: '',
      authorities: new Set<string>() // Set vacío
    };
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
          console.log(this.token);
        }
      })
    );
  }

  logout(): void {
    this.token = {
      isLoggedIn: false, // Por defecto, no está logueado
      access_token: '', // Cadena vacía
      refresh_token: '', // Cadena vacía
      nombreCompleto: '', // Cadena vacía
      tipoUsuario: '',
      authorities: new Set<string>() // Set vacío
    };
  }
}
