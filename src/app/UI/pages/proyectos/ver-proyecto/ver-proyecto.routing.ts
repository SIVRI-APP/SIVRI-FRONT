import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexVerProyectoComponent } from './index-ver-proyecto/index-ver-proyecto.component';

const verProyectoRoutes: Routes = [
  {
    path: '',
    component: IndexVerProyectoComponent,
    children: [
      {
        path: '',
        redirectTo: 'informacion-general',
        pathMatch: 'full'
      },
      {
        path: 'informacion-general',
        loadComponent: () => import('./proyecto-informacion-general/proyecto-informacion-general.component').then((c) => c.ProyectoInformacionGeneralComponent),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(verProyectoRoutes)],
  exports: [RouterModule],
})
export class VerProyectoRoutingModule {}
