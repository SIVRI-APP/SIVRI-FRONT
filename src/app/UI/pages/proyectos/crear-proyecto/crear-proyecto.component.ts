import { Component, inject } from '@angular/core';
import { DatatableCustomComponent } from '../../../shared/datatableCustomizable/datatable-custom.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { CrearProyectoDTO } from '../../../../service/proyecto/domain/model/DTO/crearProyectoDTO';
import { Router } from '@angular/router';
import { ProyectoCrearService } from '../../../../service/proyecto/domain/service/proyectoCrear.service';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { ModalOkComponent } from '../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../shared/modal-bad/modal-bad.component';
import { ErrorData } from '../../../../service/common/model/errorData';

@Component({
  selector: 'app-crear-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, DatatableCustomComponent],
  templateUrl: './crear-proyecto.component.html',
  styleUrl: './crear-proyecto.component.css'
})
export class CrearProyectoComponent {

  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Enumeraciones que llenan los select

  // Formulario reactivo
  protected formulario: FormGroup;

  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;

  // Cuerpo para enviar en la solicitud de Creación
  private crearProyectoDTO: CrearProyectoDTO;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private proyectoCrearService: ProyectoCrearService,
    protected enumTranslationService: EnumTranslationService
  ) {
    this.respuesta = new Respuesta<false>();
    this.crearProyectoDTO = new CrearProyectoDTO();

    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      planteamiento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      objetivoGeneral: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      objetivosEspecificos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      justificacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      enfoqueMetodologico: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      aspectosEticosLegales: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      confidencialidadDeInformacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      efectosAdversos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      impactosResultadosEsperados: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      consideraciones: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
    });
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {

      this.crearProyectoDTO.nombre = this.formulario.value.nombre;
      this.crearProyectoDTO.fechaInicio = this.formulario.value.fechaInicio;
      this.crearProyectoDTO.fechaFin = this.formulario.value.fechaFin;
      this.crearProyectoDTO.planteamiento = this.formulario.value.planteamiento;
      this.crearProyectoDTO.objetivoGeneral = this.formulario.value.objetivoGeneral;
      this.crearProyectoDTO.objetivosEspecificos = this.formulario.value.objetivosEspecificos;
      this.crearProyectoDTO.justificacion = this.formulario.value.justificacion;
      this.crearProyectoDTO.enfoqueMetodologico = this.formulario.value.enfoqueMetodologico;
      this.crearProyectoDTO.aspectosEticosLegales = this.formulario.value.aspectosEticosLegales;
      this.crearProyectoDTO.confidencialidadDeInformacion = this.formulario.value.confidencialidadDeInformacion;
      this.crearProyectoDTO.efectosAdversos = this.formulario.value.efectosAdversos;
      this.crearProyectoDTO.impactosResultadosEsperados = this.formulario.value.impactosResultadosEsperados;
      this.crearProyectoDTO.consideraciones = this.formulario.value.consideraciones;
      this.crearProyectoDTO.eliminadoLogico = this.formulario.value.eliminadoLogico;
       
      // Realizar solicitud para obtener los datos filtrados
      this.proyectoCrearService.crear(this.crearProyectoDTO)
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            // Captura la respuesta
            this.respuesta = respuesta;

            this.openModalOk(this.respuesta.userMessage, "/proyectos/listar");
          },
          // Manejar errores
          error: (errorData) => {
            // Verificar si el error es del tipo esperado
            if (errorData.error && errorData.error.data) {
              let respuesta: Respuesta<ErrorData> = errorData.error;
              this.openModalBad(respuesta.data);
            } else {
              // Manejar errores inesperados
              this.openModalBad(
                new ErrorData({
                  error: 'Error inseperado, contactar a soporte',
                })
              );
            }
          },
        });
    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
    }
  }

  /**
   * Restablece todos los campos del formulario a sus valores iniciales y reinicia la paginación.
   */
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      planteamiento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      objetivoGeneral: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      objetivosEspecificos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      justificacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      enfoqueMetodologico: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      aspectosEticosLegales: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      confidencialidadDeInformacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      efectosAdversos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      impactosResultadosEsperados: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      consideraciones: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
    });
  }


  openModalOk(message: string, nuevaUrl: any) {
    const modalRef = this.modalService.open(ModalOkComponent);
    modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Aquí puedes realizar la navegación a otra ruta
        this.router.navigate([nuevaUrl]);
      }
    });
  }

  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }

}
