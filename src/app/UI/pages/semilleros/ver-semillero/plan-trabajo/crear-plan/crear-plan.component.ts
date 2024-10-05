import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { PlanTrabajoCrearService } from '../../../../../../service/planTrabajo/domain/service/plan-trabajo-crear.service';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { CrearActividadComponent } from '../actividad-plan-trabajo/crear-actividad/crear-actividad.component';
import { Subscription } from 'rxjs';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';
import { NotificationAlertService } from '../../../../../../service/common/notification-alert.service';

@Component({
  selector: 'app-crear-plan',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    CrearActividadComponent
  ],
  templateUrl: './crear-plan.component.html',
  styleUrl: './crear-plan.component.css'
})
export class CrearPlanComponent implements OnInit {
  @Input() idSemillero!: string;
  @Output() mostrarFormularioCrear:boolean;
  //activeModal = inject(NgbActiveModal);
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  //formulario reactivo
  protected formulario: FormGroup;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected EnumTranslationService: EnumTranslationService,
    private planTrabajoCrearService: PlanTrabajoCrearService,
    private actualizarListarService: CommunicationComponentsService,
    private notificationAlertService: NotificationAlertService,
  ) {
    this.mostrarFormularioCrear=true;
    this.respuesta = new Respuesta<false>();
    this.formulario = this.formBuilder.group({
      idSemillero: [''],
      nombrePlan: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      estado: ['FORMULADO'],
      anio: [undefined, Validators.required]
    });
    this.formulario.get('estado')?.disable();
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];

    });
 }

  onsubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      const estado = 'FORMULADO';
      this.planTrabajoCrearService.crearPlanTrabajo({
        id_Semillero:this.idSemillero,
        nombre_Plan:this.formulario.value.nombrePlan,
        anio:this.formulario.value.anio,
        estado:estado
      }).subscribe({
        //manejar respuesta exitosa
        next: (respuesta) => {
          //TODO no me captura el estado
          this.respuesta = respuesta;
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
    } else {
      this.formulario.markAllAsTouched();
    }
  }
  cancelar() {
    this.notificationAlertService.showAlert('','Plan no Creado',3000);
    this.mostrarFormularioCrear=false;
    this.actualizarListarService.notificarActualizarListar('agregar');

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

}
