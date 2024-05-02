import { Injectable } from '@angular/core';

import { TokenModel } from '../model/token.model';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../model/loginRequest';
import { CredencialAdapter } from '../../infraestructure/credencial.adapter';

@Injectable({
  providedIn: 'root',
})
export class CredencialService {
  constructor(private credencialAdapter: CredencialAdapter) {}

  autenticar(loginRequest: LoginRequest): Observable<TokenModel> {
    return this.credencialAdapter.autenticar(loginRequest).pipe(
      tap((token: TokenModel) => {
        if (token && token.access_token) {
          sessionStorage.setItem('access_token', token.access_token);
        }
      })
    );
  }
}
