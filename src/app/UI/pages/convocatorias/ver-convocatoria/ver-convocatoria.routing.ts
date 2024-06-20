import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexVerConvocatoriaComponent } from './index-ver-convocatoria/index-ver-convocatoria.component';

const verConvocatoriaRoutes: Routes = [
  {
    path: '',
    component: IndexVerConvocatoriaComponent,
    children: [
      {
        path: '',
        redirectTo: 'informacion-general',
        pathMatch: 'full'
      },
      {
        path: 'informacion-general',
        loadComponent: () => import('./convocatoria-informacion-general/convocatoria-informacion-general.component').then((c) => c.ConvocatoriaInformacionGeneralComponent),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(verConvocatoriaRoutes)],
  exports: [RouterModule],
})
export class VerConvocatoriaRoutingModule {}
