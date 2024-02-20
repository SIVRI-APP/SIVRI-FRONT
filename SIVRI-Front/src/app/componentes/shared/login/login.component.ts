import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../servicios/shared/login/login.service';
import { LoginRequest } from '../../../servicios/shared/login/loginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(private router:Router, private loginService:LoginService){}

  protected loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (token) => {
          sessionStorage.setItem('token', token.access_token);
          console.log(token); 
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
