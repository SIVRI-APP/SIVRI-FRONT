import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatatableInput } from '../../../../../service/common/model/datatableInput';
import { Paginacion } from '../../../../../service/common/model/paginacion';
import { DatatableComponent } from '../../../../shared/datatable/datatable.component';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlanTrabajoObtenerService } from '../../../../../service/planTrabajo/domain/service/plan-trabajo-obtener.service';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { ObtenerPlanTrabajoxAnio } from '../../../../../service/planTrabajo/domain/model/proyecciones/obtenerPlanTrabajoxAnio';
import { EstadoPlantrabajo } from '../../../../../service/planTrabajo/domain/model/enum/EstadoPlanTrabajo';
import { PlanTrabajo } from '../../../../../service/planTrabajo/domain/model/proyecciones/planTrabajo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearPlanModalComponent } from '../crear-plan-modal/crear-plan-modal.component';
import { CrearPlanComponent } from '../crear-plan/crear-plan.component';

@Component({
  selector: 'app-listar-plan-trabajo',
  standalone: true,
  imports: [
    DatatableComponent,
    ReactiveFormsModule,
    RouterLink,
    CrearPlanComponent
  ],
  templateUrl: './listar-plan-trabajo.component.html',
  styleUrl: './listar-plan-trabajo.component.css'
})
export class ListarPlanTrabajoComponent implements OnInit {
  // Inyeccion de Modal
  //private modalService = inject(NgbModal);
  //campos que ayuda a la visualizacion
  protected idSemillero!: string;
  protected idPlan?: number;
  paginas: number[] = [2, 3, 5];
  protected formulario: FormGroup;
  protected respuesta: Respuesta<Paginacion<ObtenerPlanTrabajoxAnio>>;
  protected datatableInputs: DatatableInput;
  protected datosPlan: Respuesta<PlanTrabajo>
  protected mostrarCreaPlan: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService,
    private planTrabajoObtenerService: PlanTrabajoObtenerService
  ) {
    this.respuesta = new Respuesta<Paginacion<ObtenerPlanTrabajoxAnio>>();
    this.datatableInputs = new DatatableInput('Plan de trabajo',
      new Paginacion<any>());
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      anio: [, [Validators.required]],
      fechaInicio: undefined,
      fechaFin: undefined
    });
    this.datosPlan= new Respuesta<PlanTrabajo>
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];

    })
    console.log('id semillero-----------------------' + this.idSemillero);
  }
/*
  openModal(){
    const modalRef = this.modalService.open(CrearPlanModalComponent)
    modalRef.componentInstance.idSemillero = this.idSemillero;
  }*/
  toggleFormulario() {
    this.mostrarCreaPlan= !this.mostrarCreaPlan;
  }

  onsubmit() {
    this.mostrarCreaPlan=false;
    if (this.formulario.valid) {
      //realiza la peticion para obtener los datos filtrados
      this.planTrabajoObtenerService.obtenerPlanTrabajoxAnio(
        this.formulario.value.pageNo,
        this.formulario.value.pageSize,
        this.formulario.value.anio,
        this.idSemillero,
        this.formulario.value.fechaInicio,
        this.formulario.value.fechaFin
      ).subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          console.log('respuesta--------------')
          console.log(respuesta)
          this.idPlan = respuesta.data.content.length > 0 ? respuesta.data.content[0].idPlan : undefined;
          if (this.idPlan != undefined) {
            this.planTrabajoObtenerService.ObtenerPlanTrabajoxId(this.idPlan).subscribe({
              next: (respuesta) => {
                console.log('plan semillero---------------------')
                console.log(respuesta)
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
      });
    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
      // Lanzar un error
      //throw new Error('Formulario no válido');
      console.log('Formulario no valido')
    }
  }

  //borrar los datos ingresados en el filtro
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      anio: [],
      fechaInicio: undefined,
      fechaFin: undefined
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


