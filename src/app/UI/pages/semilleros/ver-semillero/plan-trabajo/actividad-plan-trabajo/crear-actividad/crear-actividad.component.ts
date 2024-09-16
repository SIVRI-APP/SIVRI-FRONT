import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { CompromisoSemilleroObtenerService } from '../../../../../../../service/planTrabajo/domain/service/compromiso-semillero-obtener.service';
import { IntegrantesGrupoObtenerService } from '../../../../../../../service/grupos/domain/service/integrantes-grupo-obtener.service';
import { ActivatedRoute } from '@angular/router';
import { SemilleroObtenerService } from '../../../../../../../service/semilleros/domain/service/semillero-obtener.service';
import { Respuesta } from '../../../../../../../service/common/model/respuesta';
import { SemilleroProyeccion } from '../../../../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';
import { CompromisoSemillero } from '../../../../../../../service/planTrabajo/domain/model/proyecciones/compromisoSemillero';
import { IntegrantesMentores } from '../../../../../../../service/grupos/domain/model/proyecciones/integrantesMentores';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActividadPlanCrearService } from '../../../../../../../service/planTrabajo/domain/service/actividad-plan-crear.service';
import { ErrorData } from '../../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../../shared/modal-bad/modal-bad.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../../../shared/modal-ok/modal-ok.component';
import { CommunicationComponentsService } from '../../../../../../../service/common/communication-components.service';
import { NotificationAlertService } from '../../../../../../../service/common/notification-alert.service';


@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './crear-actividad.component.html',
  styleUrl: './crear-actividad.component.css'
})
export class CrearActividadComponent implements OnInit {
  @Input() idPlan!: number;
  protected idSemillero!: string;
  protected idGrupo!: number ;
  protected semillero:Respuesta<SemilleroProyeccion>
  compromisosSemillero: CompromisoSemillero[]=[];
  protected integrantesMentores: IntegrantesMentores[]=[];
  //formulario reactivo
  protected formulario: FormGroup;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;
  protected minDate: string=''; // Variable para almacenar la fecha mínima en formato YYYY-MM-DD
  @Output() mostrarCrear:boolean;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private semilleroObtenerService: SemilleroObtenerService,
    private compromisosObtenerService: CompromisoSemilleroObtenerService,
    private integrantesGrupoObtenerService: IntegrantesGrupoObtenerService,
    private actividadPlanCrearService: ActividadPlanCrearService,
    private actualizarListarService: CommunicationComponentsService,
    private notificationAlertService: NotificationAlertService,
  ){
    this.mostrarCrear= true;
    this.formulario= this.formBuilder.group({
      objetivo: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(1450)]],
      actividad: ['',[Validators.required]],
      compromiso: ['',[Validators.required]],
      responsable:['',[Validators.required]],
      fechaInicio:['',[Validators.required, this.fechaInicioValidator()]],
      fechaFin:['',[Validators.required]]
    },{
      validators: this.fechaFinValidator // Aplica el validador a nivel de grupo
    });
    this.semillero=new Respuesta<SemilleroProyeccion>();
    this.respuesta= new Respuesta<false>();
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

  }
  onsubmit(){

    if(this.formulario.valid){

      this.actividadPlanCrearService.crearActividad(this.idPlan,{
        objetivo:this.formulario.value.objetivo,
        actividad:this.formulario.value.actividad,
        idCompromiso:this.formulario.value.compromiso,
        responsableUsuarioId:this.formulario.value.responsable,
        fechaInicio:this.formulario.value.fechaInicio,
        fechaFin:this.formulario.value.fechaFin
      }).subscribe({
        next:(respuesta)=>{
          //console.log(respuesta);
          this.respuesta= respuesta;
          this.openModalOk(this.respuesta.userMessage);
          this.actualizarListarService.notificarActualizarListar('agregar');
          this.mostrarCrear = false;
        },
        // Manejar errores
        error: (errorData) => {
          // Verificar si el error es del tipo esperado
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
            // Manejar errores inesperados
            this.openModalBad(new ErrorData({ error: "Error inseperado, contactar a soporte" }));
          }
        }
      });
    }else{
      this.formulario.markAllAsTouched();
    }
  }
  //borrar los datos ingresados en el filtro
  cancelar(): void {
    this.mostrarCrear=false;
    this.actualizarListarService.notificarActualizarListar('cancelado');
    this.notificationAlertService.showAlert('','Actividad no Creada',3000);
  }
  openModalOk(message: string) {
    const modalRef = this.modalService.open(ModalOkComponent);
    modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        //cierra todas las modales
        this.modalService.dismissAll();
        //TODO FALTA QUE REDIRIJA A LISTAR
        //this.router.navigate([''])
      }

    });
  }
  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }
  fechaInicioValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const inputDate = new Date(control.value);
      const min = new Date(this.minDate);
      return inputDate >= min ? null : { 'fechaInicioInvalida': true };
    };
  }
  fechaFinValidator(formGroup: FormGroup): {[key: string]:any } | null  {
   // return (control: AbstractControl): {[key: string]: any} | null => {
   const fechaInicio = new Date(formGroup.get('fechaInicio')?.value);
    console.log('fecha inicio '+fechaInicio);

    const fechaFin = new Date(formGroup.get('fechaFin')?.value);
    console.log('fecha fin '+fechaFin);
    if (!fechaInicio || !fechaFin) {
      return null;  // Si uno de los dos no está definido, no hay validación
    }
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Siempre debe retornar un valor, ya sea null o un objeto con el error
    return fin <= inicio ? null : { 'fechaFinInvalida': true };
  }
}
