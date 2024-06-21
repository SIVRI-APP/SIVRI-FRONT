import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SemillerosRoutingModule } from './semilleros-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SemillerosRoutingModule
  ],
  providers: [
    DatePipe // Agrega DatePipe como un proveedor
  ],
})
export class SemillerosModule { }
