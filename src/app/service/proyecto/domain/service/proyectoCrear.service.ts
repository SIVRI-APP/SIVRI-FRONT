import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { ProyectoAdapter } from '../../infraestructure/proyecto.adapter';
import { CrearProyectoDTO } from '../model/DTO/crearProyectoDTO';
import { FormalizarProyectoDTO } from '../model/DTO/formalizarProyectoDTO';

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

  formalizar(
    body: FormalizarProyectoDTO
  ): Observable<Respuesta<boolean>> {
    console.log(body);
    return this.proyectoAdapter.formalizar(body);
  }

}
