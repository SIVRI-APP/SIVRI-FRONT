import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const solicitudUsuariosRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'listar',
        loadComponent: () => import('./listar-solicitud-usuario/listar-solicitud-usuario.component').then((c) => c.ListarSolicitudUsuarioComponent),
      },
      {
        path: 'ver',
        loadComponent: () => import('./ver-solicitud-usuario/ver-solicitud-usuario.component').then((c) => c.VerSolicitudUsuarioComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(solicitudUsuariosRoutes)],
  exports: [RouterModule],
})
export class SolicitudUsuariosRoutingModule {}
