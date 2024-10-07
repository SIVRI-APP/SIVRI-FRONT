import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InformacionUsuarioAutenticadoService } from '../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  permitirCrearConvocatoria = false;
  requiredRoles = ["FUNCIONARIO:VICERRECTOR", "FUNCIONARIO:SUPER_ADMIN", "FUNCIONARIO:PROYECTOS_INTERNOS", "FUNCIONARIO:PROYECTOS_EXTERNOS" ];

  constructor( protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService){
    this.hasRequiredRoles();
  }

  hasRequiredRoles() {
    this.permitirCrearConvocatoria = this.informacionUsuarioAutenticadoService.retornarRoles().some(role => this.requiredRoles.includes(role));
  }

}
