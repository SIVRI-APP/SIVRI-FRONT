import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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

  //comunicar el cambio del nombre del semillero
  // El BehaviorSubject almacena el último valor emitido y lo comparte con los suscriptores.
  private nombreSemilleroSubject = new BehaviorSubject<string>('');
  // Este observable será accesible para otros componentes.
  nombreSemillero$ = this.nombreSemilleroSubject.asObservable();
  // Este método permite cambiar el nombre del semillero.
  actualizarNombreSemillero(nombre: string){
    this.nombreSemilleroSubject.next(nombre);
  }
}
