import { Component, OnDestroy, OnInit, numberAttribute } from '@angular/core';
import { IntegranteSemilleroEstado } from '../../../../../../service/semilleros/domain/model/enum/integranteSemilleroEstado';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { RolIntegranteSemillero } from '../../../../../../service/semilleros/domain/model/proyecciones/rolIntegranteSemillero';
import { RolSemilleroObtenerService } from '../../../../../../service/semilleros/domain/service/rol-semillero-obtener.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IntegranteSemilleroObtenerService } from '../../../../../../service/semilleros/domain/service/integrante-semillero-obtener.service';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { Paginacion } from '../../../../../../service/common/model/paginacion';
import { IntegranteSemilleroListar } from '../../../../../../service/semilleros/domain/model/proyecciones/integranteSemilleroListarProyeccion';
import { DatatableInput } from '../../../../../../service/common/model/datatableInput';
import { DatatableComponent } from '../../../../../shared/datatable/datatable.component';
import { CrearIntegranteComponent } from '../crear-integrante/crear-integrante.component';
import { Subscription } from 'rxjs';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';
import { InformacionUsuarioAutenticadoService } from '../../../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-listar-integrantes',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    RouterLinkActive,
    DatatableComponent,
    CrearIntegranteComponent
  ],
  templateUrl: './listar-integrantes.component.html',
  styleUrl: './listar-integrantes.component.css'
})
export class ListarIntegrantesComponent implements OnInit, OnDestroy {
  private idSemillero!: string;
  protected formulario: FormGroup;
  private suscripciones: Subscription[] = [];
  paginas: number[] = [10,25, 50,100];
  protected respuesta: Respuesta<Paginacion<IntegranteSemilleroListar>>
  protected estadoIntegranteEnum = IntegranteSemilleroEstado;
  protected rolIntegranteSemillero: RolIntegranteSemillero[] = [];
  protected datatableInputs: DatatableInput;
  protected mostrarFormularioCrear: boolean = false;
  protected mostrarBtnCrearIntegrante: boolean=false;
  protected rolFuncionario: boolean=false;
  private roles: string[]=[];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private actualizarListarService: CommunicationComponentsService,
    protected enumTranslationService: EnumTranslationService,
    private rolSemilleroObtenerService: RolSemilleroObtenerService,
    private integranteSemilleroObtenerService: IntegranteSemilleroObtenerService,
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ) {
    this.respuesta = new Respuesta<Paginacion<IntegranteSemilleroListar>>();
    this.datatableInputs = new DatatableInput('Integrantes', new Paginacion<IntegranteSemilleroListar>());
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      idSemillero: [null],
      numeroDocumento: [''],
      estado: [''],
      rolSemillero: ['']
    });
    this.roles= informacionUsuarioAutenticadoService.retornarRoles();
    this.mostrarBtnCrearIntegrante=this.roles.includes('GRUPO:DIRECTOR');
    this.rolFuncionario=this.roles.includes('FUNCIONARIO:SEMILLEROS');
  }
  ngOnDestroy(): void {
    // Liberar la suscripción para evitar memory leaks
    this.suscripciones.forEach(subscription => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
    });
    this.formulario.get('idSemillero')?.setValue(this.idSemillero);
    this.rolSemilleroObtenerService.obtenerRolesSemillero().subscribe({
      // Manejar respuesta exitosa
      next: (respueta) => {

        this.rolIntegranteSemillero = respueta.data;
        this.integranteSemilleroObtenerService.setRolIntegranteSemillero(this.rolIntegranteSemillero);
       },// Manejar errores
      error: (errorData) => {
        console.error(errorData);
      },
    });
    this.listarIntegrantes();

    this.suscribirseALasActualizaciones();
  }

  onsubmit() {
    this.mostrarFormularioCrear = false;
    if (this.formulario.valid) {
      this.listarIntegrantes();

    }
  }
  listarIntegrantes() {
    //realiza la peticion para obtener los datos filtrados
    this.integranteSemilleroObtenerService.obtenerIntegrantesxSemilleroIdPaginado(
      this.idSemillero, this.formulario.value.numeroDocumento,
      this.formulario.value.rolSemillero, this.formulario.value.estado,
      this.formulario.value.pageNo, this.formulario.value.pageSize).subscribe({
        next: (respuesta) => {
          // Actualizar la lista de integrantes con los datos obtenidos
          this.respuesta = respuesta;
          //actualiza el input del datatable
          this.datatableInputs.searchPerformed = true;
          this.datatableInputs.paginacion = this.respuesta.data;
          this.datatableInputs.tableHeaders = ['ID', 'Numero Documento', 'Nombre', 'Rol Semillero', 'Estado', 'Fecha Ingreso'];
          this.datatableInputs.dataAttributes = [
            { name: 'idIntegranteSemillero', type: Number },
            { name: 'numeroDocumento', type: String },
            { name: 'nombreCompleto', type: String },
            { name: 'rolSemillero', type: String },
            { name: 'estado', type: String },
            { name: 'fechaIngreso', type: String },
          ]
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        },
      });
  }
  suscribirseALasActualizaciones() {

    // Suscribirse a las notificaciones de actualización para cada tipo
    this.suscripciones.push(
      this.actualizarListarService.actualizarListar$.subscribe((tipo: string) => {

        if (tipo == 'agregar') {
           this.mostrarFormularioCrear = false;
        } else if (tipo == 'actualizar') {


        }else if(tipo == 'cancelar'){
          this.mostrarFormularioCrear=false;
          this.listarIntegrantes();
        }
         this.listarIntegrantes();
      })
    );

  }
  toggleFormulario() {
    this.mostrarFormularioCrear = !this.mostrarFormularioCrear;
  }
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      idSemillero: [null],
      numeroDocumento: [''],
      estado: [''],
      rolSemillero: ['']
    });
  }
  /**
   * Cambia la página de resultados de acuerdo al número de página especificado.
   * @param pageNumber El número de página al que se debe cambiar.
   */
  changePage(pageNumber: number): void {
    // Actualizar el valor de pageNo en el formulario
    this.formulario.get('pageNo')?.setValue(pageNumber);

    // Enviar el formulario para cargar los datos de la nueva página
    this.onsubmit();
  }
  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePage(newPage: number): void {
    // Realizar incremento o decremento de la Pagina
    this.formulario
      .get('pageNo')
      ?.setValue((this.formulario.get('pageNo')?.value ?? 0) + newPage);

    // Enviar el formulario para cargar los datos de la nueva página
    //this.onsubmit();
    this.listarIntegrantes();
  }
}
