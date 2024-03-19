import { Injectable } from '@angular/core';

import { TokenModel } from '../model/token.model';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../model/loginRequest';
import { CredencialCU } from '../../application/credencial-CU';

@Injectable({
  providedIn: 'root',
})
export class CredencialService {
  constructor(private credencialCU: CredencialCU) {}

  autenticar(loginRequest: LoginRequest): Observable<TokenModel> {
    return this.credencialCU.autenticar(loginRequest).pipe(
      tap((token: TokenModel) => {
        if (token && token.access_token) {
          sessionStorage.setItem('access_token', token.access_token);
        }
      })
    );
  }
}
