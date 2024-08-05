import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../solicitudUsuarios/domain/model/enum/tipoDocumento';
import { TipoDocumentoSemillero } from '../domain/model/enum/tipoDocumentoSemillero';

@Injectable({
  providedIn: 'root'
})
export class DocumentoSemilleroAdapter {
  private apiUrl =environment.urlApi+'documentoSemillero/';
  constructor(private http:HttpClient) { }

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
