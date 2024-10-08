import { Component, OnInit, Output, inject } from '@angular/core';
import { RolIntegranteSemillero } from '../../../../../../service/semilleros/domain/model/proyecciones/rolIntegranteSemillero';
import { IntegranteSemilleroObtenerService } from '../../../../../../service/semilleros/domain/service/integrante-semillero-obtener.service';
import { IntegranteSemilleroEstado } from '../../../../../../service/semilleros/domain/model/enum/integranteSemilleroEstado';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { TipoDocumento } from '../../../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { IntegranteSemilleroCrearService } from '../../../../../../service/semilleros/domain/service/integrante-semillero-crear.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';
import { RolSemilleroObtenerService } from '../../../../../../service/semilleros/domain/service/rol-semillero-obtener.service';
import { UsuarioObtenerPorDocService } from '../../../../../../service/solicitudUsuarios/domain/service/usuarioObtenerPorDoc.service';
import { UsuarioInformaciónDetalladaProyección } from '../../../../../../service/solicitudUsuarios/domain/model/proyecciones/usuarioInformaciónDetalladaProyección';
import { NotificationAlertService } from '../../../../../../service/common/notification-alert.service';

@Component({
  selector: 'app-crear-integrante',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './crear-integrante.component.html',
  styleUrl: './crear-integrante.component.css'
})
export class CrearIntegranteComponent implements OnInit {
  private idSemillero!: string;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  @Output() mostrarFormularioCrear:boolean;
  protected rolIntegranteSemillero: RolIntegranteSemillero[] = [];
  protected estadoIntegranteEnum = IntegranteSemilleroEstado;
  protected tipoDocumentoEnum = TipoDocumento;
  //formulario reactivo
  protected formularioCrear: FormGroup;
  protected formularioConsultar: FormGroup;
  protected respuestaCrear: Respuesta<boolean>;
  protected integranteConsultado:Respuesta<UsuarioInformaciónDetalladaProyección>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private actualizarListarService: CommunicationComponentsService,
    private integranteSemilleroObtenerService: IntegranteSemilleroObtenerService,
    private integranteSemilleroCrearService: IntegranteSemilleroCrearService,
    private rolSemilleroObtenerService: RolSemilleroObtenerService,
    private usuarioObtenerPorDocService: UsuarioObtenerPorDocService,
    protected enumTranslationService: EnumTranslationService,
    private notificationAlertService: NotificationAlertService,
  ) {
    this.integranteConsultado= new Respuesta<UsuarioInformaciónDetalladaProyección>();
    this.mostrarFormularioCrear=true;
    this.respuestaCrear = new Respuesta<false>();
    this.formularioCrear = this.formBuilder.group({
      idSemillero: [''],
      estadoIntegrante: ['ACTIVO'],
      usuarioId: [null],
      rolSemillero: [null, Validators.required],
    });

    this.formularioCrear.get('estadoIntegrante')?.disable();
    this.formularioConsultar = this.formBuilder.group({
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: [null, [Validators.required]],
      nombre: [''],
      programa: [''],
      usuarioId:[null]
    });
    this.formularioConsultar.get('nombre')?.disable();
    this.formularioConsultar.get('programa')?.disable();
  }
  ngOnInit(): void {
   // this.rolIntegranteSemillero = this.integranteSemilleroObtenerService.getRolIntegranteSemillero();
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
    });
    this.obtenerRolesSemillero();
  }
  obtenerRolesSemillero(){
    this.rolSemilleroObtenerService.obtenerRolesSemillero().subscribe({
      // Manejar respuesta exitosa
      next: (respueta) => {

        this.rolIntegranteSemillero = respueta.data;
        this.integranteSemilleroObtenerService.setRolIntegranteSemillero(this.rolIntegranteSemillero);
       },// Manejar errores
      error: (errorData) => {
        console.error(errorData);
      },
    });
  }
  onsubmitConsultar() {

    this.usuarioObtenerPorDocService.obtenerUsuarioInformaciónDetallada(this.formularioConsultar.value.numeroDocumento,
      this.formularioConsultar.value.tipoDocumento
    ).subscribe({
      next:(respuestaConsultar)=>{
        this.integranteConsultado= respuestaConsultar;
        this.formularioConsultar.get('nombre')?.setValue(this.integranteConsultado.data.nombre+' '+this.integranteConsultado.data.apellido);
        this.formularioConsultar.get('usuarioId')?.setValue(this.integranteConsultado.data.id);
        this.formularioConsultar.get('programa')?.setValue(this.integranteConsultado.data.programaNombre);
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
  }
  crearUsuario(){
    this.router.navigate(['/usuarios/crear-usuario']); // Redirigir a la ruta deseada
  }
  onsubmitCrear() {

    // Verificar si el formulario es válido
    if (this.formularioCrear.valid) {
      //this.formularioCrear.get('usuarioId')?.setValue(usuarioId);
      //this.formularioCrear.get('idSemillero')?.setValue(this.idSemillero);
      this.integranteSemilleroCrearService.crearIntegranteSemillero({
        semilleroId: this.idSemillero,
        usuarioId:this.formularioConsultar.value.usuarioId,
        rolSemilleroId:this.formularioCrear.value.rolSemillero
      }).subscribe({
        //manejar respuesta exitosa
        next: (respuesta) => {
          this.respuestaCrear=respuesta;
          this.openModalOk(respuesta.userMessage);
          this.actualizarListarService.notificarActualizarListar('agregar');
          this.mostrarFormularioCrear=false;
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
      })


    }
  }
  openModalOk(message: string) {
    const modalRef = this.modalService.open(ModalOkComponent);
    modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        //cierra todas las modales
        this.modalService.dismissAll();
      }

    });
  }
  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }

  cancelar() {
    this.notificationAlertService.showAlert('','Accion Cancelada',3000);
    this.actualizarListarService.notificarActualizarListar('cancelar');
    this.mostrarFormularioCrear=false;
    }

    /*this.formularioCrear = this.formBuilder.group({
      idSemillero: [''],
      nombre: [''],
      usuarioId: [null, Validators.required],
      rolSemillero: [null, Validators.required]

    });
    this.formularioCrear.get('nombre')?.disable();
    this.formularioCrear.get('estadoIntegrante')?.disable();
    this.formularioConsultar = this.formBuilder.group({
      tipoDocumento: [''],
      numeroDocumento: [null],
      nombre: [''],
      programa: ['']
    });
    this.formularioConsultar.get('nombre')?.disable();
    this.formularioConsultar.get('programa')?.disable();
  }*/
}
