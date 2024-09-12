import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Paginacion } from '../../../common/model/paginacion';
import { Respuesta } from '../../../common/model/respuesta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListarOrganismosParaAsociarProyectoProyeccion } from '../model/proyecciones/listarOrganismosParaAsociarProyectoProyeccion';
import { GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion } from '../model/proyecciones/obtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion';
import { OrganismoAdapter } from '../../infraestructura/organismo.adapter';

@Injectable({
  providedIn: 'root',
})
export class OrganismoObtenerService {

  // Variable para guardar la informacion de detallada del registro
  private registroInformacionDetallada: Observable<Respuesta<GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion>>;
  // Variable para guardar un listado
  private registroListarConFiltro: Observable<Respuesta<Paginacion<ListarOrganismosParaAsociarProyectoProyeccion>>>; 
  // Variable para guardar un formulario
  protected formularioListarConFiltro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private organismoAdapter: OrganismoAdapter
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
    tipoOrganismo: string,
    pageNo?: number,
    pageSize?: number,
    id?: string,
    nombre?: string
  ): void{
    this.registroListarConFiltro = this.organismoAdapter.listarConFiltro(
      pageNo,
      pageSize,
      tipoOrganismo,
      id,
      nombre
    );
  }

  listarIntegrantesDocenteOrganismo(
    organismoId?: string
  ): void {
    this.registroInformacionDetallada = this.organismoAdapter.listarIntegrantesDocenteOrganismo(
      organismoId
    );
  }

  listarIntegrantesOrganismo(
    organismoId?: string
  ): Observable<Respuesta<GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion>> {
    return this.registroInformacionDetallada = this.organismoAdapter.listarIntegrantesOrganismo(
      organismoId
    );
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
