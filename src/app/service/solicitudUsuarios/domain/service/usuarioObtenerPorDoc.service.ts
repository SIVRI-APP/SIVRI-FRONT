import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { UsuarioAdapter } from '../../infraestructure/usuario.adapter';
import { UsuarioInformaciónDetalladaProyección } from '../model/proyecciones/usuarioInformaciónDetalladaProyección';
import { TipoDocumento } from '../model/enum/tipoDocumento';

@Injectable({
  providedIn: 'root',
})
export class UsuarioObtenerPorDocService {

  constructor(
    private usuarioAdapter: UsuarioAdapter,
  ) {}


  obtenerUsuarioInformaciónDetallada(
    usuarioNumDoc: string,
    tipoDocumento: TipoDocumento
  ): Observable<Respuesta<UsuarioInformaciónDetalladaProyección>> {
    return this.usuarioAdapter.obtenerUsuarioInformaciónDetalladaPorDoc(
      usuarioNumDoc,
      tipoDocumento
    );
  }

}
