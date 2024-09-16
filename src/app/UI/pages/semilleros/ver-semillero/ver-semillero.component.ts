import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SemilleroObtenerService } from '../../../../service/semilleros/domain/service/semillero-obtener.service';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { SemilleroProyeccion } from '../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';
import { NotificationAlertService } from '../../../../service/common/notification-alert.service';
import { CommunicationComponentsService } from '../../../../service/common/communication-components.service';
import { InformacionUsuarioAutenticadoService } from '../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-ver-semillero',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,ReactiveFormsModule,],
  templateUrl: './ver-semillero.component.html',
  styleUrl: './ver-semillero.component.css'
})
export class VerSemilleroComponent {
  //campos de visualizacion del semillero
  protected id!: string;
  nombre: string = '';
  showAlert = false;
  titleMessaje='';
  messaje='';
  protected semillero: Respuesta<SemilleroProyeccion>;
  protected mostrarListaPlanes: boolean=false;
  protected mostrarPlanesMentor:boolean=false;
  protected mostrarPlanesDirector:boolean=false;
  private roles: string[]=[];
  constructor(
    //private router:Router,
    private route: ActivatedRoute,
    private semilleroObtenerService: SemilleroObtenerService,
    private notificationAlertService: NotificationAlertService,
    private communicationComponentService: CommunicationComponentsService,
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ) {
    this.semillero = new Respuesta<SemilleroProyeccion>;
    this.roles=informacionUsuarioAutenticadoService.retornarRoles();
    this.mostrarListaPlanes=this.roles.includes('FUNCIONARIO:SEMILLEROS');
    this.mostrarPlanesMentor= this.roles.includes('SEMILLERO:MENTOR');
    this.mostrarPlanesDirector= this.roles.includes('GRUPO:DIRECTOR');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.semilleroObtenerService.obtenerSemilleroInformacionDetallada(this.id).subscribe({
        next: (respuesta) => {

          this.semillero = respuesta;
          this.nombre=this.semillero.data.nombre;
          //this.router.navigate([`semilleros/listar-semilleros/${this.id}/descripcion`]);

        }
      })
    });
    this.notificationAlertService.alert$.subscribe(
      (res:any) => {
        this.showAlert=true;
        this.messaje=res.messaje;

        setTimeout(()=>{
          this.showAlert=false;
        },res.time)
      });
    // Suscríbete al observable para recibir actualizaciones del nombre
    this.communicationComponentService.nombreSemillero$.subscribe((nuevoNombre)=>{
      this.nombre = nuevoNombre;
    });
  }


}
