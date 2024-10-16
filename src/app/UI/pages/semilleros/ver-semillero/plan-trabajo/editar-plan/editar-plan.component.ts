import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { EstadoPlantrabajo } from '../../../../../../service/planTrabajo/domain/model/enum/EstadoPlanTrabajo';
import { PlanTrabajoObtenerService } from '../../../../../../service/planTrabajo/domain/service/plan-trabajo-obtener.service';
import { ActivatedRoute } from '@angular/router';
import { PlanTrabajoActualizarService } from '../../../../../../service/planTrabajo/domain/service/plan-trabajo-actualizar.service';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-plan',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-plan.component.html',
  styleUrl: './editar-plan.component.css'
})
export class EditarPlanComponent implements OnInit {
  protected formularioConsultar: FormGroup;
  protected formularioEditar: FormGroup;
  protected estadoPlanEnum = EstadoPlantrabajo;
  private idSemillero!: string;
  private modalService = inject(NgbModal);
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService,
    private planTrabajoObtenerService: PlanTrabajoObtenerService,
    private planTrabajoActualizarService: PlanTrabajoActualizarService,
  ){
    this.formularioConsultar = this.formBuilder.group({
      idPlan: [null,Validators.required]
    });
    this.formularioEditar = this.formBuilder.group({
      idPlan:[null],
      idSemillero: [''],
      nombrePlan: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      estado: ['',Validators.required],
      anio: [undefined, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
      this.formularioEditar.get('idSemillero')?.setValue(this.idSemillero);
    });
  }

  onsubmitConsultarPlan(){
    //consulta el plan por id y lo muestra en el formulario
    this.planTrabajoObtenerService.ObtenerPlanTrabajoxId(this.formularioConsultar.value.idPlan).subscribe({
      next:(respuesta)=>{
        console.log(respuesta);

        this.formularioEditar.get('idPlan')?.setValue(respuesta.data.id);
        this.formularioEditar.get('nombrePlan')?.setValue(respuesta.data.nombrePlan);
        this.formularioEditar.get('anio')?.setValue(respuesta.data.anio);
        this.formularioEditar.get('estado')?.setValue(respuesta.data.estado);

      }
    });
  }

  onsubmitEditarPlan(){
    //edita los datos del plan de trabajo
    this.planTrabajoActualizarService.actualizarPlanTrabajo(this.formularioEditar.value.idPlan,{
      nombrePlan:this.formularioEditar.value.nombrePlan,
      anio:this.formularioEditar.value.anio,
      estado:this.formularioEditar.value.estado
    }).subscribe({
      next:(respuesta)=>{

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
    });
  }

  limpiarCampos() {
    this.formularioConsultar = this.formBuilder.group({
      idPlan: [null]
    });
    this.formularioEditar = this.formBuilder.group({
      idPlan:[null],
      idSemillero: [''],
      nombrePlan: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      estado: [''],
      anio: [undefined, Validators.required]
    });
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
