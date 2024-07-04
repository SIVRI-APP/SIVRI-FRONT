import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DescripcionSemilleroComponent } from './descripcion-semillero/descripcion-semillero.component';
import { SemilleroObtenerService } from '../../../../service/semilleros/domain/service/semillero-obtener.service';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { SemilleroProyeccion } from '../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';
import { NotificationAlertService } from '../../../../service/common/notification-alert.service';

@Component({
  selector: 'app-ver-semillero',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,ReactiveFormsModule],
  templateUrl: './ver-semillero.component.html',
  styleUrl: './ver-semillero.component.css'
})
export class VerSemilleroComponent {
  //campos de visualizacion del semillero
  protected id!: string;
  protected nombre: string = '';
  showAlert = false;
  titleMessaje='';
  messaje='';
  protected semillero: Respuesta<SemilleroProyeccion>
  constructor(
    private route: ActivatedRoute,
    private semilleroObtenerService: SemilleroObtenerService,
    private notificationAlertService: NotificationAlertService
  ) {
    this.semillero = new Respuesta<SemilleroProyeccion>
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('id semilleroo ' + this.id);
      this.semilleroObtenerService.obtenerSemilleroInformacionDetallada(this.id).subscribe({
        next: (respuesta) => {
          console.log("semillero ------------------------")
          console.log(respuesta)
          this.semillero = respuesta;
          this.nombre=this.semillero.data.nombre;
        }
      })
    });
    this.notificationAlertService.alert$.subscribe(
      (res:any) => {
        this.showAlert=true;
        this.messaje=res.messaje;
        console.log(res)
        setTimeout(()=>{
          this.showAlert=false;
        },res.time)
      });
  }

}
