import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConvocatoriaEstado } from '../../../../service/convocatoria/domain/model/enum/convocatoriaEstado';
import { EtapaDocumento } from '../../../../service/convocatoria/domain/model/enum/etapaDocumento';
import { ResponsableDocumento } from '../../../../service/convocatoria/domain/model/enum/responsableDocumento';
import { TipoFinanciacion } from '../../../../service/convocatoria/domain/model/enum/tipoFinanciacion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Respuesta } from '../../../../service/common/model/respuesta';
import {
  CrearChecklistDTO,
  CrearConvocatoriaDTO,
} from '../../../../service/convocatoria/domain/model/DTO/crearConvocatoriaDTO';
import { Router } from '@angular/router';
import { ConvocatoriaCrearService } from '../../../../service/convocatoria/domain/service/convocatoriaCrear.service';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { ErrorData } from '../../../../service/common/model/errorData';
import { ModalOkComponent } from '../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../shared/modal-bad/modal-bad.component';
import { CommonModule } from '@angular/common';
import { ModalCrearChecklistComponent } from './crearCheckList/modal-crear-checklist.component';

@Component({
  selector: 'app-crear-convocatoria',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-convocatoria.component.html',
  styleUrl: './crear-convocatoria.component.css',
})
export class CrearConvocatoriaComponent {
  
  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Enumeraciones que llenan los select
  protected convocatoriaEstadoEnum = ConvocatoriaEstado;
  protected etapaDocumentoEnum = EtapaDocumento;
  protected responsableDocumentoEnum = ResponsableDocumento;
  protected tipoFinanciacionEnum = TipoFinanciacion;

  // Formulario reactivo
  protected formulario: FormGroup;
  protected formularioSecundario: FormGroup;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;

  // Cuerpo para enviar en la solicitud de Creación
  private crearConvocatoriaDTO: CrearConvocatoriaDTO;
  protected crearChecklistDTO: CrearChecklistDTO[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private convocatoriaCrearService: ConvocatoriaCrearService,
    protected enumTranslationService: EnumTranslationService
  ) {

    this.respuesta = new Respuesta<false>();

    this.crearConvocatoriaDTO = new CrearConvocatoriaDTO();
    this.crearChecklistDTO = [];

    this.formulario = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000),
        ],
      ],
      objetivos: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000),
        ],
      ],
      oferente: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(245),
        ],
      ],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      tipoFinanciacion: ['', Validators.required],
      checklist: this.formBuilder.array([])
    });

    this.formularioSecundario = this.formBuilder.group({
      documentoId: ['', Validators.required],
      etapaDocumento: ['', Validators.required],
      responsableDocumento: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      obligatorio: ['', Validators.required],
    });
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      // Agregar los Docs al checklist
      this.crearConvocatoriaDTO.checklist = this.crearChecklistDTO;
      (this.crearConvocatoriaDTO.nombre = this.formulario.value.nombre),
      (this.crearConvocatoriaDTO.descripcion = this.formulario.value.descripcion),
      (this.crearConvocatoriaDTO.objetivos = this.formulario.value.objetivos),
      (this.crearConvocatoriaDTO.oferente = this.formulario.value.oferente),
      (this.crearConvocatoriaDTO.fechaInicio = this.formulario.value.fechaInicio),
      (this.crearConvocatoriaDTO.fechaFin = this.formulario.value.fechaFin),
      (this.crearConvocatoriaDTO.tipoFinanciacion = this.formulario.value.tipoFinanciacion),
       
      // Realizar solicitud para obtener los datos filtrados
      this.convocatoriaCrearService.crearSolicitudUsuario(this.crearConvocatoriaDTO)
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            // Captura la respuesta
            this.respuesta = respuesta;

            this.openModalOk(this.respuesta.userMessage, "/convocatorias/listar");
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
  
  agregarDocPreEjecucion(){   
    this.openModalModalCrearChecklistComponent(EtapaDocumento.PRE_EJECUCION);
  }

  agregarDocEjecucion(){   
    this.openModalModalCrearChecklistComponent(EtapaDocumento.EJECUCION);
  }

  agregarDocPosEjecucion(){   
    this.openModalModalCrearChecklistComponent(EtapaDocumento.POST_EJECUCION);
  }

  /**
   * Restablece todos los campos del formulario a sus valores iniciales y reinicia la paginación.
   */
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000),
        ],
      ],
      objetivos: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000),
        ],
      ],
      oferente: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(245),
        ],
      ],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      tipoFinanciacion: ['', Validators.required],
      checklist: this.formBuilder.array([])
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

  openModalModalCrearChecklistComponent(etapaDocumento:EtapaDocumento){
    const modalRef = this.modalService.open(ModalCrearChecklistComponent);

    modalRef.componentInstance.enviarInformacion.subscribe((result: CrearChecklistDTO) => {
      
      const clave = this.enumTranslationService.getKeyByValue(EtapaDocumento, etapaDocumento);
      if (clave !== undefined) {
        result.etapaDocumento = clave;
      }   
      
      this.crearChecklistDTO.push(result);
    });
  }
}
