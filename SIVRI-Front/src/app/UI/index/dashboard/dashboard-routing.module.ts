import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { authGuard } from '../../../config/auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'usuarios',
            loadChildren: () => import('../../pages/usuarios/usuarios.module').then((c) => c.UsuarioModule),
          },
          {
            path: 'solicitud-usuarios',
            loadChildren: () => import('../../pages/solicitud-usuarios/solicitud-usuarios.module').then((c) => c.SolicitudUsuarioModule),
          },
          {
            path: 'convocatorias',
            loadChildren: () => import('../../pages/convocatorias/convocatorias.module').then((c) => c.ConvocatoriasModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}