import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { VerSemilleroComponent } from './ver-semillero/ver-semillero.component';
import { ActualizarIntegranteComponent } from './ver-semillero/integrante/actualizar-integrante/actualizar-integrante.component';
import { ActualizarLineaComponent } from './ver-semillero/lineas/actualizar-linea/actualizar-linea.component';
import { EditarObservacionComponent } from './ver-semillero/observaciones/editar-observacion/editar-observacion.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'listar-semilleros',
        pathMatch: 'full'
      },
      {
        path: 'listar-semilleros',
        loadComponent: () => import('./listar-semilleros/listar-semilleros.component').then((c) => c.ListarSemillerosComponent),
      },{
        path:'listar-semilleros-director',
        loadComponent: () => import('./listar-semilleros-director/listar-semilleros-director.component').then((c)=> c.ListarSemillerosDirectorComponent),
      },{
        path: 'crear-semillero',
        loadComponent: () => import('./crear-semillero/crear-semillero.component').then((c) => c.CrearSemilleroComponent),
      },{
        path: 'semilleros',
        loadComponent: () => import('./listar-todos-semilleros/listar-todos-semilleros.component').then((c)=> c.ListarTodosSemillerosComponent),
      },{
        path: 'integrantes-semillero',
        loadComponent: () => import('./listar-todos-integrantes-semillero/listar-todos-integrantes-semillero.component').then((c) => c.ListarTodosIntegrantesSemilleroComponent),
      }
    ]
  }, {
    path: 'listar-semilleros/:id', /* loadChildren: () => import('./ver-semillero/ver-semillero.module').then((m) => m.VerSemilleroModule),*/
    component: VerSemilleroComponent,
    children: [
      {
        path: 'descripcion',
        loadComponent: () => import('./ver-semillero/descripcion-semillero/descripcion-semillero.component').then((c) => c.DescripcionSemilleroComponent),
      },
      {
        path: 'listar-plan',
        loadComponent: () => import('./ver-semillero/plan-trabajo/listar-plan-trabajo/listar-plan-trabajo.component').then((c) => c.ListarPlanTrabajoComponent),
      },
      {
        path: 'editar-plan',
        loadComponent: () => import('./ver-semillero/plan-trabajo/editar-plan/editar-plan.component').then((c) => c.EditarPlanComponent),
      }, {
        path: 'listar-integrantes',
        loadComponent: () => import('./ver-semillero/integrante/listar-integrantes/listar-integrantes.component').then((c) => c.ListarIntegrantesComponent),
      }, {
        path: 'listar-integrantes/:idIntegrante',
        component: ActualizarIntegranteComponent,
      },{
        path: 'listar-lineas',
        loadComponent: () => import('./ver-semillero/lineas/listar-lineas/listar-lineas.component').then((c) => c.ListarLineasComponent),
      }, {
        path: 'listar-lineas/:idLinea',
        component: ActualizarLineaComponent,
      }, {
        path: 'listar-programas',
        loadComponent: () => import('./ver-semillero/programas/listar-programas/listar-programas.component').then((c)=>c.ListarProgramasComponent),
      }, {
        path: 'listar-documentos',
        loadComponent: () => import('./ver-semillero/documentos/listar-documentos/listar-documentos.component').then((c)=>c.ListarDocumentosComponent),
      }, {
        path: 'listar-observaciones',
        loadComponent: () => import('./ver-semillero/observaciones/listar-observaciones/listar-observaciones.component').then((c)=>c.ListarObservacionesComponent),
      },{
        path: 'listar-observaciones/:idObservacion',
        component: EditarObservacionComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemillerosRoutingModule { }
/**/
