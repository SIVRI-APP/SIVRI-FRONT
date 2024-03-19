import { Observable } from "rxjs";
import { TokenModel } from "../domain/model/token.model";
import { LoginRequest } from "../domain/model/loginRequest";

export abstract class CredencialCU {
    abstract autenticar(body: LoginRequest): Observable<TokenModel>;
}