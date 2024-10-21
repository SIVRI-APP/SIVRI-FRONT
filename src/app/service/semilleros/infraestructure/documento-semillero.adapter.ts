import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../solicitudUsuarios/domain/model/enum/tipoDocumento';
import { TipoDocumentoSemillero } from '../domain/model/enum/tipoDocumentoSemillero';
import { Respuesta } from '../../common/model/respuesta';
import { ListarDocumentoSemilleroProyeccion } from '../domain/model/proyecciones/ListarDocumentoSemilleroProyeccion';

@Injectable({
  providedIn: 'root'
})
export class DocumentoSemilleroAdapter {
  private apiUrl =environment.urlApi+'documentoSemillero/';
  constructor(private http:HttpClient) { }
  obtenerDocumentoSemilleroxsemilleroIdyTipo(
    semilleroId: string,tipo:string
  ):Observable<Respuesta<ListarDocumentoSemilleroProyeccion>>{
    return this.http.get<Respuesta<ListarDocumentoSemilleroProyeccion>>(this.apiUrl+`obtenerDocumentoActivo?semilleroId=${semilleroId}&tipo=${tipo}`);
  }
  actualizarDocumentoSemillero(
    idDocumentoSemillero:number,
    body:{
      observacion:string,
      estado:string
    }
  ):Observable<Respuesta<boolean>>{
    console.log('id docum '+idDocumentoSemillero+" cuerpo "+body);
    return this.http.patch<Respuesta<boolean>>(this.apiUrl+`actualizarDocumentoSemillero/${idDocumentoSemillero}`,body);
  }
  subirDocumentosSemillero(idSemillero: string,tipoDocumento:string,base64File: string, fileName: string): Observable<any>{
    const payload = {
      file: base64File,
      fileName: fileName
    };
    const tipo=tipoDocumento.toString().toUpperCase();
    console.log('tipo desde el adater '+tipo);

    return this.http.post<any>(this.apiUrl+`subirDocumentosSemillero?idSemillero=${idSemillero}&tipoDocumento=${tipoDocumento}`,payload);
  }

  descargarDocumento(idSemillero:string,tipo:string):Observable<Blob>{
    const url=`${this.apiUrl}descargarDocumentosSemillero/${idSemillero}/${tipo}`;
    return this.http.get(url,{responseType: 'blob'});
  }
}
