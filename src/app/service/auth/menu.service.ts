import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Menu } from './domain/model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menuToDisplay: Menu[];

  constructor(protected authService: AuthService){
    this.menuToDisplay = [
      {
        menuItem: 'Inicio',
        subMenus: [] // Inicializando subMenus como una lista vacía
      }
    ]
  }

  construirMenu(){
    //TODO completar el menu
    for (let tipoUsuario of this.authService.token.authorities) {

      if (tipoUsuario.includes('FUNCIONARIO')) {
        
      }
      
    }
    
  }

}
