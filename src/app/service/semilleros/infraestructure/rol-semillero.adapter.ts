import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { RolIntegranteSemillero } from '../domain/model/proyecciones/rolIntegranteSemillero';

@Injectable({
  providedIn: 'root'
})
export class RolSemilleroAdapter {
  private apiUrl=environment.urlApi+'rolesSemillero/';
  constructor(private http: HttpClient) { }

  obtenerRolesSemillero():Observable<Respuesta<RolIntegranteSemillero[]>>{
    return this.http.get<Respuesta<RolIntegranteSemillero[]>>(this.apiUrl+'obtenerRoles');
  }

}
