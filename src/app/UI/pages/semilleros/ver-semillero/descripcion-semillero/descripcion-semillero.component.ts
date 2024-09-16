import { LineaInvestigacion } from '../../../../../service/semilleros/domain/model/proyecciones/lineaInvestigacion';
import { Component, EventEmitter, NgModule, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { SemilleroProyeccion } from '../../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';
import { SemilleroEstado } from '../../../../../service/semilleros/domain/model/enum/semilleroEstado';
import { Sede } from '../../../../../service/semilleros/domain/model/enum/sede';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { SemilleroObtenerService } from '../../../../../service/semilleros/domain/service/semillero-obtener.service';
import { GrupoObtenerService } from '../../../../../service/grupos/domain/service/grupo-obtener.service';
import { GrupoProyeccion } from '../../../../../service/grupos/domain/model/proyecciones/grupoProyeccion';
import { ListarProgramas } from '../../../../../service/academica/domain/model/proyecciones/listarProgramas';
import { Paginacion } from '../../../../../service/common/model/paginacion';
import { LineaInvestigacionObtenerService } from '../../../../../service/semilleros/domain/service/linea-investigacion-obtener.service';
import { GrupoDisciplinaObtenerService } from '../../../../../service/grupos/domain/service/grupo-disciplina-obtener.service';
import { ListarDisciplinaxGrupoIdProyeccion } from '../../../../../service/grupos/domain/model/proyecciones/listarDisciplinasxGrupoIdProyeccion';
import { SemilleroActualizarService } from '../../../../../service/semilleros/domain/service/semillero-actualizar.service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { SemilleroProgramaObtenerService } from '../../../../../service/semilleros/domain/service/semillero-programa-obtener.service';
import { NotificationAlertService } from '../../../../../service/common/notification-alert.service';
import { CommunicationComponentsService } from '../../../../../service/common/communication-components.service';

@Component({
  selector: 'app-descripcion-semillero',
  standalone: true,
  imports: [
    RouterOutlet,RouterLink,
    ReactiveFormsModule,RouterLinkActive,

  ],
  templateUrl: './descripcion-semillero.component.html',
  styleUrl: './descripcion-semillero.component.css'
})
export class DescripcionSemilleroComponent implements OnInit {
  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  nombreSemillero: string='';
  //campos que ayuda a la visualizacion
  protected id!: string;
  protected idgrupo!: number;
  //datos del semillero
  protected semillero: Respuesta<SemilleroProyeccion>
  protected grupo: Respuesta<GrupoProyeccion>
  protected programas: Respuesta<Paginacion<ListarProgramas>>
  protected nombreProgramas: string = '';
  protected lineas: Respuesta<LineaInvestigacion[]>;
  protected nombreLineas: string = '';
  protected disciplinas: Respuesta<ListarDisciplinaxGrupoIdProyeccion[]>
  protected nombreDisciplinas: string = '';
  //formulario reactivo
  protected formulario: FormGroup;
  //enumeraciones que llenan los select
  protected estadoSemilleroEnum = SemilleroEstado;
  protected sedeEnum = Sede;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService,
    private semilleroObtenerService: SemilleroObtenerService,
    private grupoObtenerService: GrupoObtenerService,
    private semilleroProgramaObtenerService: SemilleroProgramaObtenerService,
    private lineasInvestigacionObtenerService: LineaInvestigacionObtenerService,
    private grupoDisciplinaObtenerService: GrupoDisciplinaObtenerService,
    private semilleroActualizarService: SemilleroActualizarService,
    private notificationAlertService: NotificationAlertService,
    private communicationComponentService: CommunicationComponentsService
  ) {
    this.respuesta = new Respuesta<false>();
    this.semillero = new Respuesta<SemilleroProyeccion>();
    this.grupo = new Respuesta<GrupoProyeccion>();
    this.programas = new Respuesta<Paginacion<ListarProgramas>>();
    this.lineas = new Respuesta<LineaInvestigacion[]>;
    this.disciplinas = new Respuesta<ListarDisciplinaxGrupoIdProyeccion[]>
    this.formulario = this.formBuilder.group({
      semilleroId: [''],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      estadoSemillero: [''],
      correo: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      fechaCreacion: [''],
      sede: [''],
      programa: [''],
      linea: [''],
      disciplina: [''],
      nombreGrupo: [''],
      nombreFacultad: [''],
      objetivo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1325)]],
      mision: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1325)]],
      vision: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1325)]],
    })
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.id = params['id'];
      this.semilleroObtenerService.obtenerSemilleroInformacionDetallada(this.id).subscribe({
        //manejar respuesta exitosa
        next: (respuesta) => {
          this.semillero = respuesta;
          this.idgrupo = this.semillero.data.grupoId;
          this.formulario.get('nombre')?.setValue(this.semillero.data.nombre);
          this.formulario.get('correo')?.setValue(this.semillero.data.correo);
          this.formulario.get('fechaCreacion')?.setValue(this.semillero.data.fechaCreacion);
          this.formulario.get('fechaCreacion')?.disable();
          this.formulario.get('estadoSemillero')?.setValue(this.semillero.data.estado);
          this.formulario.get('estadoSemillero')?.disable();
          this.formulario.get('sede')?.setValue(this.semillero.data.sede);
          this.formulario.get('objetivo')?.setValue(this.semillero.data.objetivo);
          this.formulario.get('mision')?.setValue(this.semillero.data.mision);
          this.formulario.get('vision')?.setValue(this.semillero.data.vision);
          this.formulario.get('programa')?.disable();
          this.formulario.get('linea')?.disable();
          this.formulario.get('disciplina')?.disable();
          //obtengo la informacion del grupo y la facultad
          this.grupoObtenerService.obtenerGrupoInformacionDetallada(this.idgrupo).subscribe({
            //manejar respuesta exitosa
            next: (respuesta) => {
              this.grupo = respuesta;

              this.formulario.get('nombreGrupo')?.setValue(this.grupo.data.nombre);
              this.formulario.get('nombreGrupo')?.disable();
              this.formulario.get('nombreFacultad')?.setValue(this.grupo.data.departamento.facultad.nombre);
              this.formulario.get('nombreFacultad')?.disable();

            },
            error: (errorData) => {
              console.log(errorData);
            }
          });
          this.formulario.markAllAsTouched();
          //TODO obtengo los programas del semillero
          this.semilleroProgramaObtenerService.obtenerProgramasxSemilleroId(this.id).subscribe({

            //manejar respuesta exitosa
            next: (respuesta) => {

              this.programas = respuesta;
              this.nombreProgramas = this.programas.data.content.map(programa => programa.nombre).join(',');
              this.formulario.get('programa')?.setValue(this.nombreProgramas)
            },
            error: (errorData) => {
            //  console.log(errorData);
              const status=errorData.status;
              if(status==400){
                const data=errorData.error.data.error;
                this.formulario.get('programa')?.setValue(data)
              }
            }
          });
          //TODO obtengo las lineas
          this.lineasInvestigacionObtenerService.obtenerLineasxSemilleroId(this.id).subscribe({
            //manejar respuesta exitosa
            next: (respuesta) => {
              this.lineas= respuesta;
              this.nombreLineas= this.lineas.data.map(linea => linea.linea).join(',');
              this.formulario.get('linea')?.setValue(this.nombreLineas);
            }, error: (errorData) => {
            //  console.log(errorData);
              const status=errorData.status;
              if(status==400){
                const data=errorData.error.data.error;
                this.formulario.get('linea')?.setValue(data)
              }
            }
          });
          //TODO obtengo las disciplinas
          this.grupoDisciplinaObtenerService.obtenerDisciplinasxGrupoId(this.idgrupo).subscribe({
            //manejar respuesta exitosa
            next:(respuesta) =>{
              this.disciplinas=respuesta;
              this.nombreDisciplinas=this.disciplinas.data.map(disciplina => disciplina.disciplina).join(',');
              this.formulario.get('disciplina')?.setValue(this.nombreDisciplinas);

            }, error: (errorData) => {
            //  console.log(errorData);
              const status=errorData.status;
              if(status==400){
                const data=errorData.error.data.error;
                this.formulario.get('disciplina')?.setValue(data)
              }
            }
          })
        },
        error: (errorData) => {
          console.error(errorData);
        }
      });

    });

  }

  onSubmit():void{

    // Verificar si el formulario es válido
    if(this.formulario.valid){

      //realiza la solicitud para actualizar los datos
      this.semilleroActualizarService.actualizarSemilleroxMentor({
        semilleroId:this.id,
        nombre:this.formulario.value.nombre,
        correo:this.formulario.value.correo,
        objetivo:this.formulario.value.objetivo,
        mision:this.formulario.value.mision,
        vision:this.formulario.value.vision,
        sede:this.formulario.value.sede,
        grupoId:this.idgrupo
      }).subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          const nuevoNombre= this.formulario.value.nombre;
          console.log('nuevo nombre: '+nuevoNombre);

          // Captura la respuesta
          this.respuesta = respuesta;
          // Actualiza el nombre del semillero en el servicio
          this.communicationComponentService.actualizarNombreSemillero(nuevoNombre);
          this.openModalOk(this.respuesta.userMessage)

        },
        // Manejar errores
        error: (errorData) => {
          // Verificar si el error es del tipo esperado
          this.handlerError(errorData);
         /* if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
            // Manejar errores inesperados
            this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
          }*/
        }
      });
    }else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
    }

  }
  handlerError(ErrorData:any){
    const status= ErrorData.status;
    if(ErrorData.error && ErrorData.error.data){
      let respuesta: Respuesta<ErrorData> = ErrorData.error;
      this.openModalBad(respuesta.data);
    }else {
      // Manejar errores inesperados
      this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
    }
  }
  cancelar(){
    // Lógica para cancelar la acción
    this.formulario.get('nombre')?.setValue(this.semillero.data.nombre);
    this.formulario.get('correo')?.setValue(this.semillero.data.correo);
    this.formulario.get('sede')?.setValue(this.semillero.data.sede);
    this.formulario.get('objetivo')?.setValue(this.semillero.data.objetivo);
    this.formulario.get('mision')?.setValue(this.semillero.data.mision);
    this.formulario.get('vision')?.setValue(this.semillero.data.vision);
    this.notificationAlertService.showAlert('titulo','Accion Cancelada',3000);


  }

  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;
	}
  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}

}
