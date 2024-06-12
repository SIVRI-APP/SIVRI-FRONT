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
  notificarActualizarListar(tipo: string){
    this.actualizarListarSubject.next(tipo);
  }
}
