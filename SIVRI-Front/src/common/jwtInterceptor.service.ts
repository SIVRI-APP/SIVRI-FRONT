import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CredencialAdapter } from '../SIVRI/Credenciales/infraestructura/credencial.adapter';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor{

    constructor(private credencialAdapter: CredencialAdapter){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token:string = this.credencialAdapter.getUserToken;

        if (token!="") {
            req = req.clone(
                {
                    setHeaders:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                }
            );
        }
        console.log(req)
        return next.handle(req);
    }

}