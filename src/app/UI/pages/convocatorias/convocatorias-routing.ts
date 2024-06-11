import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const convocatoriasRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'listar',
        loadComponent: () => import('./listar-convocatorias/listar-convocatorias.component').then((c) => c.ListarConvocatoriasComponent),
      },
      {
        path: 'ver',
        loadComponent: () => import('./ver-convocatoria/ver-convocatoria.component').then((c) => c.VerConvocatoriaComponent),
      },
      {
        path: 'crear',
        loadComponent: () => import('./crear-convocatoria/crear-convocatoria.component').then((c) => c.CrearConvocatoriaComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(convocatoriasRoutes)],
  exports: [RouterModule],
})
export class ConvocatoriasRoutingModule {}
