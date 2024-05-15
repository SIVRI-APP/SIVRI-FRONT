import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const usuariosRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'listar-solicitudes',
        loadComponent: () => import('./listar-solicitud-usuarios/listar-solicitud-usuarios.component').then((c) => c.ListarSolicitudUsuariosComponent),
      },
      {
        path: 'crear-usuario',
        loadComponent: () => import('./crear-solicitud-usuario/crear-solicitud-usuario.component').then((c) => c.CrearSolicitudUsuarioComponent),
      },
      {
        path: 'listar-usuarios',
        loadComponent: () => import('./listar-usuarios/listar-usuarios.component').then((c) => c.ListarUsuariosComponent),
      }
    ],
  },
  { path: 'listar-solicitudes/:id', loadChildren: () => import('./ver-solicitud-usuario/ver-solicitud.module').then(m => m.VerSolicitudModule) },
  { path: 'listar-usuarios/:id', loadChildren: () => import('./ver-usuario/ver-usuario.module').then(m => m.VerUsuarioModule) }
];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
