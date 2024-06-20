import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProyectoListarConFiltroProyeccion } from '../model/proyecciones/proyectoListarConFiltroProyeccion';
import { Paginacion } from '../../../common/model/paginacion';
import { Respuesta } from '../../../common/model/respuesta';
import { ProyectoAdapter } from '../../infraestructure/proyecto.adapter';
import { ProyectoInformaciónDetalladaProyección } from '../model/proyecciones/proyectoInformaciónDetalladaProyección';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProyectoObtenerService {

  // Variable para guardar la informacion de detallada del registro
  private registroInformacionDetallada: Observable<Respuesta<ProyectoInformaciónDetalladaProyección>>;
  // Variable para guardar un listado
  private registroListarConFiltro: Observable<Respuesta<Paginacion<ProyectoListarConFiltroProyeccion>>>; 
  // Variable para guardar un formulario
  protected formularioListarConFiltro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private proyectoAdapter: ProyectoAdapter
  ) {

    this.registroInformacionDetallada = new Observable;
    this.registroListarConFiltro = new Observable;
    this.formularioListarConFiltro = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      id: [''],
      nombre: ['']
    });
  }

  listarConFiltro(
    pageNo?: number,
    pageSize?: number,
    id?: string,
    nombre?: string
  ): void{
    this.registroListarConFiltro = this.proyectoAdapter.listarConFiltro(
      pageNo,
      pageSize,
      id,
      nombre
    );
    // return this.registroListarConFiltro;
  }

  obtenerInformaciónDetallada(
    proyectoId?: string
  ): void {
    this.registroInformacionDetallada = this.proyectoAdapter.obtenerInformaciónDetallada(
      proyectoId
    );

    // return this.registroInformacionDetallada;
  }

  getRegistroListarConFiltro(){
    return this.registroListarConFiltro;
  }

  getRegistroInformacionDetallada(){
    return this.registroInformacionDetallada;
  }

  getFormularioListarConFiltro(){
    return this.formularioListarConFiltro;
  }

  setFormularioListarConFiltro(formulario: FormGroup){
    this.formularioListarConFiltro = formulario;
  }

  limpiarSolicitudUsuarioListarConFilrtro(){
    this.registroListarConFiltro = new Observable;
    this.formularioListarConFiltro = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      id: [''],
      nombre: ['']
    });
  }

}
