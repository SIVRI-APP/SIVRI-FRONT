import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CredencialCU } from '../service/auth/application/credencial-CU';
import { CredencialAdapter } from '../service/auth/infraestructure/credencial.adapter';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { UsuarioSolicitudObtenerCU } from '../service/solicitudUsuarios/application/UsuarioSolicitudObtenerCU';
import { UsuarioSolicitudObtenerAdapter } from '../service/solicitudUsuarios/infraestructure/UsuarioSolicitudObtenerAdapter';
import { JwtInterceptor } from '../service/common/jwtInterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    // provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    { provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true },
    { provide: CredencialCU, useClass: CredencialAdapter },
    { provide: UsuarioSolicitudObtenerCU, useClass: UsuarioSolicitudObtenerAdapter },
  ]
};
