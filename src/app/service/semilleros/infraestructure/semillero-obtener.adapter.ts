import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { environment } from '../../../config/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from '../../common/model/respuesta';
import { Paginacion } from '../../common/model/paginacion';
import { SemilleroListarConFiltroxMentorProyeccion } from '../domain/model/proyecciones/semilleroListarConFIltroxMentorProyeccion';
import { SemilleroObtenerService } from '../service/semillero-obtener.service';

@Injectable({
  providedIn: 'root',
})
export class SemilleroObtenerAdapter {
  private apiUrl = environment.urlApi + 'semilleros/';
  constructor(private http: HttpClient){}

  listarConFiltro(
    idSemillero: number | null,
    pageNo: number = 0,
    pageSize: number = 2,
    nombre?: string,
    estado?: string
  ):Observable<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>>{
    let params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());
    // Añade condicionalmente los otros parámetros si existen.
    if (idSemillero!= null) params = params.set('semilleroId', idSemillero);
    if (nombre !== undefined) params = params.set('nombre', nombre);
    if (estado !== undefined) params = params.set('estado', estado);
    return this.http.get<Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>>(this.apiUrl+'listarSemilleroConFiltroxmentor',{params:params});
  }
}
