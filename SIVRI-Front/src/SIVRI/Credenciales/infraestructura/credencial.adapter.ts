import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { CredencialCU } from '../applicación/credencial.port';
import { Injectable } from '@angular/core';
import { TokenModel } from '../domain/models/token.model';
import { LoginRequest } from '../domain/models/loginRequest';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CredencialAdapter extends CredencialCU {

    private apiUrl = environment.urlApi + 'v1/acceso/';

    userLoggedOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    userLoggedOnData: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private http: HttpClient) {
        super();
        this.userLoggedOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
        this.userLoggedOnData = new BehaviorSubject<string>(sessionStorage.getItem("token") || "");
    }
    
    override autenticar(body: LoginRequest): Observable<TokenModel> {
        return this.http.post<TokenModel>(this.apiUrl+'autenticar', body)
        .pipe(
            tap((token) => {
                sessionStorage.setItem('token', token.access_token);
                this.userLoggedOn.next(true);
                this.userLoggedOnData.next(token.access_token);
            })
        );
    }

    get getLoggedOn(): Observable<boolean>{
        return this.userLoggedOn.asObservable(); 
    }

    get getLoggedOnData(): Observable<string>{
        return this.userLoggedOnData.asObservable(); 
    }

    get getUserToken(): string{
        return this.userLoggedOnData.value; 
    }

}