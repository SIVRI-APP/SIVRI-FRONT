import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioSolicitudListarConFiltroProyeccion } from '../model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { Paginacion } from '../../../common/model/paginacion';
import { Respuesta } from '../../../common/model/respuesta';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioSolicitudAdapter } from '../../infraestructure/usuarioSolicitud.adapter';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitudObtenerService {

  // Variable para guardar la informacion de un registro en particular
  private solicitudUsuarioInformaciónDetallada: Observable<Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>>;
  // Variable para guardar un listado
  private solicitudUsuarioListarConFilrtro: Observable<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>>; 
  // Variable para guardar un formulario
  protected formularioListarConFiltro: FormGroup;

  constructor(
    private usuarioSolicitudAdapter: UsuarioSolicitudAdapter,
    private formBuilder: FormBuilder,
  ) {
    this.solicitudUsuarioInformaciónDetallada = new Observable;
    this.solicitudUsuarioListarConFilrtro = new Observable;
    // Inicialización del formulario reactivo
    this.formularioListarConFiltro = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      correo: [''],
      estado: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
      nombres: [''],
      apellidos: [''],
      tipoUsuario: ['']
    });
  }

  listarConFiltro(
    pageNo?: number,
    pageSize?: number,
    correo?: string,
    estado?: string,
    tipoDocumento?: string,
    numeroDocumento?: string,
    nombre?: string,
    apellido?: string,
    tipoUsuario?: string
  ): Observable<Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>> {
    this.solicitudUsuarioListarConFilrtro = this.usuarioSolicitudAdapter.listarConFiltro(
      pageNo,
      pageSize,
      correo,
      estado,
      tipoDocumento,
      numeroDocumento,
      nombre,
      apellido,
      tipoUsuario
    );
    return this.solicitudUsuarioListarConFilrtro;
  }

  obtenerSolicitudUsuarioInformaciónDetallada(
    solicitudUsuarioId?: string
  ): Observable<Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>> {
    this.solicitudUsuarioInformaciónDetallada = this.usuarioSolicitudAdapter.obtenerSolicitudUsuarioInformaciónDetallada(
      solicitudUsuarioId
    );

    return this.solicitudUsuarioInformaciónDetallada;
  }

  getSolicitudUsuarioInformaciónDetallada(){
    return this.solicitudUsuarioInformaciónDetallada;
  }

  getSolicitudUsuarioListarConFilrtro(){
    return this.solicitudUsuarioListarConFilrtro;
  }

  limpiarSolicitudUsuarioListarConFilrtro(){
    this.solicitudUsuarioListarConFilrtro = new Observable;
  }

  setFormularioListarConFiltro(formulario: FormGroup){
    this.formularioListarConFiltro = formulario;
  }

  getFormularioListarConFiltro(){
    return this.formularioListarConFiltro;
  }


}
