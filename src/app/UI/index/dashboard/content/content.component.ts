import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../service/auth/domain/service/auth.service';
import { UsuarioSinRolComponent } from '../usuario-sin-rol/usuario-sin-rol.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent, UsuarioSinRolComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent{
  
  constructor(protected authService: AuthService){}

}
