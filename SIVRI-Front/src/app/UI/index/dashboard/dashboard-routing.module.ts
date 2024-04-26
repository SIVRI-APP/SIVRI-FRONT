import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { TestComponentComponent } from '../test-component/test-component.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
