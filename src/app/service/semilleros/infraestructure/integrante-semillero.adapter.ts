import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { IntegranteSemilleroListar } from '../domain/model/proyecciones/integranteSemilleroListarProyeccion';

@Injectable({
  providedIn: 'root'
})
export class IntegranteSemilleroAdapter {
  private apiUrl = environment.urlApi+'integranteSemillero/';
  constructor(private http:HttpClient) { }

  obtenerIntegrantesxSemilleroIdPaginado(
    idSemillero: string,
    numeroDocumento: string,
    rolSemillero:string,
    estado:string,
    pageNo: number = 0,
    pageSize: number = 2,
  ):Observable<Respuesta<Paginacion<IntegranteSemilleroListar>>>{
    let params=new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString())
    .set('semilleroId',idSemillero);
    // Añade condicionalmente los otros parámetros si existen.
    if(numeroDocumento!=null) params = params.set('numeroDocumento',numeroDocumento);
    if(rolSemillero!=null) params= params.set('rolSemillero',rolSemillero);
    if(estado!=null) params = params.set('estado',estado);
    return this.http.get<Respuesta<Paginacion<IntegranteSemilleroListar>>>(this.apiUrl+'listarIntegrantesSemilleroPorSemilleroId',{params:params});
  }
}
