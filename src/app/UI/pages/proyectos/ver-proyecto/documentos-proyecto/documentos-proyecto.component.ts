import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoInformacionConvocatoria } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';
import { ListarConvocatoriasComponent } from '../../../convocatorias/listar-convocatorias/listar-convocatorias.component';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { Router } from '@angular/router';
import { FiltroInput } from '../../../../../service/common/model/filtro/filtroInput';
import { FiltroField } from '../../../../../service/common/model/filtro/filtroField';
import { FiltroFieldTipo } from '../../../../../service/common/model/filtro/filtroFieldTipo';
import { FormularioComponent } from '../../../../shared/formulario/formulario.component';
import { TipoFinanciacion } from '../../../../../service/convocatoria/domain/model/enum/tipoFinanciacion';
import { DatatableInput } from '../../../../../service/common/model/datatableInput';
import { Paginacion } from '../../../../../service/common/model/paginacion';
import { CrearChecklistDTO } from '../../../../../service/convocatoria/domain/model/DTO/crearConvocatoriaDTO';
import { ResponsableDocumento } from '../../../../../service/convocatoria/domain/model/enum/responsableDocumento';
import { DatatableCustomComponent } from '../../../../shared/datatableCustomizable/datatable-custom.component';
import { DatatableInputAction } from '../../../../../service/common/model/datatableAction';
import { SiNo } from '../../../../../service/common/model/enum/siNO';

@Component({
  selector: 'app-documentos-proyecto',
  standalone: true,
  imports: [ListarConvocatoriasComponent, FormularioComponent, DatatableCustomComponent],
  templateUrl: './documentos-proyecto.component.html',
  styleUrl: './documentos-proyecto.component.css'
})
export class DocumentosProyectoComponent implements OnInit, AfterViewInit{

  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Informacion necesaria para crear los campos del formulario
  protected filtroInput: FiltroInput;

  // Informacion necesaria con los valores para popular los campos del formulario
  protected filtroValues: any;

  // Informacion de la convocatoria asociada
  protected proyectoInformacionConvocatoria:ProyectoInformacionConvocatoria = new ProyectoInformacionConvocatoria();

  // Informacion del proyecto involucrado
  private proyectoId:number = 0;

  // Datatable para los documentos
  protected datatableInputsDocEjecucion: DatatableInput;
  protected datatableInputsDocPreEjecucion: DatatableInput;
  protected datatableInputsDocPostEjecucion: DatatableInput;

  // Valores de los Checklists
  protected crearChecklistDTODocEjecucion: CrearChecklistDTO[];
  protected crearChecklistDTODocPreEjecucion: CrearChecklistDTO[];
  protected crearChecklistDTODocPostEjecucion: CrearChecklistDTO[];

