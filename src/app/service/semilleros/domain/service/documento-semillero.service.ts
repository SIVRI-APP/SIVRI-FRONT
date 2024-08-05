import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentoSemilleroAdapter } from '../../infraestructure/documento-semillero.adapter';
import { TipoDocumentoSemillero } from '../model/enum/tipoDocumentoSemillero';

@Injectable({
  providedIn: 'root'
})
export class DocumentoSemilleroService {

  constructor(
    private documentoSemilleroAdapter: DocumentoSemilleroAdapter,
  ) { }

  subirDocumentosSemillero(idSemillero: string,tipoDocumento:string,base64File: string, fileName: string): Observable<any>{
    return this.documentoSemilleroAdapter.subirDocumentosSemillero(idSemillero,tipoDocumento,base64File,fileName);
  }
  descargarDocumento(idSemillero:string,tipo:string):Observable<Blob>{
    return this.documentoSemilleroAdapter.descargarDocumento(idSemillero,tipo);
  }
}
