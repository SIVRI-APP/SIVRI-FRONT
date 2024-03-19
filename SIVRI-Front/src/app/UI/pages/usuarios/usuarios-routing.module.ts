import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const usuariosRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'listar',
        loadComponent: () => import('./listar-usuarios/listar-usuarios.component').then((c) => c.ListarUsuariosComponent),
      },
      {
        path: 'ver',
        loadComponent: () => import('./ver-usuario/ver-usuario.component').then((c) => c.VerUsuarioComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
