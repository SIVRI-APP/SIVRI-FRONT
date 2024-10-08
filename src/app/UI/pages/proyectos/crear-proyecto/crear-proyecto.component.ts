import { Component, inject } from '@angular/core';
import { DatatableCustomComponent } from '../../../shared/datatableCustomizable/datatable-custom.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { Router } from '@angular/router';
import { ProyectoCrearService } from '../../../../service/proyecto/domain/service/proyectoCrear.service';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { ModalOkComponent } from '../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../shared/modal-bad/modal-bad.component';
import { ErrorData } from '../../../../service/common/model/errorData';
import { OrganismoDeInvestigacionEnum } from '../../../../service/organismoDeInvestigacion/domain/model/enum/OrganismoDeInvestigacion';
import { OrganismoObtenerService } from '../../../../service/organismoDeInvestigacion/domain/service/organismoObtener.service';
import { CrearProyectoDTO } from '../../../../service/proyecto/domain/model/DTO/crearProyectoDTO';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { ListarOrganismosParaAsociarProyectoProyeccion } from '../../../../service/organismoDeInvestigacion/domain/model/proyecciones/listarOrganismosParaAsociarProyectoProyeccion';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { DatatableInputAction } from '../../../../service/common/model/datatableAction';
import { GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion } from '../../../../service/organismoDeInvestigacion/domain/model/proyecciones/obtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion';


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
  protected organismoDeInvestigacionEnum = OrganismoDeInvestigacionEnum;

  // Formulario reactivo
  protected formulario: FormGroup;

  protected formularioBuscarOrganismos: FormGroup;

  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;

  // Cuerpo para enviar en la solicitud de Creación
  private crearProyectoDTO: CrearProyectoDTO;

  // Informacion del Datatable
  protected datatableInputs: DatatableInput;

  // Informacion Integrantes
  protected integrantesOrganismo: GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion | undefined

  protected visualizarOrganismos: boolean;
  protected tipoOrganismo: String = '';
  protected mostrarIntegrantes: boolean;
  protected mostrarOrganismo = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private proyectoCrearService: ProyectoCrearService,
    private organismoObtenerService: OrganismoObtenerService,
    protected enumTranslationService: EnumTranslationService
  ) {
    this.respuesta = new Respuesta<false>();
    this.crearProyectoDTO = new CrearProyectoDTO();
    this.visualizarOrganismos = false;
    this.mostrarIntegrantes = false;

    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      organismo: ['', Validators.required],
      directorDeProyectoId: ['', Validators.required]
    });

    this.formularioBuscarOrganismos = this.formBuilder.group({
      buscarOrganismosPageNo: [0],
      buscarOrganismosPageSize: ['10'],
      nombreOrganismo: [''],
      organismoId: [''],
      tipoOrganismo: ['']
    });

    // Inicialización de los datos que construyen el datatable
    this.datatableInputs = new DatatableInput(
      'Organismos',
      new Paginacion<ListarOrganismosParaAsociarProyectoProyeccion>()
    );
    this.datatableInputs.quieresPaginar = true;
    this.datatableInputs.acciones = [new DatatableInputAction('add', 'agregar')]
    this.datatableInputs.mensajeNoHayElementos = 'No hay Organismos de Investigación asociados a esta Busqueda'
    this.datatableInputs.mensajeBusqueda = 'Visualiza Organismos de Investigación llenando los campos del formulario.'
    this.datatableInputs.tableHeaders = ['ID', 'Nombre'];
    this.datatableInputs.dataAttributes = [
      {name:'id', type:String}, 
      {name:'nombre', type:String}
    ]
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {

      this.crearProyectoDTO.nombre = this.formulario.value.nombre;
      this.crearProyectoDTO.organismoDeInvestigacionId = this.integrantesOrganismo!.id.toString();
      this.crearProyectoDTO.directorDeProyectoId = this.formulario.value.directorDeProyectoId;
       
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
      organismo: ['', Validators.required],
      organismoDeInvestigacionId: ['', Validators.required],
      directorDeProyectoId: ['', Validators.required]
    });

    this.visualizarOrganismos = false;
    this.tipoOrganismo = '';

    this.limpiarFiltroBusquedaOrganismo();
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

  visualizarFiltroBusquedaOrganismo(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.visualizarOrganismos = true;
    this.tipoOrganismo = selectedValue;

    if(this.tipoOrganismo == "GRUPO"){
      // Setear valor y deshabilitar el campo
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.setValue('GRUPO');
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.disable();

    }else{
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.setValue('SEMILLERO');
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.disable();
    }

    this.limpiarFiltroBusquedaOrganismo();
  }

  limpiarFiltroBusquedaOrganismo(){
    this.formularioBuscarOrganismos = this.formBuilder.group({
      buscarOrganismosPageNo: [0],
      buscarOrganismosPageSize: ['10'],
      nombreOrganismo: [''],
      organismoId: [''],
      tipoOrganismo: ['']
    });

    if(this.tipoOrganismo == "GRUPO"){
      // Setear valor y deshabilitar el campo
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.setValue('GRUPO');
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.disable();

    }else{
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.setValue('SEMILLERO');
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.disable();
    }

    this.datatableInputs.searchPerformed = false;
    this.datatableInputs.paginacion = new Paginacion();

    this.mostrarIntegrantes = false;
    this.mostrarOrganismo = false;
  }

  buscarOrganismos(){
    if(this.tipoOrganismo == "GRUPO"){
      this.organismoObtenerService.listarConFiltro("GRUPO", this.formularioBuscarOrganismos.value.buscarOrganismosPageNo, this.formularioBuscarOrganismos.value.buscarOrganismosPageSize, this.formularioBuscarOrganismos.value.organismoId, this.formularioBuscarOrganismos.value.nombreOrganismo);
    }else{
      this.organismoObtenerService.listarConFiltro("SEMILLERO", this.formularioBuscarOrganismos.value.buscarOrganismosPageNo, this.formularioBuscarOrganismos.value.buscarOrganismosPageSize, this.formularioBuscarOrganismos.value.organismoId, this.formularioBuscarOrganismos.value.nombreOrganismo);
    }

    this.organismoObtenerService.getRegistroListarConFiltro()
      .subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {      
          // Actualiar el Input del datatable          
          this.datatableInputs.searchPerformed = true;
          this.datatableInputs.paginacion = respuesta.data
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
      });
  }

  accion(accion: any): void {
    this.visualizarOrganismos = false;
    // Si la accion es ver
    if (accion.accion.accion == 'agregar') {
      console.log(accion.data);
      this.organismoObtenerService.listarIntegrantesDocenteOrganismo(accion.data.id);

      this.organismoObtenerService.getRegistroInformacionDetallada()
      .subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {      
          this.integrantesOrganismo = respuesta.data
          this.mostrarOrganismo = true;

          if (this.integrantesOrganismo.integrantes.length > 0) {
            this.mostrarIntegrantes = true;
          }
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
      });
    }
  }

}
