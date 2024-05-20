import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexVerSolicitudUsuarioComponent } from './index-ver-solicitud-usuario/index-ver-solicitud-usuario.component';

const verSolicitudRoutes: Routes = [
  {
    path: '',
    component: IndexVerSolicitudUsuarioComponent,
    children: [
      {
        path: '',
        redirectTo: 'informacion-general',
        pathMatch: 'full'
      },
      {
        path: 'informacion-general',
        loadComponent: () => import('./informacion-general/informacion-general.component').then((c) => c.InformacionGeneralComponent),
      },
      {
        path: 'observaciones',
        loadComponent: () => import('./observaciones/observaciones.component').then((c) => c.ObservacionesComponent),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(verSolicitudRoutes)],
  exports: [RouterModule],
})
export class VerSolicitudUsuariosRoutingModule {}
