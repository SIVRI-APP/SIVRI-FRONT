import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { IntegranteSemilleroListar } from '../domain/model/proyecciones/integranteSemilleroListarProyeccion';
import { IntegranteSemillero } from '../domain/model/proyecciones/integranteSemilleroProyeccion';

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

  obtenerIntegrantexId(
    idIntegrante:string
  ):Observable<Respuesta<IntegranteSemillero>>{
    let params=new HttpParams().set('idIntegrante',idIntegrante);
    return this.http.get<Respuesta<IntegranteSemillero>>(this.apiUrl+'obtenerxId',{params:params});
  }

  crearIntegranteSemillero(
    body:{
      semilleroId:string,
      usuarioId:number,
      rolSemilleroId: number
    }
  ):Observable<Respuesta<boolean>>{
    return this.http.post<Respuesta<boolean>>(this.apiUrl+'agregarintegrante',body);
  }

  actualizarIntegranteSemillero(
    body:{
      id:string,
      estado:string,
      rolSemilleroId:number,
      fechaRetiro:string
    }):Observable<Respuesta<boolean>>{
      return this.http.patch<Respuesta<boolean>>(this.apiUrl+'actualizarIntegrante',body);
  }
}
