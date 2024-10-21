import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { IntegranteSemilleroListar } from '../domain/model/proyecciones/integranteSemilleroListarProyeccion';
import { IntegranteSemillero } from '../domain/model/proyecciones/integranteSemilleroProyeccion';
import { ListarTodosIntegranteSemilleroconFiltroProyeccion } from '../domain/model/proyecciones/listarIntegranteSemilleroconFiltroProyeccion';

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
    pageSize: number = 10,
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

  obtenerTodosIntegrantesSemilleroPaginado(
    numeroDocumento: string,
    nombres: string,
    semilleroId: number,
    nombreSemillero: string,
    rolSemillero: string,
    estado: string,
    pageNo:number = 0,
    pageSize: number = 10,
  ): Observable<Respuesta<Paginacion<ListarTodosIntegranteSemilleroconFiltroProyeccion>>>{
    let params=new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());
    // Añade condicionalmente los otros parámetros si existen.
    if(numeroDocumento!=undefined) params = params.set('numeroDocumento',numeroDocumento);
    if(nombres!=undefined) params=params.set('nombres',nombres);
    if(semilleroId!=null) params= params.set('semilleroId',semilleroId);
    if(nombreSemillero!=null) params = params.set('nombreSemillero',nombreSemillero);
    if(rolSemillero!=null) params= params.set('rolSemillero',rolSemillero);
    if(estado!=null) params = params.set('estado',estado);
    return this.http.get<Respuesta<Paginacion<ListarTodosIntegranteSemilleroconFiltroProyeccion>>>(this.apiUrl+'listarTodosIntegrantesConFiltro',{params:params});
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
