import { Injectable } from '@angular/core';
import { SemilleroAdapter } from '../../infraestructure/semillero.adapter';
import { Observable } from 'rxjs';
import { Paginacion } from '../../../common/model/paginacion';
import { SemilleroListarConFiltroxMentorProyeccion } from '../model/proyecciones/semilleroListarConFIltroxMentorProyeccion';
import { Respuesta } from '../../../common/model/respuesta';
import { SemilleroProyeccion } from '../model/proyecciones/semilleroProyeccion';
import { ListarSemilleroosFuncionarioProyeccion } from '../model/proyecciones/liatarSemillerosFuncionarioProyeccion';

@Injectable({
  providedIn: 'root'
})
export class SemilleroObtenerService {

  constructor(private semilleroAdapter: SemilleroAdapter ) { }

  listarConFiltroFuncionario(
    pageNo: number = 0,
    pageSize: number = 2,
    nombre?: string,
    correo?: string,
    estado?: string
  ):Observable<Respuesta<Paginacion<ListarSemilleroosFuncionarioProyeccion>>>{
    return this.semilleroAdapter.listarConFiltroFuncionario(pageNo,pageSize,nombre,correo,estado);
  }
  listarConFiltroDirector(
    idSemillero: number | null,
    pageNo: number,
    pageSize: number,
    nombre?: string,
    estado?: string
  ): Observable<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>>{
    return this.semilleroAdapter.listarConFiltroDirector(idSemillero,pageNo,pageSize,nombre,estado);
  }
  listarConFiltro(
    idSemillero: number | null,
    pageNo?: number,
    pageSize?: number,
    nombre?: string,
    estado?:string
  ): Observable<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>>{
     return this.semilleroAdapter.listarConFiltro(
      idSemillero,pageNo,pageSize,nombre,estado
    );
  }

  obtenerSemilleroInformacionDetallada(
    semilleroId?: string
  ):Observable<Respuesta<SemilleroProyeccion>>{
    return this.semilleroAdapter.obtenerSemilleroInformacionDetallada(semilleroId);
  }
}
