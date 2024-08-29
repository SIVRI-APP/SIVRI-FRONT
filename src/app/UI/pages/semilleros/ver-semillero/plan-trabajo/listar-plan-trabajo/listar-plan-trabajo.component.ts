import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatatableInput } from '../../../../../../service/common/model/datatableInput';
import { Paginacion } from '../../../../../../service/common/model/paginacion';
import { DatatableComponent } from '../../../../../shared/datatable/datatable.component';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlanTrabajoObtenerService } from '../../../../../../service/planTrabajo/domain/service/plan-trabajo-obtener.service';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { EstadoPlantrabajo } from '../../../../../../service/planTrabajo/domain/model/enum/EstadoPlanTrabajo';
import { PlanTrabajo } from '../../../../../../service/planTrabajo/domain/model/proyecciones/planTrabajo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearPlanModalComponent } from '../../../plan-trabajo/crear-plan-modal/crear-plan-modal.component';
import { CrearPlanComponent } from '../crear-plan/crear-plan.component';
import { ListarPlanTrabajo } from '../../../../../../service/planTrabajo/domain/model/proyecciones/listarPlanTrabajo';
import { ListarActividadesComponent } from '../actividad-plan-trabajo/listar-actividades/listar-actividades.component';
import { Subscription } from 'rxjs';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';

@Component({
  selector: 'app-listar-plan-trabajo',
  standalone: true,
  imports: [
    DatatableComponent,
    ReactiveFormsModule,
    RouterLink,
    CrearPlanComponent,
    ListarActividadesComponent
  ],
  templateUrl: './listar-plan-trabajo.component.html',
  styleUrl: './listar-plan-trabajo.component.css'
})
export class ListarPlanTrabajoComponent implements OnInit, OnDestroy {
  // Inyeccion de Modal
  //private modalService = inject(NgbModal);
  //campos que ayuda a la visualizacion
  protected idSemillero!: string;
  protected idPlan?: number;
  paginas: number[] = [2, 3, 5];
  private suscripciones: Subscription[] = [];
  protected formulario: FormGroup;
  protected searchPerformed:boolean=false;
  protected respuesta: Respuesta<Paginacion<ListarPlanTrabajo>>;
  protected datatableInputs: DatatableInput;
  protected datosPlan: Respuesta<PlanTrabajo>
  protected mostrarCreaPlan: boolean = false;
  protected estadoPlanEnum = EstadoPlantrabajo;
  @Output() movePageEmitter = new EventEmitter<number>();
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService,
    private planTrabajoObtenerService: PlanTrabajoObtenerService,
    private actualizarListarService: CommunicationComponentsService,
  ) {
    this.respuesta = new Respuesta<Paginacion<ListarPlanTrabajo>>();
    this.datatableInputs = new DatatableInput('Plan de trabajo',
      new Paginacion<any>());
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      idSemillero: [null],
      anio: ['',],
      estado: ['']
    });
    this.datosPlan = new Respuesta<PlanTrabajo>
  }
  ngOnDestroy(): void {
   // Liberar la suscripción para evitar memory leaks
   this.suscripciones.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
      this.formulario.get('idSemillero')?.setValue(this.idSemillero);
    });
    // Suscribirse al evento para actualizar la lista
  this.movePageEmitter.subscribe(() => {
    this.listarPlanesTrabajo();
  });
  this.suscribirseALasActualizaciones();
  }
  suscribirseALasActualizaciones() {
    // Suscribirse a las notificaciones de actualización para cada tipo
    this.suscripciones.push(
      this.actualizarListarService.actualizarListar$.subscribe((tipo: string) => {
        if (tipo == 'agregar') {

          this.mostrarCreaPlan = false;
          this.listarPlanesTrabajo();
        } else if ('actualizar') {


        } else if('cancelar'){
          this.mostrarCreaPlan = false;
          this.listarPlanesTrabajo();
        }

      })
    );

  }
  /*
    openModal(){
      const modalRef = this.modalService.open(CrearPlanModalComponent)
      modalRef.componentInstance.idSemillero = this.idSemillero;
    }*/
  toggleFormulario() {
    this.mostrarCreaPlan = !this.mostrarCreaPlan;
  }
  listarPlanesTrabajo(){
    //realiza la peticion para obtener los datos filtrados
    this.planTrabajoObtenerService.listarPlanTrabajo(
      this.formulario.value.pageNo, this.formulario.value.pageSize,
      this.formulario.value.anio, this.formulario.value.idSemillero,
      this.formulario.value.estado).subscribe({
        next: (respuesta) => {
          this.respuesta=respuesta;

          this.searchPerformed=true;
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        },
      });
  }
  editar(){
    console.log('entra al editar')
  }
  onsubmit() {
    this.mostrarCreaPlan = false;
    if (this.formulario.valid) {
      this.listarPlanesTrabajo();

    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
      // Lanzar un error
      //throw new Error('Formulario no válido');

    }
  }

  //borrar los datos ingresados en el filtro
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      idSemillero: [this.idSemillero],
      anio: [''],
      estado: ['']
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
    this.onsubmit();
  }
  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePageTable(newPage: string): void {
    if (newPage === 'atras') {
      // Enviar la disminucion del valor de la pagina al componente padre
      this.movePageEmitter.emit(-1);
    } else {
      // Enviar el incremento del valor de la pagina al componente padre
      this.movePageEmitter.emit(1);
    }
  }
  /**
   * Calcula el texto que indica qué elementos se están visualizando actualmente.
   * @param pageNumber El número de página actual.
   * @param pageSize El tamaño de página actual.
   * @param totalElements El número total de elementos.
   * @returns El texto que describe qué elementos se están visualizando.
   */
  calcularTextoVisualizacion(): string {
    let pageNumber = this.datatableInputs.paginacion.number + 1;
    let pageSize = this.datatableInputs.paginacion.size;
    let totalElements = this.datatableInputs.paginacion.totalElements;

    let elementosVisualizadosHasta = pageNumber * pageSize - (pageSize - 1);
    let elementosVisualizadosHastaFinal = Math.min(
      elementosVisualizadosHasta + pageSize - 1,
      totalElements
    );

    return (
      'Visualizando ' +
      elementosVisualizadosHasta +
      ' a ' +
      elementosVisualizadosHastaFinal +
      ' de ' +
      totalElements +
      ' Registros'
    );
  }
  /**
   * Genera un array de números de página basado en el número total de páginas.
   * @returns Un array de números de página.
   */
  getPageNumbers(): number[] {
    const totalPages = this.datatableInputs.paginacion.totalPages;
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}


