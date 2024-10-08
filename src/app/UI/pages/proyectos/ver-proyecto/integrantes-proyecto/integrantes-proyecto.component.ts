import { Component, inject, OnInit } from '@angular/core';
import { DatatableCustomComponent } from '../../../../shared/datatableCustomizable/datatable-custom.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableInput } from '../../../../../service/common/model/datatableInput';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { Paginacion } from '../../../../../service/common/model/paginacion';
import { Integrantes, OrganismoPrincipal } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoDetalladoDTO';
import { DatatableInputAction } from '../../../../../service/common/model/datatableAction';
import { IntegranteDataTable, IntegrantesDataTable } from '../../../../../service/proyecto/domain/model/proyecciones/integrantesDataTable';
import { RolProyecto } from '../../../../../service/proyecto/domain/model/enum/rolProyecto';
import { VerProyectoService } from '../ver-proyecto.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganismoObtenerService } from '../../../../../service/organismoDeInvestigacion/domain/service/organismoObtener.service';
import { GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion } from '../../../../../service/organismoDeInvestigacion/domain/model/proyecciones/obtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { TipoUsuario } from '../../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { TipoDocumentoEnum2 } from '../../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumentoEnum2';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { RolProyectoService } from '../../../../../service/proyecto/domain/service/rol-proyecto.service';
import { RolProyectoProyeccion } from '../../../../../service/proyecto/domain/model/proyecciones/rolProyectoProyeccion';

@Component({
  selector: 'app-integrantes-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, DatatableCustomComponent],
  templateUrl: './integrantes-proyecto.component.html',
  styleUrl: './integrantes-proyecto.component.css'
})
export class IntegrantesProyectoComponent implements OnInit{

  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Variable para guardar la informacion de los integrantes
  protected listadoDeIntegrantesOrganismoPadreDelProyecto: Respuesta<GrupoObtenerIntegrantesOrganismoParaAsociarDirProyectoProyeccion>;

  // Informacion asociada al Proyecto
  protected proyectoInformacionIntegrante: Integrantes[] = [];
  protected proyectoInformacionOrganismo: OrganismoPrincipal = new OrganismoPrincipal();

  // Datatable para los documentos
  protected datatableInputsIntegrantes: DatatableInput;

  // Informacion del proyecto involucrado
  private proyectoId:number = 0;

  protected buscarEstudiante: boolean = false; // El div está oculto por defecto
  protected habilitarSeleccionarRol = false;

  protected formularioBuscarIntegrante: FormGroup;

  protected tipoUsuarioEnum = TipoUsuario
  protected rolProyectoEnum = RolProyecto
  protected tipoDocumentoEnum2 = TipoDocumentoEnum2

