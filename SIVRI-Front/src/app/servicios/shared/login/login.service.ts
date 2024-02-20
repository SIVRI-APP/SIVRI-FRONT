import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse } from './tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(credenciales:LoginRequest):Observable<TokenResponse>{
    return this.http.get<TokenResponse>('../../../../assets/token.json')
  }
}
