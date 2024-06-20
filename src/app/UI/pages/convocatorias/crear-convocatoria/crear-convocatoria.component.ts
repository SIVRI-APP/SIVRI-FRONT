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
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { DatatableCustomComponent } from '../../../shared/datatableCustomizable/datatable-custom.component';
import { DatatableInputAction } from '../../../../service/common/model/datatableAction';

@Component({
  selector: 'app-crear-convocatoria',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatatableCustomComponent],
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

  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;

  // Cuerpo para enviar en la solicitud de Creación
  private crearConvocatoriaDTO: CrearConvocatoriaDTO;

  protected crearChecklistDTODocEjecucion: CrearChecklistDTO[];
  protected crearChecklistDTODocPreEjecucion: CrearChecklistDTO[];
  protected crearChecklistDTODocPostEjecucion: CrearChecklistDTO[];

  // Datatable para los documentos
  protected datatableInputsDocEjecucion: DatatableInput;
  protected datatableInputsDocPreEjecucion: DatatableInput;
  protected datatableInputsDocPostEjecucion: DatatableInput;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private convocatoriaCrearService: ConvocatoriaCrearService,
    protected enumTranslationService: EnumTranslationService
  ) {

    this.respuesta = new Respuesta<false>();

    this.crearConvocatoriaDTO = new CrearConvocatoriaDTO();
    this.crearChecklistDTODocEjecucion = [];
    this.crearChecklistDTODocPreEjecucion = [];
    this.crearChecklistDTODocPostEjecucion = [];

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

    // Inicialización de los datos que construyen el datatable EJECUCION
    this.datatableInputsDocEjecucion = new DatatableInput(
      'Documentos',
      new Paginacion<CrearChecklistDTO>()
    );
    this.datatableInputsDocEjecucion.searchPerformed = true;
    this.datatableInputsDocEjecucion.tableHeaders = ['ID Doc', 'Nombre', 'Responsable Documento', 'Cantidad', '¿Obligatorio?'];
    this.datatableInputsDocEjecucion.dataAttributes = [
      {name:'documentoId', type:String}, 
      {name:'nombre', type:String}, 
      {name:'responsableDocumento', type:ResponsableDocumento}, 
      {name:'cantidad', type:String}, 
      {name:'obligatorio', type:String}, 
    ]
    this.datatableInputsDocEjecucion.acciones = [new DatatableInputAction('delete', 'eliminar')]  
    this.datatableInputsDocEjecucion.mensajeNoHayElementos = 'No hay Docuementos asociados para esta Etapa'
    this.datatableInputsDocEjecucion.quieresPaginar = false;

    // Inicialización de los datos que construyen el datatable PRE EJECUCION
    this.datatableInputsDocPreEjecucion = new DatatableInput(
      'Documentos',
      new Paginacion<CrearChecklistDTO>()
    );
    this.datatableInputsDocPreEjecucion.searchPerformed = true;
    this.datatableInputsDocPreEjecucion.tableHeaders = ['ID Doc', 'Nombre', 'Responsable Documento', 'Cantidad', '¿Obligatorio?'];
    this.datatableInputsDocPreEjecucion.dataAttributes = [
      {name:'documentoId', type:String}, 
      {name:'nombre', type:String}, 
      {name:'responsableDocumento', type:ResponsableDocumento}, 
      {name:'cantidad', type:String}, 
      {name:'obligatorio', type:String}, 
    ]
    this.datatableInputsDocPreEjecucion.acciones = [new DatatableInputAction('delete', 'eliminar')]  
    this.datatableInputsDocPreEjecucion.mensajeNoHayElementos = 'No hay Docuementos asociados para esta Etapa'
    this.datatableInputsDocPreEjecucion.quieresPaginar = false;

    // Inicialización de los datos que construyen el datatable POST EJECUCION
    this.datatableInputsDocPostEjecucion = new DatatableInput(
      'Documentos',
      new Paginacion<CrearChecklistDTO>()
    );
    this.datatableInputsDocPostEjecucion.searchPerformed = true;
    this.datatableInputsDocPostEjecucion.tableHeaders = ['ID Doc', 'Nombre', 'Responsable Documento', 'Cantidad', '¿Obligatorio?'];
    this.datatableInputsDocPostEjecucion.dataAttributes = [
      {name:'documentoId', type:String}, 
      {name:'nombre', type:String}, 
      {name:'responsableDocumento', type:ResponsableDocumento}, 
      {name:'cantidad', type:String}, 
      {name:'obligatorio', type:String}, 
    ]
    this.datatableInputsDocPostEjecucion.acciones = [new DatatableInputAction('delete', 'eliminar')]  
    this.datatableInputsDocPostEjecucion.mensajeNoHayElementos = 'No hay Docuementos asociados para esta Etapa'
    this.datatableInputsDocPostEjecucion.quieresPaginar = false;
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      // Agregar los Docs al checklist
      this.crearChecklistDTODocEjecucion.forEach((doc) => {
        this.crearConvocatoriaDTO.checklist.push(doc);
      });
      this.crearChecklistDTODocPreEjecucion.forEach((doc) => {
        this.crearConvocatoriaDTO.checklist.push(doc);
      });
      this.crearChecklistDTODocPostEjecucion.forEach((doc) => {
        this.crearConvocatoriaDTO.checklist.push(doc);
      });
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

      let paginacion = new Paginacion();
      paginacion.content = this.crearChecklistDTODocPreEjecucion;

      // Actualiar el Input del datatable
      this.datatableInputsDocPreEjecucion.paginacion = paginacion;
  }

  agregarDocEjecucion(){   
    this.openModalModalCrearChecklistComponent(EtapaDocumento.EJECUCION);

      let paginacion = new Paginacion();
      paginacion.content = this.crearChecklistDTODocEjecucion;

      // Actualiar el Input del datatable
      this.datatableInputsDocEjecucion.paginacion = paginacion;
      
  }

  agregarDocPostEjecucion(){   
    this.openModalModalCrearChecklistComponent(EtapaDocumento.POST_EJECUCION);

      let paginacion = new Paginacion();
      paginacion.content = this.crearChecklistDTODocPostEjecucion;

      // Actualiar el Input del datatable
      this.datatableInputsDocPostEjecucion.paginacion = paginacion;
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

    this.crearChecklistDTODocPreEjecucion.length = 0;
    this.crearChecklistDTODocEjecucion.length = 0;
    this.crearChecklistDTODocPostEjecucion.length = 0;
  }

  openModalModalCrearChecklistComponent(etapaDocumento:EtapaDocumento){
    const modalRef = this.modalService.open(ModalCrearChecklistComponent);

    modalRef.componentInstance.enviarInformacion.subscribe((result: CrearChecklistDTO) => {
      
      const clave = this.enumTranslationService.getKeyByValue(EtapaDocumento, etapaDocumento);
      if (clave !== undefined) {
        result.etapaDocumento = clave;
      }   
      
      if (result.etapaDocumento == "PRE_EJECUCION") {
        this.crearChecklistDTODocPreEjecucion.push(result);
      }

      if (result.etapaDocumento == "EJECUCION") {
        this.crearChecklistDTODocEjecucion.push(result);
      }

      if (result.etapaDocumento == "POST_EJECUCION") {
        this.crearChecklistDTODocPostEjecucion.push(result);
      }
      
    }); 
  }

  accion(accion: any): void {
    let index;
    // Si la accion es eliminar
    if (accion.accion.accion == "eliminar") {
      switch (accion.data.etapaDocumento) {
        case "PRE_EJECUCION":
          // Encuentra el índice del elemento con el documentoId específico
          index = this.crearChecklistDTODocPreEjecucion.findIndex(item => item.documentoId === accion.data.documentoId);
          if (index !== -1) {
            this.crearChecklistDTODocPreEjecucion.splice(index, 1);
          }
          break;
        case "EJECUCION":
          // Encuentra el índice del elemento con el documentoId específico
          index = this.crearChecklistDTODocEjecucion.findIndex(item => item.documentoId === accion.data.documentoId);
          if (index !== -1) {
            this.crearChecklistDTODocEjecucion.splice(index, 1);
          }
          break;
        case "POST_EJECUCION":
          // Encuentra el índice del elemento con el documentoId específico
          index = this.crearChecklistDTODocPostEjecucion.findIndex(item => item.documentoId === accion.data.documentoId);
          if (index !== -1) {
            this.crearChecklistDTODocPostEjecucion.splice(index, 1);
          }
          break;      
        default:
          break;
      }
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
