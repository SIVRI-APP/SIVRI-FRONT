import { Component, OnInit } from '@angular/core';
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

  constructor(
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ) {
  }


}
