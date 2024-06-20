import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { CrearProyectoDTO } from '../model/DTO/crearProyectoDTO';
import { ProyectoAdapter } from '../../infraestructure/proyecto.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProyectoCrearService {
  constructor(private proyectoAdapter: ProyectoAdapter) {}

  crear(
    body: CrearProyectoDTO
  ): Observable<Respuesta<boolean>> {
    return this.proyectoAdapter.crear(body);
  }

}
