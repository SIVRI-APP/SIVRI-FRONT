import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexVerSemilleroComponent } from './index-ver-semillero/index-ver-semillero.component';

const verSemilleroRoutes: Routes = [
  {
    path: '',
    component: IndexVerSemilleroComponent,
    children: [
      {
        path: '',
        redirectTo: 'descripcion',
        pathMatch: 'full'
      },
      {
        path: 'descripcion',
        loadComponent: () => import('./descripcion-semillero/descripcion-semillero.component').then((c) => c.DescripcionSemilleroComponent),
      }, {
        path: 'listar-plan',
        loadComponent: () => import('./plan-trabajo/listar-plan-trabajo/listar-plan-trabajo.component').then((c) => c.ListarPlanTrabajoComponent),
      }, {
        path: 'listar-integrantes',
        loadComponent: () => import('./integrante/listar-integrantes/listar-integrantes.component').then((c) => c.ListarIntegrantesComponent),
      }, {
        path: 'listar-integrantes/:idIntegrante',
        //component: ActualizarIntegranteComponent,
      }, {
        path: 'Listar-lineas',
        // loadComponent: () => import('./lineas/listar-lineas/listar-lineas.component').then((c) => c.ListarLineasComponent),
      }

    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(verSemilleroRoutes)],
  exports: [RouterModule],
})

export class VerSemilleroRoutingModule { }
