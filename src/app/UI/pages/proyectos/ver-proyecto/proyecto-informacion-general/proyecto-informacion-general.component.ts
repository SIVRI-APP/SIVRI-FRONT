import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearProyectoDTO } from '../../../../../service/proyecto/domain/model/DTO/crearProyectoDTO';
import { Router } from '@angular/router';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoInformaciónDetalladaProyección } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';

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

  // Enumeraciones que llenan los select

  // Formulario reactivo
  protected formulario: FormGroup;

  // Cuerpo para enviar en la solicitud de Creación
  private crearProyectoDTO: CrearProyectoDTO;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private proyectoCrearService: ProyectoCrearService,
    private proyectoObtenerService: ProyectoObtenerService,
    protected enumTranslationService: EnumTranslationService
  ) {
    this.crearProyectoDTO = new CrearProyectoDTO();

    this.formulario = this.formBuilder.group({
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
        next: (respuesta: { data: ProyectoInformaciónDetalladaProyección }) => {

          if (respuesta && respuesta.data) {

            // Itera sobre las claves de respuesta.data y actualiza el formulario
            Object.keys(respuesta.data).forEach(key => {
              if (key != "convocatoria") {
                const control = this.formulario?.get(key as keyof ProyectoInformaciónDetalladaProyección);
                if (control) {
                  control.setValue((respuesta.data as any)[key]);
                  control.disable();
                }
              }              
            });

            // Todo agregar visualizacion de convocatoria
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
  }

}
