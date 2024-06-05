import { Observable, tap } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { LoginRequest } from '../domain/model/loginRequest';
import { TokenModel } from '../domain/model/token.model';
import { CrearActualizarCredencialRequest } from '../domain/model/crearActualizarCredencialRequest';


@Injectable({
    providedIn: 'root',
})
export class CredencialAdapter {

    private apiUrl = environment.urlApi + 'v1/access/';

    constructor(private http: HttpClient) {}
    
    autenticar(body: LoginRequest): Observable<TokenModel> {
        return this.http.post<TokenModel>(this.apiUrl+'auth', body);
    }

    crearActualizarCredencial(body: CrearActualizarCredencialRequest): Observable<Boolean> {
        return this.http.post<Boolean>(this.apiUrl+'crearActualizarCredencial', body);
    }
}