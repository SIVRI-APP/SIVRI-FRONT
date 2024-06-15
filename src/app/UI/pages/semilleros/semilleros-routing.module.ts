import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { VerSemilleroComponent } from './ver-semillero/ver-semillero.component';
import { ActualizarIntegranteComponent } from './ver-semillero/integrante/actualizar-integrante/actualizar-integrante.component';
import { ActualizarLineaComponent } from './ver-semillero/lineas/actualizar-linea/actualizar-linea.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'listar-semilleros',
        loadComponent: () => import('./listar-semilleros/listar-semilleros.component').then((c) => c.ListarSemillerosComponent),
      },
    ]
  }, {
    path: 'listar-semilleros/:id', /*loadChildren: () => import('./ver-semillero/ver-semillero.module').then(m => m.VerSemilleroModule),*/
    component: VerSemilleroComponent,
    children: [
      {
        path: 'descripcion',
        loadComponent: () => import('./ver-semillero/descripcion-semillero/descripcion-semillero.component').then((c) => c.DescripcionSemilleroComponent),
      },
      {
        path: 'listar-plan',
        loadComponent: () => import('./ver-semillero/plan-trabajo/listar-plan-trabajo/listar-plan-trabajo.component').then((c) => c.ListarPlanTrabajoComponent),
      }, {
        path: 'listar-integrantes',
        loadComponent: () => import('./ver-semillero/integrante/listar-integrantes/listar-integrantes.component').then((c) => c.ListarIntegrantesComponent),
      }, {
        path: 'listar-integrantes/:idIntegrante',
        component: ActualizarIntegranteComponent,
      },{
        path: 'Listar-lineas',
        loadComponent: () => import('./ver-semillero/lineas/listar-lineas/listar-lineas.component').then((c) => c.ListarLineasComponent),
      }, {
        path: 'Listar-lineas/:idLinea',
        component: ActualizarLineaComponent,
      },{
        path: 'listar-programas',
        loadComponent: () => import('./ver-semillero/programas/listar-programas/listar-programas.component').then((c)=>c.ListarProgramasComponent),
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemillerosRoutingModule { }
