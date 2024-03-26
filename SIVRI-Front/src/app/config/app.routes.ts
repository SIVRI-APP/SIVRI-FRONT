import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from '../UI/shared/auth/login/login.component';
import { NotFoundComponent } from '../UI/shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    // canActivate: [authGuard],
    loadChildren: () => import('../UI/index/dashboard/dashboard.module').then(c => c.DashboardModule),
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
