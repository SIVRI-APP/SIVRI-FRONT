import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoDocumento } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { TipoUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { Sexo } from '../../../../service/solicitudUsuarios/domain/model/enum/sexo';
import { UsuarioSolicitudCrearService } from '../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudCrear.service';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../shared/modal-bad/modal-bad.component';
import { ErrorData } from '../../../../service/common/model/errorData';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { Router } from '@angular/router';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { DatatableCustomComponent } from '../../../shared/datatableCustomizable/datatable-custom.component';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { DatatableInputAction } from '../../../../service/common/model/datatableAction';
import { ListarOrganismosParaAsociarProyectoProyeccion } from '../../../../service/organismoDeInvestigacion/domain/model/proyecciones/listarOrganismosParaAsociarProyectoProyeccion';
import { OrganismoObtenerService } from '../../../../service/organismoDeInvestigacion/domain/service/organismoObtener.service';
import { ProyectoObtenerService } from '../../../../service/proyecto/domain/service/proyectoObtener.service';
import { RolProyectoService } from '../../../../service/proyecto/domain/service/rol-proyecto.service';
import { RolProyectoProyeccion } from '../../../../service/proyecto/domain/model/proyecciones/rolProyectoProyeccion';
import { RolProyecto } from '../../../../service/proyecto/domain/model/enum/rolProyecto';
import { OrganismoDeInvestigacionYProyectoEnum } from '../../../../service/organismoDeInvestigacion/domain/model/enum/OrganismoDeInvestigacionYProyecto';

@Component({
  selector: 'app-crear-solicitud-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatatableCustomComponent],
  templateUrl: './crear-solicitud-usuario.component.html',
  styleUrl: './crear-solicitud-usuario.component.css',
})
export class CrearSolicitudUsuarioComponent implements OnInit{
  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Enumeraciones que llenan los select
  protected tipoDocumentoEnum = TipoDocumento;
  protected sexoEnum = Sexo;
  protected tipoUsuarioEnum = TipoUsuario;
  protected organismoDeInvestigacionYProyectoEnum = OrganismoDeInvestigacionYProyectoEnum;
  protected rolProyectoEnum = RolProyecto;

  // Formulario reactivo
  protected formulario: FormGroup; 
  protected formularioBuscarOrganismos: FormGroup;
  protected datatableInputsBuscarOrganismos: DatatableInput;

  // Buscar Organimos
  protected visualizarOrganismos: boolean = false;
  protected tipoOrganismoABuscar: String = '';
  protected mostrarRoles = false;
  protected mostrarSeleccionarOrganismo = false;
  protected organismoSeleccionadoNombre = '';
  protected organismoSeleccionadoId = '';
  protected rolesDisponibles: RolProyectoProyeccion[] = [];
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioSolicitudCrearService: UsuarioSolicitudCrearService,
    protected enumTranslationService: EnumTranslationService,
    private organismoObtenerService: OrganismoObtenerService,
    private proyectoObtenerService:ProyectoObtenerService,
    private rolProyectoService: RolProyectoService,
  ) {
    this.formulario = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      sexo: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      departamentoId: [{ value: '', disabled: true }],
      programaId: [{ value: '', disabled: true }],
      tipoOrganismo: ['', [Validators.required]],
      organismoDeInvestigacionId: [{ value: '', disabled: true }],
      rolId: [{ value: '', disabled: true }],
      cvLac: [''],
      nota: ['', Validators.maxLength(1000)]
    });

    this.formularioBuscarOrganismos = this.formBuilder.group({
      buscarOrganismosPageNo: [0],
      buscarOrganismosPageSize: ['10'],
      nombreOrganismo: [''],
      organismoId: [''],
      tipoOrganismo: ['']
    });

    // Inicialización de los datos que construyen el datatable
    this.datatableInputsBuscarOrganismos = new DatatableInput(
      'Organismos',
      new Paginacion<ListarOrganismosParaAsociarProyectoProyeccion>()
    );
    this.datatableInputsBuscarOrganismos.quieresPaginar = true;
    this.datatableInputsBuscarOrganismos.acciones = [new DatatableInputAction('add', 'agregar')]
    this.datatableInputsBuscarOrganismos.mensajeNoHayElementos = 'No hay Organismos de Investigación asociados a esta Busqueda'
    this.datatableInputsBuscarOrganismos.mensajeBusqueda = 'Visualiza Organismos de Investigación llenando los campos del formulario.'
    this.datatableInputsBuscarOrganismos.tableHeaders = ['ID', 'Nombre'];
    this.datatableInputsBuscarOrganismos.dataAttributes = [
      {name:'id', type:String}, 
      {name:'nombre', type:String}
    ]
  }

  ngOnInit(): void {
    
  }

  /**
   * Maneja el envío del formulario de búsqueda de solicitudes de usuario.
   */
  onSubmit(): void {
    if (this.formulario.valid) {
      console.log(this.formulario.getRawValue());
      this.usuarioSolicitudCrearService.crearSolicitudUsuario(this.formulario.getRawValue())
        .subscribe({
          // Manejar Respuesta
          next: (respuesta) => {
            this.openModalOk(respuesta.userMessage)
          },
          error: (errorData) => {
            // Manejar Error
            if (errorData.error && errorData.error.data) {
              let respuesta: Respuesta<ErrorData> = errorData.error;
              this.openModalBad(respuesta.data);
            } else {
              // Manejar errores inesperados
              this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
            }
          }
        });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  /**
   * Restablece todos los campos del formulario a sus valores iniciales y reinicia la paginación.
   */
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      sexo: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      departamentoId: [{ value: '', disabled: true }],
      programaId: [{ value: '', disabled: true }],
      tipoOrganismo: ['', [Validators.required]],
      organismoDeInvestigacionId: [{ value: '', disabled: true }],
      rolId: [{ value: '', disabled: true }],
      cvLac: [''],
      nota: ['', Validators.maxLength(1000)]
    });

    this.limpiarOrganimosYRolSeleccionados();
  }

  limpiarOrganimosYRolSeleccionados(){
    let a = this.formulario.get('tipoOrganismo');
    let b = this.formulario.get('organismoDeInvestigacionId');
    let c = this.formulario.get('rolId');

    if (a && b && c) {
      a.setValue('')
      b.setValue('')
      c.setValue('')
      this.visualizarOrganismos = false;
      this.mostrarRoles = false;
    }
  }
  
  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Aquí puedes realizar la navegación a otra ruta
        this.router.navigate(['/usuarios/listar-solicitudes']);
      }
    });
	}

  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}


  // Esta funcion hace el campo CVLAC obligatorio si el tipo de usuario a crear es DOCENTE
  onTipoUsuarioSeleccionado(event: any) {
    const valorSeleccionado = event.target.value;

    const campoCvLac = this.formulario.get('cvLac');
    const campoDepartamento = this.formulario.get('departamentoId');
    const campoPrograma = this.formulario.get('programaId');

    if (campoCvLac && campoDepartamento && campoPrograma) {
      if (valorSeleccionado == 'DOCENTE') {
        // Campo CVLAC, Departamento obligatorio
        campoCvLac.setValidators([Validators.required]);
        campoCvLac.updateValueAndValidity();

        campoDepartamento.setValidators([Validators.required]);  
        campoDepartamento.enable();   
        campoDepartamento.updateValueAndValidity();  
        
        campoPrograma.clearValidators();
        campoPrograma.updateValueAndValidity();
        campoPrograma.disable();        
      }else if(valorSeleccionado == 'PREGRADO' || valorSeleccionado == 'POSGRADO'){
        // Campo Programa obligatorio
        campoPrograma.setValidators([Validators.required]);
        campoPrograma.enable();
        campoPrograma.updateValueAndValidity();

        campoCvLac.clearValidators();
        campoCvLac.updateValueAndValidity();

        campoDepartamento.clearValidators();
        campoDepartamento.updateValueAndValidity();
        campoDepartamento.disable();        
      }else{
        // Limpiar todos los campos
        campoCvLac.clearValidators();
        campoCvLac.updateValueAndValidity();

        campoDepartamento.clearValidators();
        campoDepartamento.updateValueAndValidity();
        campoDepartamento.disable();

        campoPrograma.clearValidators();
        campoPrograma.updateValueAndValidity();
        campoPrograma.disable();        
      }
    }

    this.limpiarOrganimosYRolSeleccionados();
    this.mostrarSeleccionarOrganismo = true;
  }

  // AQUI EMPIEZA EL CODIGO PARA SELECCIONAR UN ORGANISMO Y ROL
  visualizarFiltroBusquedaOrganismo(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.visualizarOrganismos = true;
    this.tipoOrganismoABuscar = selectedValue;

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

    if(this.tipoOrganismoABuscar == "GRUPO"){
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.setValue('GRUPO');
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.disable();
    }else if (this.tipoOrganismoABuscar == "SEMILLERO"){
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.setValue('SEMILLERO');
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.disable();
    }else{
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.setValue('PROYECTO');
      this.formularioBuscarOrganismos.get('tipoOrganismo')!.disable();
    }

    this.datatableInputsBuscarOrganismos.searchPerformed = false;
    this.datatableInputsBuscarOrganismos.paginacion = new Paginacion();
  }

  buscarOrganismos(){
    
    switch (this.tipoOrganismoABuscar) {
      case "GRUPO":
        this.organismoObtenerService.listarConFiltro("GRUPO", this.formularioBuscarOrganismos.value.buscarOrganismosPageNo, this.formularioBuscarOrganismos.value.buscarOrganismosPageSize, this.formularioBuscarOrganismos.value.organismoId, this.formularioBuscarOrganismos.value.nombreOrganismo);
        this.organismoObtenerService.getRegistroListarConFiltro().subscribe({
          next: (respuesta) => {               
            this.datatableInputsBuscarOrganismos.searchPerformed = true;
            this.datatableInputsBuscarOrganismos.paginacion = respuesta.data
          },
          error: (errorData) => {
            console.error(errorData);
          }
        });
        break;
      case "SEMILLERO":
        this.organismoObtenerService.listarConFiltro("SEMILLERO", this.formularioBuscarOrganismos.value.buscarOrganismosPageNo, this.formularioBuscarOrganismos.value.buscarOrganismosPageSize, this.formularioBuscarOrganismos.value.organismoId, this.formularioBuscarOrganismos.value.nombreOrganismo);
        this.organismoObtenerService.getRegistroListarConFiltro().subscribe({
          next: (respuesta) => {               
            this.datatableInputsBuscarOrganismos.searchPerformed = true;
            this.datatableInputsBuscarOrganismos.paginacion = respuesta.data
          },
          error: (errorData) => {
            console.error(errorData);
          }
        });
        break;
      case "PROYECTO":
        this.proyectoObtenerService.listarSimpleConFiltro(this.formularioBuscarOrganismos.value.buscarOrganismosPageNo, this.formularioBuscarOrganismos.value.buscarOrganismosPageSize, this.formularioBuscarOrganismos.value.organismoId, this.formularioBuscarOrganismos.value.nombreOrganismo).subscribe({
          next: (respuesta) => {               
            this.datatableInputsBuscarOrganismos.searchPerformed = true;
            this.datatableInputsBuscarOrganismos.paginacion = respuesta.data
          },
          error: (errorData) => {
            console.error(errorData);
          }
        });
        break;    
      default:
        break;
    }
  }

  /**
   * Cambia la página de resultados de acuerdo al número de página especificado.
   * @param pageNumber El número de página al que se debe cambiar.
   */
  changePage(pageNumber: number): void {
    // Actualizar el valor de pageNo en el formulario
    this.formularioBuscarOrganismos.get('buscarOrganismosPageNo')?.setValue(pageNumber - 1 );

    // Enviar el formulario para cargar los respuesta de la nueva página
    this.buscarOrganismos();
  }

  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePage(newPage: number): void {
    // Realizar incremento o decremento de la Pagina
    this.formularioBuscarOrganismos
      .get('buscarOrganismosPageNo')
      ?.setValue((this.formularioBuscarOrganismos.get('buscarOrganismosPageNo')?.value ?? 0) + newPage);

    // Enviar el formulario para cargar los respuesta de la nueva página
    this.buscarOrganismos();
  }

  accion(accion: any): void {
    this.visualizarOrganismos = false;
    // Si la accion es ver
    if (accion.accion.accion == 'agregar') {

      this.mostrarRoles = true;
      this.organismoSeleccionadoNombre = accion.data.nombre;
      this.organismoSeleccionadoId = accion.data.id;

      this.formulario.get('organismoDeInvestigacionId')?.setValue(accion.data.id);

      this.rolProyectoService.listarRoles(this.formulario.get('tipoUsuario')?.value).subscribe({
        // Manejar Respuesta
        next: (respuesta) => {
          console.log(respuesta)
          const campoRolId = this.formulario.get('rolId');
          if (campoRolId) {
            campoRolId.setValidators([Validators.required]);  
            campoRolId.enable();   
            campoRolId.updateValueAndValidity();              
          }
          this.rolesDisponibles = respuesta.data;
        },
        error: (errorData) => {
          // Manejar Error
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
            // Manejar errores inesperados
            this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
          }
        }
      });
    }
  }



}
