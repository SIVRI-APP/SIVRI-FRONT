import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from '../shared/login/login.component';
import { CredencialAdapter } from '../../../SIVRI/Credenciales/infraestructura/credencial.adapter';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, LoginComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  loggedOn = false;

  constructor(private credencialAdapter:CredencialAdapter){}

  ngOnInit(): void {
    this.credencialAdapter.userLoggedOn.subscribe({
      next:(token) => {
        this.loggedOn=token;
      }
    });
  }
}
