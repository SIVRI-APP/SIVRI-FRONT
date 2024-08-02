import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompromisoSemillero } from '../../../../../../../service/planTrabajo/domain/model/proyecciones/compromisoSemillero';
import { CompromisoSemilleroObtenerService } from '../../../../../../../service/planTrabajo/domain/service/compromiso-semillero-obtener.service';
import { IntegrantesGrupoObtenerService } from '../../../../../../../service/grupos/domain/service/integrantes-grupo-obtener.service';
import { ActivatedRoute } from '@angular/router';
import { SemilleroObtenerService } from '../../../../../../../service/semilleros/domain/service/semillero-obtener.service';
import { SemilleroProyeccion } from '../../../../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';
import { Respuesta } from '../../../../../../../service/common/model/respuesta';
import { IntegrantesMentores } from '../../../../../../../service/grupos/domain/model/proyecciones/integrantesMentores';
import { ActividadPlanObtenerService } from '../../../../../../../service/planTrabajo/domain/service/actividad-plan-obtener.service';
import { ListarActividadxId } from '../../../../../../../service/planTrabajo/domain/model/proyecciones/listarActividadxId';
import { ActividadPlanCrearService } from '../../../../../../../service/planTrabajo/domain/service/actividad-plan-crear.service';
import { ErrorData } from '../../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../../shared/modal-bad/modal-bad.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../../../shared/modal-ok/modal-ok.component';
import { CommunicationComponentsService } from '../../../../../../../service/common/communication-components.service';
import { NotificationAlertService } from '../../../../../../../service/common/notification-alert.service';

@Component({
  selector: 'app-actualizar-actividad',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './actualizar-actividad.component.html',
  styleUrl: './actualizar-actividad.component.css'
})
export class ActualizarActividadComponent  implements OnInit {
  @Input() idActividad!: number; // Recibe el ID de la actividad a editar
  protected idSemillero!: string;
  protected idGrupo!: number ;
  //formulario reactivo
  protected formulario: FormGroup;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  @Output() mostrarEditar:boolean;
  compromisosSemillero: CompromisoSemillero[]=[];
  protected semillero:Respuesta<SemilleroProyeccion>;
  protected integrantesMentores: IntegrantesMentores[]=[];
  protected minDate: string;
  protected actividadxid: Respuesta<ListarActividadxId>;
  protected respuesta: Respuesta<boolean>;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private compromisosObtenerService: CompromisoSemilleroObtenerService,
    private integrantesGrupoObtenerService: IntegrantesGrupoObtenerService,
    private semilleroObtenerService: SemilleroObtenerService,
    private actividadObtenerService: ActividadPlanObtenerService,
    private actividadCrearService: ActividadPlanCrearService,
    private actualizarListarService: CommunicationComponentsService,
    private notificationAlertService: NotificationAlertService,
  ){
    this.mostrarEditar=true;
    this.respuesta = new Respuesta<false>();
    this.formulario= this.formBuilder.group({
      objetivo: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(1450)]],
      actividad: ['',[Validators.required]],
      compromiso: ['',[Validators.required]],
      responsable:['',[Validators.required]],
      fechaInicio:['',[Validators.required]],
      fechaFin:['',[Validators.required]]
    });
    this.semillero=new Respuesta<SemilleroProyeccion>();
    this.actividadxid= new Respuesta<ListarActividadxId>();
    // Obtener la fecha actual en formato YYYY-MM-DD
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params=>{
      this.idSemillero=params['id'];
    });
    this.semilleroObtenerService.obtenerSemilleroInformacionDetallada(this.idSemillero).subscribe({
      next:(respuesta)=>{
        this.semillero=respuesta;
        this.idGrupo= this.semillero.data.grupoId;
        this.integrantesGrupoObtenerService.obtenerMentoresxgrupo(this.idGrupo).subscribe({
          next:(respuesta)=>{
          this.integrantesMentores= respuesta.data;

          }
        });
      }
    });
    this.compromisosObtenerService.obtenerCompromisosSemilleros().subscribe({
      next:(respuesta)=>{
        this.compromisosSemillero=respuesta.data;
      },
      error: (errorData) => {
        console.log(errorData);
      }
    });
    this.obtenerActividadxId();
  }
  obtenerActividadxId(){
    this.actividadObtenerService.obtenerActividadxId(this.idActividad).subscribe({
      next:(respuesta)=>{
        this.actividadxid=respuesta;
        this.formulario.get('objetivo')?.setValue(this.actividadxid.data.objetivo);
        this.formulario.get('actividad')?.setValue(this.actividadxid.data.actividad);
        this.formulario.get('compromiso')?.setValue(this.actividadxid.data.compromiso.id);
        this.formulario.get('responsable')?.setValue(this.actividadxid.data.responsableUsuarioId);
       this.formulario.get('fechaInicio')?.setValue(this.actividadxid.data.fechaInicio);
       this.formulario.get('fechaFin')?.setValue(this.actividadxid.data.fechaFin);
      }
    });

  }
  onsubmit(){
    if(this.formulario.valid){
      //edita la actividad de un plan de trabajo
      this.actividadCrearService.editarActividad(this.idActividad,{
        objetivo: this.formulario.value.objetivo,
        actividad: this.formulario.value.actividad,
        fechaInicio: this.formulario.value.fechaInicio,
        fechaFin: this.formulario.value.fechaFin,
        idCompromiso: this.formulario.value.compromiso,
        responsableUsuarioId: this.formulario.value.responsable
      }).subscribe({
        next:(respuesta)=>{
          this.respuesta=respuesta;
          this.openModalOk(this.respuesta.userMessage);
          this.actualizarListarService.notificarActualizarListar('actualizar');
          this.mostrarEditar=false;

        },
        // Manejar errores
        error: (errorData) => {
          // Verificar si el error es del tipo esperado
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
            // Manejar errores inesperados
            this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
          }
        }
      });
    }else{
      this.formulario.markAllAsTouched();
    }
  }

  cancelar(){
    this.notificationAlertService.showAlert('','Actividad no actualizada',3000);
    this.actualizarListarService.notificarActualizarListar('cancelado');
    this.mostrarEditar=false;
  }
  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Redirige a la ruta del componente ListarLineasComponent
        this.modalService.dismissAll();
      }

    });
	}
  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}
}
