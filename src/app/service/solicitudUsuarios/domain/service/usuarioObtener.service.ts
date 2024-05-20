import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Paginacion } from '../../../common/model/paginacion';
import { Respuesta } from '../../../common/model/respuesta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioAdapter } from '../../infraestructure/usuario.adapter';
import { UsuarioListarConFiltroProyeccion } from '../model/proyecciones/usuarioListarConFiltroProyeccion';
import { UsuarioInformaciónDetalladaProyección } from '../model/proyecciones/usuarioInformaciónDetalladaProyección';

@Injectable({
  providedIn: 'root',
})
export class UsuarioObtenerService {

  // Variable para guardar la informacion de un registro en particular
  private usuarioInformaciónDetallada: Observable<Respuesta<UsuarioInformaciónDetalladaProyección>>;
  // Variable para guardar un listado
  private usuarioListarConFilrtro: Observable<Respuesta<Paginacion<UsuarioListarConFiltroProyeccion>>>; 
  // Variable para guardar un formulario
  protected formularioListarConFiltro: FormGroup;

  constructor(
    private usuarioAdapter: UsuarioAdapter,
    private formBuilder: FormBuilder,
  ) {
    this.usuarioInformaciónDetallada = new Observable;
    this.usuarioListarConFilrtro = new Observable;
    // Inicialización del formulario reactivo
    this.formularioListarConFiltro = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      correo: [''],
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
    tipoDocumento?: string,
    numeroDocumento?: string,
    nombre?: string,
    apellido?: string,
    tipoUsuario?: string
  ): Observable<Respuesta<Paginacion<UsuarioListarConFiltroProyeccion>>> {
    this.usuarioListarConFilrtro = this.usuarioAdapter.listarConFiltro(
      pageNo,
      pageSize,
      correo,
      tipoDocumento,
      numeroDocumento,
      nombre,
      apellido,
      tipoUsuario
    );
    return this.usuarioListarConFilrtro;
  }

  obtenerUsuarioInformaciónDetallada(
    usuarioId?: string
  ): Observable<Respuesta<UsuarioInformaciónDetalladaProyección>> {
    this.usuarioInformaciónDetallada = this.usuarioAdapter.obtenerUsuarioInformaciónDetallada(
      usuarioId
    );

    return this.usuarioInformaciónDetallada;
  }

  getUsuarioInformaciónDetallada(){
    return this.usuarioInformaciónDetallada;
  }

  getUsuarioListarConFilrtro(){
    return this.usuarioListarConFilrtro;
  }

  setFormularioListarConFiltro(formulario: FormGroup){
    this.formularioListarConFiltro = formulario;
  }

  getFormularioListarConFiltro(){
    return this.formularioListarConFiltro;
  }
}
