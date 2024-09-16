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
      },
      {
        path: 'convocatoria',
        loadComponent: () => import('./documentos-proyecto/documentos-proyecto.component').then((c) => c.DocumentosProyectoComponent),
      },
      {
        path: 'integrantes',
        loadComponent: () => import('./integrantes-proyecto/integrantes-proyecto.component').then((c) => c.IntegrantesProyectoComponent),
      },
      {
        path: 'compromisos',
        loadComponent: () => import('./compromisos-proyecto/compromisos-proyecto.component').then((c) => c.CompromisosProyectoComponent),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(verProyectoRoutes)],
  exports: [RouterModule],
})
export class VerProyectoRoutingModule {}
