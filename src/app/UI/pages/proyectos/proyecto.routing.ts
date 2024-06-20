import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const proyectosRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'listar',
        loadComponent: () => import('./listar-proyectos/listar-proyectos.component').then((c) => c.ListarProyectosComponent),
      },
      {
        path: 'ver',
        loadComponent: () => import('./ver-proyecto/ver-proyecto.component').then((c) => c.VerProyectoComponent),
      },
      {
        path: 'crear-usuario',
        loadComponent: () => import('./crear-proyecto/crear-proyecto.component').then((c) => c.CrearProyectoComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(proyectosRoutes)],
  exports: [RouterModule],
})
export class ProyectosRoutingModule {}
