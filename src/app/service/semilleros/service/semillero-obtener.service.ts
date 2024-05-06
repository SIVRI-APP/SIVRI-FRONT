import { Injectable } from '@angular/core';
import { SemilleroObtenerAdapter } from '../infraestructure/semillero-obtener.adapter';
import { Observable } from 'rxjs';
import { Paginacion } from '../../common/model/paginacion';
import { SemilleroListarConFiltroxMentorProyeccion } from '../domain/model/proyecciones/semilleroListarConFIltroxMentorProyeccion';
import { Respuesta } from '../../common/model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class SemilleroObtenerService {

  constructor(private semilleroObtenerAdapter: SemilleroObtenerAdapter ) { }

  listarConFiltro(
    pageNo?: number,
    pageSize?: number,
    idSemillero?: number,
    idUsuario?: number,
    nombre?: string,
    estado?:string
  ): Observable<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>>{
    return this.semilleroObtenerAdapter.listarConFiltro(
      pageNo,pageSize,idSemillero,idUsuario,nombre,estado
    );
  }
}
