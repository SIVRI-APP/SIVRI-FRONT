import { Component, OnInit, inject } from '@angular/core';
import { RolIntegranteSemillero } from '../../../../../../service/semilleros/domain/model/proyecciones/rolIntegranteSemillero';
import { ActivatedRoute, Router } from '@angular/router';
import { IntegranteSemilleroObtenerService } from '../../../../../../service/semilleros/domain/service/integrante-semillero-obtener.service';
import { RolSemilleroObtenerService } from '../../../../../../service/semilleros/domain/service/rol-semillero-obtener.service';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { IntegranteSemilleroEstado } from '../../../../../../service/semilleros/domain/model/enum/integranteSemilleroEstado';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { IntegranteSemillero } from '../../../../../../service/semilleros/domain/model/proyecciones/integranteSemilleroProyeccion';
import { DatePipe } from '@angular/common';
import { IntegranteSemilleroCrearService } from '../../../../../../service/semilleros/domain/service/integrante-semillero-crear.service';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';
import { NotificationAlertService } from '../../../../../../service/common/notification-alert.service';

@Component({
  selector: 'app-actualizar-integrante',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './actualizar-integrante.component.html',
  styleUrl: './actualizar-integrante.component.css'
})
export class ActualizarIntegranteComponent implements OnInit {
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  private idSemillero!: string;
  private idIntegrante!: string;
  protected rolIntegranteSemillero: RolIntegranteSemillero[] = [];
  protected estadoIntegranteEnum = IntegranteSemilleroEstado;
  //formulario reactivo
  protected formulario: FormGroup;
  protected integranteDatos: Respuesta<IntegranteSemillero>;
  protected respuesta: Respuesta<boolean>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private actualizarListaService:CommunicationComponentsService,
    private rolIntegrante: RolSemilleroObtenerService,
    protected enumTranslationService: EnumTranslationService,
    private integranteSemilleroObtenerService: IntegranteSemilleroObtenerService,
    private integranteSemilleroCrearService: IntegranteSemilleroCrearService,
    private notificationAlertService: NotificationAlertService,
  ) {
    this.respuesta = new Respuesta<false>();
    this.integranteDatos = new Respuesta<IntegranteSemillero>();
    this.formulario = this.formBuilder.group({
      id: [''],
      numeroDocumento: [''],
      nombre: [''],
      rolSemilleroId: [''],
      estadoIntegrante: [''],
      fechaIngreso: [''],
      fechaRetiro: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')]
    });
    this.formulario.get('numeroDocumento')?.disable();
    this.formulario.get('nombre')?.disable();
    this.formulario.get('fechaIngreso')?.disable();
  }
  ngOnInit(): void {

    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id']
    });

    this.route.params.subscribe(params => {
      this.idIntegrante = params['idIntegrante']
    });

    this.integranteSemilleroObtenerService.obtenerIntegrantexId(this.idIntegrante).subscribe({
      next: (respuesta) => {

        this.integranteDatos = respuesta;
        this.integranteDatos.data.usuario.nombre = respuesta.data.usuario.nombre;
        //this.integranteDatos.data.rolSemillero=respuesta.data.rolSemillero;
        this.formulario.get('numeroDocumento')?.setValue(this.integranteDatos.data.usuario.numeroDocumento);
        let nombreCompleto = this.integranteDatos.data.usuario.nombre + ' ' + this.integranteDatos.data.usuario.apellido;
        this.formulario.get('nombre')?.setValue(nombreCompleto);
        this.formulario.get('estadoIntegrante')?.setValue(this.integranteDatos.data.fechaRetiro);
        this.formulario.get('estadoIntegrante')?.valueChanges.subscribe((estad) => {
          if (estad == 'INACTIVO') {
            // Si es "inactivo", actualiza la fecha al valor actual del sistema
            const fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
            this.formulario.get('fechaRetiro')?.setValue(fechaActual);
          } else {
            this.formulario.get('fechaRetiro')?.setValue(null);
          }
        });

        this.formulario.get('rolSemillero')?.setValue(this.integranteDatos.data.rolSemillero.rolSemillero);
        this.formulario.get('fechaIngreso')?.setValue(this.integranteDatos.data.fechaIngreso);
        this.formulario.get('fechaRetiro')?.setValue(this.integranteDatos.data.fechaRetiro);
      }
    });
    this.rolIntegrante.obtenerRolesSemillero().subscribe({
      next: (respuesta) => {
        this.rolIntegranteSemillero = respuesta.data;
      }
    });
  }

  onsubmit(): void {
    if (this.formulario.valid) {
       this.integranteSemilleroCrearService.actualizarIntegranteSemillero({
        id: this.idIntegrante,
        estado: this.formulario.value.estadoIntegrante,
        rolSemilleroId: this.formulario.value.rolSemilleroId,
        fechaRetiro: this.formulario.value.fechaRetiro
      }).subscribe({
        next: (respuesta) => {
           this.respuesta = respuesta;
          this.openModalOk(this.respuesta.userMessage)
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
  }
  cancelar(){
    this.formulario.get('rolSemillero')?.setValue(this.integranteDatos.data.rolSemillero.rolSemillero);
    this.formulario.get('fechaIngreso')?.setValue(this.integranteDatos.data.fechaIngreso);
    this.formulario.get('fechaRetiro')?.setValue(this.integranteDatos.data.fechaRetiro);
    this.notificationAlertService.showAlert('','integrante no actualizado',3000);
    this.router.navigate([`/semilleros/listar-semilleros/${this.idSemillero}/listar-integrantes`]);
  }
  openModalOk(message: string) {
    this.actualizarListaService.notificarActualizarListar('actualizar');

    const modalRef = this.modalService.open(ModalOkComponent);
    modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      if (result === 'navegar') {
        this.router.navigate([`semilleros/listar-semilleros/${this.idSemillero}/listar-integrantes`]);

      }

    });

  }
  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }

}
