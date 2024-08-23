import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProyectoListarConFiltroProyeccion } from '../model/proyecciones/proyectoListarConFiltroProyeccion';
import { Paginacion } from '../../../common/model/paginacion';
import { Respuesta } from '../../../common/model/respuesta';
import { ProyectoAdapter } from '../../infraestructure/proyecto.adapter';
import { ProyectoInformaciónDetalladaProyección } from '../model/proyecciones/proyectoInformaciónDetalladaProyección';

@Injectable({
  providedIn: 'root',
})
export class ProyectoObtenerService {

  // Variables para la informacion de un Proyecto
  private _informacionDetalladaProyecto: Observable<Respuesta<ProyectoInformaciónDetalladaProyección>>;

  // Variables para listar con filtro Proyectos
  private _listarConFiltroProyectos: Observable<Respuesta<Paginacion<ProyectoListarConFiltroProyeccion>>>; 

  constructor(
    private proyectoAdapter: ProyectoAdapter
  ) {

    this._informacionDetalladaProyecto = new Observable;
    this._listarConFiltroProyectos = new Observable;
  }

  // Metodos
  listarConFiltro(
    pageNo?: number,
    pageSize?: number,
    id?: string,
    nombre?: string
  ): void{
    this._listarConFiltroProyectos = this.proyectoAdapter.listarConFiltro(
      pageNo,
      pageSize,
      id,
      nombre
    );
  }

  obtenerInformaciónDetallada(
    proyectoId?: string
  ): void {
    this._informacionDetalladaProyecto = this.proyectoAdapter.obtenerInformaciónDetallada(
      proyectoId
    );
  }

  // Getters
  get informacionDetalladaProyecto(): Observable<Respuesta<ProyectoInformaciónDetalladaProyección>> {
    return this._informacionDetalladaProyecto;
  }

  get listarConFiltroProyectos(): Observable<Respuesta<Paginacion<ProyectoListarConFiltroProyeccion>>> {
    return this._listarConFiltroProyectos;
  }

}
