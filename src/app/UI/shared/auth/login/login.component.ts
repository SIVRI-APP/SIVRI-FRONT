import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/domain/service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../../../service/auth/domain/model/loginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(protected authService: AuthService, private router: Router) {}

  protected loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: () => {
          const redirectUrl = this.authService.redirectUrl;

          if (redirectUrl && redirectUrl !== '/login') {
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigateByUrl('inicio'); // Redirigir al usuario al tablero si no hay ninguna URL almacenada
          }
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          this.loginForm.reset();
          this.clearRedirectUrl(); // Limpiar la URL almacenada después de la redirección
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      throw new Error('Formulario no valido');
    }
  }

  logout() {
    this.clearRedirectUrl();
    this.authService.logout();
  }

  // Método para limpiar la URL almacenada
  clearRedirectUrl() {
    this.authService.redirectUrl = null;
  }
}
