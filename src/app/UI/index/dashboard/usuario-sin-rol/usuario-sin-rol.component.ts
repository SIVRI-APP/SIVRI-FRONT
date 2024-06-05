import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/domain/service/auth.service';

@Component({
  selector: 'app-usuario-sin-rol',
  standalone: true,
  imports: [],
  templateUrl: './usuario-sin-rol.component.html',
  styleUrl: './usuario-sin-rol.component.css'
})
export class UsuarioSinRolComponent {
  constructor(protected authService: AuthService){}
}