//**********************************************************
      /*this.planTrabajoObtenerService.obtenerPlanTrabajoxAnio(
        this.formulario.value.pageNo,
        this.formulario.value.pageSize,
        this.formulario.value.anio,
        this.idSemillero,
        this.formulario.value.fechaInicio,
        this.formulario.value.fechaFin
      ).subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {

          this.idPlan = respuesta.data.content.length > 0 ? respuesta.data.content[0].idPlan : undefined;
          if (this.idPlan != undefined) {
            this.planTrabajoObtenerService.ObtenerPlanTrabajoxId(this.idPlan).subscribe({
              next: (respuesta) => {

                this.datosPlan= respuesta;
              },
              // Manejar errores
              error: (errorData) => {
                console.error(errorData);
              }
            });
          }

            // Actualizar la lista de actividades del plan con los datos obtenidos
            this.respuesta = respuesta;

          //actualiza el input del datatable
          this.datatableInputs.searchPerformed = true;
          this.datatableInputs.paginacion = respuesta.data;
          this.datatableInputs.tableHeaders = ['ID', 'Actividad', 'Producto', 'Fecha Inicio', 'Fecha Fin', 'Responsable'];
          this.datatableInputs.dataAttributes = [
            { name: 'id', type: Number },
            { name: 'actividad', type: String },
            { name: 'compromiso', type: String },
            { name: 'fechaInicio', type: String },
            { name: 'fechaFin', type: String },
            { name: 'responsable', type: String },
          ]

        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        },
        // Ejecutar acciones al completar la solicitud
        complete: () => { },
      });*/
