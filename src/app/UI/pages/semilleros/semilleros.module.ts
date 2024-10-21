import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SemillerosRoutingModule } from './semilleros-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificacionErrorComponent } from '../../shared/notificacion-error/notificacion-error.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SemillerosRoutingModule,
    ReactiveFormsModule,
    NotificacionErrorComponent,
  ],
  providers: [
    DatePipe // Agrega DatePipe como un proveedor
  ],
})
export class SemillerosModule { }
