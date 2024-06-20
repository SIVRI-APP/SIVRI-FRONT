import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const proyectosRoutes: Routes = [
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
        loadComponent: () => import('./listar-proyectos/listar-proyectos.component').then((c) => c.ListarProyectosComponent),
      },
      {
        path: 'crear',
        loadComponent: () => import('./crear-proyecto/crear-proyecto.component').then((c) => c.CrearProyectoComponent),
      },
    ],
  },
  { path: 'listar/:id', loadChildren: () => import('./ver-proyecto/ver-proyecto.module').then(m => m.VerProyectoaModule) },
];

@NgModule({
  imports: [RouterModule.forChild(proyectosRoutes)],
  exports: [RouterModule],
})
export class ProyectosRoutingModule {}
