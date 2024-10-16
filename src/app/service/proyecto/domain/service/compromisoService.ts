import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { CompromisosAdapter } from '../../infraestructure/compromisos.adapter';
import { PrepararAgregarCompromisoDTO } from '../model/proyecciones/prepararAgregarCompromisoDTO';

@Injectable({
  providedIn: 'root',
})
export class CompromisosService {

  constructor(
    private compromisosAdapter: CompromisosAdapter
  ) {
  }

  prepararAgregarCompromiso(
    proyectoId: number
  ): Observable<Respuesta<PrepararAgregarCompromisoDTO>>{
    return this.compromisosAdapter.prepararAgregarCompromiso(proyectoId);
  }

  agregarCompromiso(
    proyectoId: number,
    integranteId: number,
    productoId: number
  ): Observable<Respuesta<boolean>>{
    return this.compromisosAdapter.agregarCompromiso(proyectoId, integranteId, productoId);
  }

  cargarDocCompromiso(
    formData: FormData
  ): Observable<Respuesta<any>> {
    return this.compromisosAdapter.cargarDocCompromiso(formData);
  }

  descargarDocCompromiso(ruta: string): Observable<Blob> {
    return this.compromisosAdapter.descargarDocCompromiso(ruta);
  }


}
