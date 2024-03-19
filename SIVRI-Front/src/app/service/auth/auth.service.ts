import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CredencialService } from './domain/service/credencial.service';
import { LoginRequest } from './domain/model/loginRequest';
import { TokenModel } from './domain/model/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string | null = null;

  isLoggedIn = false;
  token = '';

  constructor(private credencialService: CredencialService) {}

  isAuth() {
    return this.token.length > 0;
  }

  login(loginRequest: LoginRequest): Observable<TokenModel> {
    return this.credencialService.autenticar(loginRequest).pipe(
      tap((token: TokenModel) => {
        if (token && token.access_token) {
          sessionStorage.setItem('access_token', token.access_token);
          this.isLoggedIn = true;
          this.token = token.access_token;
        }
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.token = '';
  }
}
