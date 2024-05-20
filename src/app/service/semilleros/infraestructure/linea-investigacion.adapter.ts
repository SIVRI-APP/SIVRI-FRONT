import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { LineaInvestigacion } from '../domain/model/proyecciones/lineaInvestigacion';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionAdapter {
  apiUrl = environment.urlApi+'lineasInvestigacion/';
  constructor(private http: HttpClient) { }

  obtenerLineasxSemilleroId(
    semilleroId: string=''
  ):Observable<Respuesta<LineaInvestigacion[]>>{
    let params = new HttpParams().set('idSemillero',semilleroId)
    return this.http.get<Respuesta<LineaInvestigacion[]>>(this.apiUrl+'LineastotInvestigacionPorIdSemillero',{params:params})
  }
}
