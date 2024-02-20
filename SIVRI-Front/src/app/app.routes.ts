import { Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { LoginComponent } from './componentes/shared/login/login.component';
import { PaginaNoEncontradaComponent } from './componentes/shared/pagina-no-encontrada/pagina-no-encontrada.component';

export const routes: Routes = [
    {path: '', redirectTo:'/inicio', pathMatch:'full'},
    {path: 'inicio', component:DashboardComponent},
    {path: 'inicio-sesion', component:LoginComponent},
    {path: '**', component:PaginaNoEncontradaComponent}
];
