import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const convocatoriasRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'listar',
        loadComponent: () => import('./listar-convocatorias/listar-convocatorias.component').then((c) => c.ListarConvocatoriasComponent),
      },
      {
        path: 'crear',
        loadComponent: () => import('./crear-convocatoria/crear-convocatoria.component').then((c) => c.CrearConvocatoriaComponent),
      },
    ],
  },
  { path: 'listar/:id', loadChildren: () => import('./ver-convocatoria/ver-convocatoria.module').then(m => m.VerConvocatoriaModule) },
];

@NgModule({
  imports: [RouterModule.forChild(convocatoriasRoutes)],
  exports: [RouterModule],
})
export class ConvocatoriasRoutingModule {}
