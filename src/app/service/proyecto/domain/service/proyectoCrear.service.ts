import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../../common/model/respuesta';
import { ProyectoAdapter } from '../../infraestructure/proyecto.adapter';
import { CrearProyectoDTO } from '../model/DTO/crearProyectoDTO';
import { FormalizarProyectoDTO } from '../model/DTO/formalizarProyectoDTO';
import { GuardarProyectoDTO } from '../model/DTO/guardarProyectoDTO';
import { HttpResponse } from '@angular/common/http';

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
    return this.proyectoAdapter.formalizar(body);
  }

  guardar(
    body: GuardarProyectoDTO
  ): Observable<Respuesta<boolean>> {
    return this.proyectoAdapter.guardar(body);
  }

  asociarConvocatoria(
    proyectoId: string,
    convocatoriaId: string
  ): Observable<Respuesta<boolean>>{
    return this.proyectoAdapter.asociarConvocatoria(proyectoId, convocatoriaId);
  }

  cargarDocConvocatoria(
    formData: FormData
  ): Observable<Respuesta<any>> {
    return this.proyectoAdapter.cargarDocConvocatoria(formData);
  }

  descargarDocConvocatoria(ruta: string): Observable<HttpResponse<Blob>> {
    return this.proyectoAdapter.descargarDocConvocatoria(ruta);
  }

}
