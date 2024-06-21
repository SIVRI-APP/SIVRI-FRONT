import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InformacionUsuarioAutenticadoService } from '../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    protected informacionUsuarioAutenticadoService:InformacionUsuarioAutenticadoService
  ){
    // Aqui Yurani puede acceder a los roles
    console.log(informacionUsuarioAutenticadoService.retornarRoles());
  }
}
