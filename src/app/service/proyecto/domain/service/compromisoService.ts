import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { ProyectoDetalladoDTO } from '../model/proyecciones/proyectoDetalladoDTO';
import { CompromisosAdapter } from '../../infraestructure/compromisos.adapter';

@Injectable({
  providedIn: 'root',
})
export class CompromisosService {

  constructor(
    private compromisosAdapter: CompromisosAdapter
  ) {
  }

  prepararAgregarCompromiso(
    proyectoId: string
  ): Observable<Respuesta<ProyectoDetalladoDTO>>{
    return this.compromisosAdapter.prepararAgregarCompromiso(
      proyectoId
    );
  }

}
