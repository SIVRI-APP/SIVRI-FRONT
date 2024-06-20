import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConvocatoriaListarConFiltroProyeccion } from '../model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { Paginacion } from '../../../common/model/paginacion';
import { Respuesta } from '../../../common/model/respuesta';
import { ConvocatoriaAdapter } from '../../infraestructure/convocatoria.adapter';
import { ConvocatoriaInformaciónDetalladaProyección } from '../model/proyecciones/convocatoriaInformaciónDetalladaProyección';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ConvocatoriaObtenerService {

  // Variable para guardar la informacion de detallada del registro
  private registroInformacionDetallada: Observable<Respuesta<ConvocatoriaInformaciónDetalladaProyección>>;
  // Variable para guardar un listado
  private registroListarConFiltro: Observable<Respuesta<Paginacion<ConvocatoriaListarConFiltroProyeccion>>>; 
  // Variable para guardar un formulario
  protected formularioListarConFiltro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private convocatoriaAdapter: ConvocatoriaAdapter
  ) {

    this.registroInformacionDetallada = new Observable;
    this.registroListarConFiltro = new Observable;
    this.formularioListarConFiltro = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      id: [''],
      nombre: [''],
      estado: [''],
      tipoFinanciacion: ['']
    });
  }

  listarConFiltro(
    pageNo?: number,
    pageSize?: number,
    id?: string,
    nombre?: string,
    estado?: string,
    tipoFinanciacion?: string,
  ): void{
    this.registroListarConFiltro = this.convocatoriaAdapter.listarConFiltro(
      pageNo,
      pageSize,
      id,
      nombre,
      estado,
      tipoFinanciacion,
    );
    // return this.registroListarConFiltro;
  }

  obtenerSolicitudUsuarioInformaciónDetallada(
    convocatoriaId?: string
  ): void {
    this.registroInformacionDetallada = this.convocatoriaAdapter.obtenerInformaciónDetallada(
      convocatoriaId
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
      nombre: [''],
      estado: [''],
      tipoFinanciacion: ['']
    });
  }

}