  protected listadoDeRolesDisponibles: RolProyectoProyeccion[] = [];
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private organismoObtenerService: OrganismoObtenerService,
    protected proyectoObtenerService: ProyectoObtenerService,
    protected proyectoCrearService: ProyectoCrearService,
    protected rolProyectoService: RolProyectoService,
    protected verProyectoService: VerProyectoService,
    protected enumTranslationService: EnumTranslationService
  ){
    this.listadoDeIntegrantesOrganismoPadreDelProyecto = new Respuesta();
    this.verProyectoService.setTituloInstruccion("Integrantes vinculados al Proyecto");
    this.verProyectoService.setInstruccion("En esta sección podrás gestionar los integrantes asociados al proyecto.");

    // Inicialización de los datos que construyen el datatable Integrantes
    this.datatableInputsIntegrantes = new DatatableInput(
      'Integrantes',
      new Paginacion<IntegranteDataTable>()
    );
    this.datatableInputsIntegrantes.acccionPrincipal.accion = "agregarIntegrante";
    this.datatableInputsIntegrantes.acccionPrincipal.icono = "add";
    this.datatableInputsIntegrantes.acccionPrincipal.texto = "Agregar Integrante";
    this.datatableInputsIntegrantes.searchPerformed = true;
    this.datatableInputsIntegrantes.acciones = [new DatatableInputAction('visibility', 'ver', 'Ver'), new DatatableInputAction('delete', 'eliminar', 'Eliminar')];
    this.datatableInputsIntegrantes.tableHeaders = ['Integrante ID', 'Usuario ID', 'Integrante', 'Rol'];
    this.datatableInputsIntegrantes.dataAttributes = [
      {name:'id', type:String},
      {name:'usuarioId', type:String},
      {name:'integrante', type:String},
      {name:'rol', type:RolProyecto}
    ]  
    this.datatableInputsIntegrantes.mensajeNoHayElementos = 'No hay Integrantes Asociados al Proyecto'
    this.datatableInputsIntegrantes.quieresPaginar = false;

    this.formularioBuscarIntegrante = this.formBuilder.group({
      rolProyecto: ['', Validators.required],
      usuarioProspecto: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    this.proyectoObtenerService.informacionDetalladaProyecto.subscribe({
      next: (respuesta) => {

        if (respuesta.data.integrantesProyecto.integrantes != null) {
          this.proyectoInformacionIntegrante = respuesta.data.integrantesProyecto.integrantes;
          this.proyectoInformacionOrganismo = respuesta.data.organismoPrincipal;

          let paginacionEjecucion = new Paginacion();
          paginacionEjecucion.content = new IntegrantesDataTable(respuesta.data.integrantesProyecto.integrantes).integrantes;

          this.datatableInputsIntegrantes.paginacion = paginacionEjecucion;
          this.datatableInputsIntegrantes.searchPerformed = true;
        }
        this.proyectoId = respuesta.data.informacionDetalladaProyecto.id;          
      }
    })
  }

  accion(accion: any): void {
    if (accion == "agregarIntegrante") {
      if (this.proyectoInformacionOrganismo) {
        this.buscarIntegrantesOrganismo();         
      }else{
        alert("Error no se pudo obtener el organismo")
      }           
    }else if (accion.accion.accion == 'ver') {
      this.router.navigate(["/usuarios/listar-usuarios/"+accion.data.usuarioId]);
    }
  }

  buscarIntegrantesOrganismo(){
    // todo miguel Aquie hay que mandar el id del organismo padre
    this.organismoObtenerService.listarIntegrantesOrganismo(this.proyectoInformacionOrganismo.id, this.proyectoId)
      .subscribe({
        next: (respuesta) => {      
          this.listadoDeIntegrantesOrganismoPadreDelProyecto = respuesta
          this.buscarEstudiante = !this.buscarEstudiante;
        },
        error: (errorData) => {
          console.error(errorData);
        }
    });
  }

  /**
   * Restablece todos los campos del formulario a sus valores iniciales y reinicia la paginación.
   */
  limpiarFiltroBusquedaIntegrantes(): void {
    this.formularioBuscarIntegrante = this.formBuilder.group({
      rolProyecto: ['', Validators.required],
      usuarioProspecto: ['', Validators.required]
    });
    this.buscarEstudiante = !this.buscarEstudiante;
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formularioBuscarIntegrante.valid) {
     
      this.proyectoCrearService.agregarIntegrante(this.verProyectoService.formularioInformacionDetalladaProyecto.get("informacionGeneral.id")?.value, this.formularioBuscarIntegrante.get("usuarioProspecto")?.value, this.formularioBuscarIntegrante.get("rolProyecto")?.value).subscribe({
        next: (respuesta) => {
          this.openModalOk(respuesta.userMessage, "/proyectos/listar");
        },
        error: (errorData) => {
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
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
      this.formularioBuscarIntegrante.markAllAsTouched();
    }
  }

  buscarRol(event: any) {
    this.rolProyectoService.obtenesRolesParaAsignarRolProyecto(this.formularioBuscarIntegrante.get('usuarioProspecto')?.value, this.proyectoId).subscribe({
      next: (respuesta) => {

        this.listadoDeRolesDisponibles = respuesta.data

        this.habilitarSeleccionarRol = true;
      },
      error: (errorData) => {
        if (errorData.error && errorData.error.data) {
          let respuesta: Respuesta<ErrorData> = errorData.error;
          this.openModalBad(respuesta.data);
        } else {
          this.openModalBad(
            new ErrorData({
              error: 'Error inseperado, contactar a soporte',
            })
          );
        }
      },
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
