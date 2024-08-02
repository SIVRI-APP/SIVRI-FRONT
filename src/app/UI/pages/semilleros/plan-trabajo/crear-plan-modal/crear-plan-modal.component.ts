import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { CommonModule } from '@angular/common';
import { PlanTrabajoCrearService } from '../../../../../service/planTrabajo/domain/service/plan-trabajo-crear.service';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';

@Component({
  selector: 'app-crear-plan-modal',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './crear-plan-modal.component.html',
  styleUrl: './crear-plan-modal.component.css'
})
export class CrearPlanModalComponent {

  @Input() idSemillero!: string;
  activeModal = inject(NgbActiveModal);
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
    protected enumTranslationService: EnumTranslationService,
    private planTrabajoCrearService: PlanTrabajoCrearService
  ) {
    this.respuesta = new Respuesta<false>();
    this.formulario = this.formBuilder.group({
      idSemillero: [''],
      nombrePlan: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      estado: ['FORMULADO'],
      anio: [undefined, Validators.required]
    });
    this.formulario.get('estado')?.disable();
  }

  onsubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      const estado = 'FORMULADO';
      this.planTrabajoCrearService.crearPlanTrabajo({
        idSemillero: this.idSemillero,
        nombrePlan: this.formulario.value.nombrePlan,
        anio: this.formulario.value.anio,
        estado: estado
      }).subscribe({
        //manejar respuesta exitosa
        next: (respuesta) => {
          //TODO no me captura el estado
         this.respuesta= respuesta;
          this.openModalOk(respuesta.userMessage);
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
  limpiarCampos() {
    this.formulario = this.formBuilder.group({
      idSemillero: [''],
      nombrePlan: ['', Validators.required],
      estado: ['FORMULADO'],
      anio: [undefined, Validators.required]
    });
    this.formulario.get('estado')?.disable();
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
