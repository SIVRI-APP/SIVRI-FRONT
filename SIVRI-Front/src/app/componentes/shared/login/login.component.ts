import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CredencialAdapter } from '../../../../SIVRI/Credenciales/infraestructura/credencial.adapter';
import { LoginRequest } from '../../../../SIVRI/Credenciales/domain/models/loginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(private router:Router, private credencialAdapter:CredencialAdapter){}

  protected loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if(this.loginForm.valid){
      this.credencialAdapter.autenticar(this.loginForm.value as LoginRequest).subscribe({
        next: () => {
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        },
      });
    }else{
      this.loginForm.markAllAsTouched();
      throw new Error('Formulario no valido');
    }
  }

}
