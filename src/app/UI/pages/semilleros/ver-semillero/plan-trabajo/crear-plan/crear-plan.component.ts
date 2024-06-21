import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
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
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];

    })
  }

  onsubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      console.log('id del semillero de crear plan----------------' + this.idSemillero);
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
          console.log(this.formulario);
          console.log('formulario de crear ---------');
          console.log('respuesta de crear plan-----------');
          console.log(respuesta);
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
    }else{
      this.formulario.markAllAsTouched();
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
