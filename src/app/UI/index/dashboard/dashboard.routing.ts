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
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('../../pages/inicio/inicio.module').then(
            (c) => c.InicioModule
          ),
      },
      {
        path: 'grupos',
        loadChildren: () =>
          import('../../pages/grupos/grupos.module').then(
            (c) => c.GruposModule
          ),
      },
      {
        path: 'semilleros',
        loadChildren: () =>
          import('../../pages/semilleros/semilleros.module').then(
            (c) => c.SemillerosModule
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
