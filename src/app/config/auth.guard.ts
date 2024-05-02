import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/domain/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuth()) {
    return true;
  }

  // Almacena la URL de intento para redirigir después del login
  authService.redirectUrl = state.url;

  return router.createUrlTree(['/login']);
};
