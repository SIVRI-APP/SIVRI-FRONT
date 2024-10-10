import { Injectable } from '@angular/core';
import { ProgramaAdapter } from '../../infraestructure/programa.adapter';
import { ListarProgramas } from '../model/proyecciones/listarProgramas';
import { Respuesta } from '../../../common/model/respuesta';
import { Observable } from 'rxjs';
import { Programa } from '../model/proyecciones/programa';

@Injectable({
  providedIn: 'root'
})
export class ProgramaObtenerService {
  //guarda los programas x departamento
  private programasxdepartamento: Observable<Respuesta<ListarProgramas[]>>;
  constructor(private programaAdapter: ProgramaAdapter) {
    this.programasxdepartamento= new Observable;
   }
   obtenerProgramas():Observable<Respuesta<Programa[]>>{
    return this.programaAdapter.obtenerProgramas();
   }
  obtenerProgramasxdepartamento(
    semilleroId?: string,
  ):Observable<Respuesta<ListarProgramas[]>>{
   this.programasxdepartamento=this.programaAdapter.obtenerProgramasxdepartamento(semilleroId);
   return this.programasxdepartamento;
  }

  getProgramasxDepartamento(){
    return this.programasxdepartamento;
  }

}
