import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexVerUsuarioComponent } from './index-ver-usuario/index-ver-usuario.component';

const verUsuarioRoutes: Routes = [
  {
    path: '',
    component: IndexVerUsuarioComponent,
    children: [
      {
        path: '',
        redirectTo: 'informacion-general',
        pathMatch: 'full'
      },
      {
        path: 'informacion-general',
        loadComponent: () => import('./informacion-general/informacion-general.component').then((c) => c.InformacionGeneralComponent),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(verUsuarioRoutes)],
  exports: [RouterModule],
})
export class VerUsuarioRoutingModule {}
