import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(protected authService: AuthService){}
}
