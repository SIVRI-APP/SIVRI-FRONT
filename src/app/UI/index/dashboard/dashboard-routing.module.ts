import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../pages/inicio/inicio.module').then(
            (c) => c.InicioModule
          ),
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('../../pages/inicio/inicio.module').then(
            (c) => c.InicioModule
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../../pages/usuarios/usuarios.module').then(
            (c) => c.UsuarioModule
          ),
      },
      {
        path: 'convocatorias',
        loadChildren: () =>
          import('../../pages/convocatorias/convocatorias.module').then(
            (c) => c.ConvocatoriasModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
