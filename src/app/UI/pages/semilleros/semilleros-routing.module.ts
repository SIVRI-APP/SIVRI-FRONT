import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { VerSemilleroComponent } from './ver-semillero/ver-semillero.component';
import { DescripcionSemilleroComponent } from './descripcion-semillero/descripcion-semillero.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'listar-semilleros',
        loadComponent:()=>import('./listar-semilleros/listar-semilleros.component').then((c) =>c.ListarSemillerosComponent),
      },
    ]
  },{
    path:'listar-semilleros/:id',
    component:VerSemilleroComponent,
    children:[
      {
        path:'descripcion',
        loadComponent:()=>import('./descripcion-semillero/descripcion-semillero.component').then((c)=>c.DescripcionSemilleroComponent),
      },
      {
        path:'listar-plan',
        loadComponent:()=>import('./plan-trabajo/listar-plan-trabajo/listar-plan-trabajo.component').then((c)=>c.ListarPlanTrabajoComponent),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemillerosRoutingModule { }
