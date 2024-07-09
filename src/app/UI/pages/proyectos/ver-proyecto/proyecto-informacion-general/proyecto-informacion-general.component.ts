import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoInformaciónDetalladaProyección } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';
import { FormalizarProyectoDTO } from '../../../../../service/proyecto/domain/model/DTO/formalizarProyectoDTO';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';

@Component({
  selector: 'app-proyecto-informacion-general',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proyecto-informacion-general.component.html',
  styleUrl: './proyecto-informacion-general.component.css'
})
export class ProyectoInformacionGeneralComponent implements OnInit{
  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;

  // Formulario reactivo
  protected formulario: FormGroup;

  // Cuerpo para enviar en la solicitud de Creación
  private formalizarProyectoDTO: FormalizarProyectoDTO;

  private informacionDetallada: Respuesta<ProyectoInformaciónDetalladaProyección>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private proyectoCrearService: ProyectoCrearService,
    private proyectoObtenerService: ProyectoObtenerService,
    protected enumTranslationService: EnumTranslationService
  ) {
    this.respuesta = new Respuesta<false>();
    this.formalizarProyectoDTO = new FormalizarProyectoDTO();
    this.informacionDetallada = new Respuesta();

    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      estado: ['', [Validators.required]],
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

  ngOnInit(): void {
    this.proyectoObtenerService.getRegistroInformacionDetallada()
      .subscribe({
        next: (respuesta) => {
          this.informacionDetallada = respuesta;

          if (this.informacionDetallada && this.informacionDetallada.data) {

            // Itera sobre las claves de respuesta.data y actualiza el formulario
            Object.keys(this.informacionDetallada.data).forEach(key => {
              if (key != "convocatoria") {
                const control = this.formulario?.get(key as keyof ProyectoInformaciónDetalladaProyección);
                if (control) {
                  control.setValue((this.informacionDetallada.data as any)[key]);                  
                  if (this.informacionDetallada.developerMessage == "lectura") {
                    control.disable();
                  }
                }
              }              
            });

            this.formulario.get('id')!.disable();
            this.formulario.get('estado')!.disable();
          }
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
      })
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {

      this.formalizarProyectoDTO.id = this.informacionDetallada.data.id;
      this.formalizarProyectoDTO.nombre = this.formulario.value.nombre;
      this.formalizarProyectoDTO.fechaInicio = this.formulario.value.fechaInicio;
      this.formalizarProyectoDTO.fechaFin = this.formulario.value.fechaFin;
      this.formalizarProyectoDTO.planteamiento = this.formulario.value.planteamiento;
      this.formalizarProyectoDTO.objetivoGeneral = this.formulario.value.objetivoGeneral;
      this.formalizarProyectoDTO.objetivosEspecificos = this.formulario.value.objetivosEspecificos;
      this.formalizarProyectoDTO.justificacion = this.formulario.value.justificacion;
      this.formalizarProyectoDTO.enfoqueMetodologico = this.formulario.value.enfoqueMetodologico;
      this.formalizarProyectoDTO.aspectosEticosLegales = this.formulario.value.aspectosEticosLegales;
      this.formalizarProyectoDTO.confidencialidadDeInformacion = this.formulario.value.confidencialidadDeInformacion;
      this.formalizarProyectoDTO.efectosAdversos = this.formulario.value.efectosAdversos;
      this.formalizarProyectoDTO.impactosResultadosEsperados = this.formulario.value.impactosResultadosEsperados;
      this.formalizarProyectoDTO.consideraciones = this.formulario.value.consideraciones;
       
      // Realizar solicitud para obtener los datos filtrados
      this.proyectoCrearService.formalizar(this.formalizarProyectoDTO)
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
