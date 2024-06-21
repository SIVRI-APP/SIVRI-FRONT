import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
**servicio que actua como intermediario entre los componentes de listar y
los componentes de: agreagr,actualizar,eliminar para actualizar las listar
***/
export class CommunicationComponentsService {
  private actualizarListarSubject= new Subject<string>();
  actualizarListar$ = this.actualizarListarSubject.asObservable();
  constructor() { }
  /*el tipo de notificacion para actualizar la lista se puede
  **manejar con: agregar, actualizar, eliminar */
  notificarActualizarListar(tipo: string){
    this.actualizarListarSubject.next(tipo);
  }
}
