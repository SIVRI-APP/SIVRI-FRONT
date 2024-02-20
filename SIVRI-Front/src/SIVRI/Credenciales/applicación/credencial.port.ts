import { Observable } from 'rxjs';
import { TokenModel } from '../domain/models/token.model';
import { LoginRequest } from '../domain/models/loginRequest';

export abstract class CredencialCU {
    abstract autenticar(body: LoginRequest): Observable<TokenModel>;
}