import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {  IndexComponent } from './index/index.component';

const PerfilUsuarioRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(PerfilUsuarioRoutes)],
  exports: [RouterModule],
})
export class PerfilUsuariosRoutingModule {}
