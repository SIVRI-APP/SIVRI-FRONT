import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConvocatoriaEstado } from '../../../../../service/convocatoria/domain/model/enum/convocatoriaEstado';
import { EtapaDocumento } from '../../../../../service/convocatoria/domain/model/enum/etapaDocumento';
import { ResponsableDocumento } from '../../../../../service/convocatoria/domain/model/enum/responsableDocumento';
import { TipoFinanciacion } from '../../../../../service/convocatoria/domain/model/enum/tipoFinanciacion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConvocatoriaObtenerService } from '../../../../../service/convocatoria/domain/service/convocatoriaObtener.service';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { DatatableCustomComponent } from '../../../../shared/datatableCustomizable/datatable-custom.component';
import { ConvocatoriaInformaciónDetalladaProyección } from '../../../../../service/convocatoria/domain/model/proyecciones/convocatoriaInformaciónDetalladaProyección';
import { CrearChecklistDTO } from '../../../../../service/convocatoria/domain/model/DTO/crearConvocatoriaDTO';
import { DatatableInput } from '../../../../../service/common/model/datatableInput';
import { Paginacion } from '../../../../../service/common/model/paginacion';
import { SiNo } from '../../../../../service/common/model/enum/siNO';

@Component({
  selector: 'app-convocatoria-informacion-general',
  standalone: true,
  imports: [ReactiveFormsModule, DatatableCustomComponent],
  templateUrl: './convocatoria-informacion-general.component.html',
  styleUrl: './convocatoria-informacion-general.component.css'
})
export class ConvocatoriaInformacionGeneralComponent implements OnInit{
  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Enumeraciones que llenan los select
  protected convocatoriaEstadoEnum = ConvocatoriaEstado;
  protected etapaDocumentoEnum = EtapaDocumento;
  protected responsableDocumentoEnum = ResponsableDocumento;
  protected tipoFinanciacionEnum = TipoFinanciacion;

  // Formulario reactivo
  protected formulario: FormGroup;

  // Cuerpo para enviar en la solicitud de Creación
  protected crearChecklistDTODocEjecucion: CrearChecklistDTO[];
  protected crearChecklistDTODocPreEjecucion: CrearChecklistDTO[];
  protected crearChecklistDTODocPostEjecucion: CrearChecklistDTO[];

  // Datatable para los documentos
  protected datatableInputsDocEjecucion: DatatableInput;
  protected datatableInputsDocPreEjecucion: DatatableInput;
  protected datatableInputsDocPostEjecucion: DatatableInput;

  constructor(
    private formBuilder: FormBuilder,
    private obtenerService: ConvocatoriaObtenerService,
    protected enumTranslationService:EnumTranslationService
  ){

    this.crearChecklistDTODocEjecucion = [];
    this.crearChecklistDTODocPreEjecucion = [];
    this.crearChecklistDTODocPostEjecucion = [];

    this.formulario = this.formBuilder.group({
      id: ['', Validators.required],
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
      {name:'obligatorio', type:SiNo}, 
    ]  
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
      {name:'obligatorio', type:SiNo}, 
    ] 
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
      {name:'obligatorio', type:SiNo}, 
    ] 
    this.datatableInputsDocPostEjecucion.mensajeNoHayElementos = 'No hay Docuementos asociados para esta Etapa'
    this.datatableInputsDocPostEjecucion.quieresPaginar = false;
  }


  ngOnInit(): void {
    this.obtenerService.getRegistroInformacionDetallada()
      .subscribe({
        next: (respuesta: { data: ConvocatoriaInformaciónDetalladaProyección }) => {

          if (respuesta && respuesta.data) {

            // Itera sobre las claves de respuesta.data y actualiza el formulario
            Object.keys(respuesta.data).forEach(key => {
              if (key != "checklist") {
                const control = this.formulario?.get(key as keyof ConvocatoriaInformaciónDetalladaProyección);
                if (control) {
                  control.setValue((respuesta.data as any)[key]);
                  control.disable();
                }
              }              
            });

            // Agregar Doc Checklist
            respuesta.data.checklist.forEach(doc => {
              this.setDocumento(doc);
            });

            let paginacionPre = new Paginacion();
            paginacionPre.content = this.crearChecklistDTODocPreEjecucion;
            this.datatableInputsDocPreEjecucion.paginacion = paginacionPre;

            let paginacionEjecucion = new Paginacion();
            paginacionEjecucion.content = this.crearChecklistDTODocEjecucion;
            this.datatableInputsDocEjecucion.paginacion = paginacionEjecucion;

            let paginacionPost= new Paginacion();
            paginacionPost.content = this.crearChecklistDTODocPostEjecucion;
            this.datatableInputsDocPostEjecucion.paginacion = paginacionPost;

          }
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
      })
  }

  setDocumento(doc: any){

    let saveDoc = new CrearChecklistDTO();
    saveDoc.nombre = doc.documentoConvocatoria.nombre;
    saveDoc.documentoId = doc.documentoConvocatoria.id;
    saveDoc.etapaDocumento = doc.etapaDocumento;
    saveDoc.responsableDocumento = doc.responsableDocumento;
    saveDoc.cantidad = doc.cantidad;
    saveDoc.obligatorio = doc.obligatorio;
    
    if (saveDoc.etapaDocumento == "PRE_EJECUCION") {
      this.crearChecklistDTODocPreEjecucion.push(saveDoc);
    }

    if (saveDoc.etapaDocumento == "EJECUCION") {
      this.crearChecklistDTODocEjecucion.push(saveDoc);  
    }

    if (saveDoc.etapaDocumento == "POST_EJECUCION") {
      this.crearChecklistDTODocPostEjecucion.push(saveDoc);
    }
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
  }
}
