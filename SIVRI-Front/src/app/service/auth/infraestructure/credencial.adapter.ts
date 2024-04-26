import { Observable, tap } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredencialCU } from '../application/credencial-CU';
import { environment } from '../../../config/environment';
import { LoginRequest } from '../domain/model/loginRequest';
import { TokenModel } from '../domain/model/token.model';


@Injectable({
    providedIn: 'root',
})
export class CredencialAdapter extends CredencialCU {

    private apiUrl = environment.urlApi + 'v1/acceso/';

    constructor(private http: HttpClient) {
        super();
    }
    
    override autenticar(body: LoginRequest): Observable<TokenModel> {
        return this.http.post<TokenModel>(this.apiUrl+'autenticar', body);
    }

}