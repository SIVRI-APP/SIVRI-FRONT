import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/domain/service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token:string = this.authService.token.access_token;

        console.log(req);
        if (token!='') {
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
        return next.handle(req);
    }

}