import { Injectable } from '@angular/core';
import { SemilleroAdapter } from '../../infraestructure/semillero.adapter';
import { Observable } from 'rxjs';
import { Paginacion } from '../../../common/model/paginacion';
import { SemilleroListarConFiltroxMentorProyeccion } from '../model/proyecciones/semilleroListarConFIltroxMentorProyeccion';
import { Respuesta } from '../../../common/model/respuesta';
import { SemilleroProyeccion } from '../model/proyecciones/semilleroProyeccion';

@Injectable({
  providedIn: 'root'
})
export class SemilleroObtenerService {

  constructor(private semilleroAdapter: SemilleroAdapter ) { }

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
