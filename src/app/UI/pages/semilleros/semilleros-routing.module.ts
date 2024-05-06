import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemillerosRoutingModule { }
