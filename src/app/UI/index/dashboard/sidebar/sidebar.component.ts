import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../../../service/auth/domain/service/menu.service';
import { AuthService } from '../../../../service/auth/domain/service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    protected authService:AuthService,
    protected menuService:MenuService 
  ){
    console.log(menuService.retornarRoles())
    
  }
}
