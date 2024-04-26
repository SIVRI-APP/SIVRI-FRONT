import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from '../UI/shared/auth/login/login.component';
import { NotFoundComponent } from '../UI/shared/not-found/not-found.component';
import { TestComponentComponent } from '../UI/index/test-component/test-component.component';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [authGuard],
    loadChildren: () => import('../UI/index/dashboard/dashboard.module').then(c => c.DashboardModule),
  },
  { path: 'test', component: TestComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
