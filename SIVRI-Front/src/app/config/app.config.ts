import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CredencialCU } from '../service/auth/application/credencial-CU';
import { CredencialAdapter } from '../service/auth/infraestructure/credencial.adapter';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../service/common/jwtInterceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    { provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true },
    { provide: CredencialCU, useClass: CredencialAdapter }
  ]
};