  constructor(
    private router: Router,
    protected proyectoObtenerService: ProyectoObtenerService,
    protected proyectoCrearService: ProyectoCrearService
  ) { 
    // Inicialización de los datos para crear los campos del formulario
    this.filtroInput = new FiltroInput();
    
    this.filtroInput.filtroFields.push(new FiltroField('ID Convocatoria', 'id', 'ID', FiltroFieldTipo.INPUT, 'text', null, "Campo no valido", [], false, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Nombre', 'nombre', 'Nombre', FiltroFieldTipo.TEXTAREA, 'text', null, "Campo no valido", [], false, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Tipo de Financiación', 'tipoFinanciacion', 'Tipo de Financiación', FiltroFieldTipo.ENUM, '', TipoFinanciacion, "Campo no valido", [], false, ''));

    // Inicialización de los datos que construyen el datatable EJECUCION
    this.datatableInputsDocEjecucion = new DatatableInput(
      'Documentos',
      new Paginacion<CrearChecklistDTO>()
    );
    this.datatableInputsDocEjecucion.searchPerformed = true;
    this.datatableInputsDocEjecucion.acciones = [new DatatableInputAction('list', 'verDocs')];
    this.datatableInputsDocEjecucion.tableHeaders = ['ID Doc', 'Nombre', 'Responsable Documento', 'Cantidad', '¿Obligatorio?'];
    this.datatableInputsDocEjecucion.dataAttributes = [
      {name:'documentoId', type:String}, 
      {name:'nombre', type:String}, 
      {name:'responsableDocumento', type:ResponsableDocumento}, 
      {name:'cantidad', type:String}, 
      {name:'obligatorio', type:SiNo}, 
    ]  
    this.datatableInputsDocEjecucion.mensajeNoHayElementos = 'No hay Docuementos que se deban cargar para esta Etapa'
    this.datatableInputsDocEjecucion.quieresPaginar = false;

    // Inicialización de los datos que construyen el datatable PRE EJECUCION
    this.datatableInputsDocPreEjecucion = new DatatableInput(
      'Documentos',
      new Paginacion<CrearChecklistDTO>()
    );
    this.datatableInputsDocPreEjecucion.searchPerformed = true;
    this.datatableInputsDocPreEjecucion.acciones = [new DatatableInputAction('list', 'verDocs')];
    this.datatableInputsDocPreEjecucion.tableHeaders = ['ID Doc', 'Nombre', 'Responsable Documento', 'Cantidad', '¿Obligatorio?'];
    this.datatableInputsDocPreEjecucion.dataAttributes = [
      {name:'documentoId', type:String}, 
      {name:'nombre', type:String}, 
      {name:'responsableDocumento', type:ResponsableDocumento}, 
      {name:'cantidad', type:String}, 
      {name:'obligatorio', type:SiNo}, 
    ] 
    this.datatableInputsDocPreEjecucion.mensajeNoHayElementos = 'No hay Docuementos que se deban cargar para esta Etapa'
    this.datatableInputsDocPreEjecucion.quieresPaginar = false;

    // Inicialización de los datos que construyen el datatable POST EJECUCION
    this.datatableInputsDocPostEjecucion = new DatatableInput(
      'Documentos',
      new Paginacion<CrearChecklistDTO>()
    );
    this.datatableInputsDocPostEjecucion.searchPerformed = true;
    this.datatableInputsDocPostEjecucion.acciones = [new DatatableInputAction('list', 'verDocs')];
    this.datatableInputsDocPostEjecucion.tableHeaders = ['ID Doc', 'Nombre', 'Responsable Documento', 'Cantidad', '¿Obligatorio?'];
    this.datatableInputsDocPostEjecucion.dataAttributes = [
      {name:'documentoId', type:String}, 
      {name:'nombre', type:String}, 
      {name:'responsableDocumento', type:ResponsableDocumento}, 
      {name:'cantidad', type:String}, 
      {name:'obligatorio', type:SiNo}, 
    ] 
    this.datatableInputsDocPostEjecucion.mensajeNoHayElementos = 'No hay Docuementos que se deban cargar para esta Etapa'
    this.datatableInputsDocPostEjecucion.quieresPaginar = false;

    this.crearChecklistDTODocEjecucion = [];
    this.crearChecklistDTODocPreEjecucion = [];
    this.crearChecklistDTODocPostEjecucion = [];
    
  }

  ngOnInit(): void {
    this.proyectoObtenerService.informacionDetalladaProyecto.subscribe({
      next: (respuesta) => {
        if (respuesta.data.convocatoria != null) {
          this.proyectoInformacionConvocatoria = respuesta.data.convocatoria;
          this.filtroValues = this.proyectoInformacionConvocatoria;
        }
        this.proyectoId = respuesta.data.id;          
      }
    })
  }

  ngAfterViewInit(): void {
    this.proyectoObtenerService.informacionDetalladaProyecto.subscribe({
      next: (respuesta) => {
        if (respuesta.data.convocatoria != null) {
          this.proyectoInformacionConvocatoria = respuesta.data.convocatoria;
          this.filtroValues = this.proyectoInformacionConvocatoria;

          // Agregar Doc Checklist
          this.proyectoInformacionConvocatoria.checklist.forEach(doc => {
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
        this.proyectoId = respuesta.data.id;          
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

  accion(accion: any): void {
    
    if (accion.accion.accion == 'verDocs') {  
      alert("Desplegar Docs")
    }
    if (accion.accion.accion == 'agregar') { 
      this.agregarConvocatoria(accion);
    }
  }

  submit(accion: any): void {
    console.error("Metodo no implementado")
  }

  private agregarConvocatoria(accion: any): void{
    this.proyectoCrearService.asociarConvocatoria(this.proyectoId.toString(), accion.data.id).subscribe({
      // Manejar respuesta exitosa
      next: (respuesta) => {
        // Captura la respuesta
        this.openModalOk(respuesta.userMessage, "/proyectos/listar/"+ this.proyectoId +"/informacion-general");
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
      }
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
