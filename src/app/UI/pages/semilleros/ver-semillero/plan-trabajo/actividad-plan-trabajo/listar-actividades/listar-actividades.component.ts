import { Component, EventEmitter, Input, OnDestroy, OnInit, Output,  } from '@angular/core';
import { ActividadPlanObtenerService } from '../../../../../../../service/planTrabajo/domain/service/actividad-plan-obtener.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListarActividadPlan } from '../../../../../../../service/planTrabajo/domain/model/proyecciones/listarActividadPlan';
import { Paginacion } from '../../../../../../../service/common/model/paginacion';
import { Respuesta } from '../../../../../../../service/common/model/respuesta';
import { DatatableInput } from '../../../../../../../service/common/model/datatableInput';
import { EnumTranslationService } from '../../../../../../../service/common/enum-translation.service';
import { RouterLink } from '@angular/router';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component';
import { CommunicationComponentsService } from '../../../../../../../service/common/communication-components.service';
import { Subscription } from 'rxjs';
import { ActualizarActividadComponent } from '../actualizar-actividad/actualizar-actividad.component';

@Component({
  selector: 'app-listar-actividades',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CrearActividadComponent,
    ActualizarActividadComponent,
  ],
  templateUrl: './listar-actividades.component.html',
  styleUrl: './listar-actividades.component.css'
})
export class ListarActividadesComponent implements OnInit,OnDestroy {
  paginas: number[] = [2, 3, 5];
  private changePageEmitter = new EventEmitter<number>();
  @Input() idPlan!: number;
  protected idActividad!: number;
  protected datatableInputs: DatatableInput;
  protected formulario: FormGroup;
  private suscripciones: Subscription[]=[];
  protected respuesta: Respuesta<Paginacion<ListarActividadPlan>>;
  @Output() movePageEmitter = new EventEmitter<number>();
  protected mostrarCreaActividad: boolean = false;
  protected mostrarEditarActividad: boolean = false;
  constructor(
    private actualizarListarService: CommunicationComponentsService,
    private formBuilder: FormBuilder,
    private actividadPlanObtenerService: ActividadPlanObtenerService,
    protected enumTranslationService: EnumTranslationService,
  ){
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      fechaInicio: [null],
      fechaFin: [null]
    });
    this.respuesta= new Respuesta<Paginacion<ListarActividadPlan>>();
    this.datatableInputs = new DatatableInput('Actividad del plan de trabajo',
      new Paginacion<any>());
  }
  ngOnDestroy(): void {
    // Liberar la suscripción para evitar memory leaks
    this.suscripciones.forEach(subcription => subcription.unsubscribe());
  }
  ngOnInit(): void {
    this.mostrarCreaActividad=false;
    this.listarActividadesxplan();
    this.suscribirseALasActualizaciones();
  }

  listarActividadesxplan(){
    //console.log(this.formulario)
    this.actividadPlanObtenerService.listarActividadxPlan(
      this.idPlan,this.formulario.value.pageNo,
      this.formulario.value.pageSize,this.formulario.value.fechaInicio,
      this.formulario.value.fechaFin
    ).subscribe({
      next:(respuesta)=>{
        //console.log('respuesta de la lista de actividades')
        //console.log(respuesta);
        // Actualizar la lista de actividades del plan con los datos obtenidos
        this.respuesta=respuesta;
        this.datatableInputs.searchPerformed = true;
        this.datatableInputs.paginacion = this.respuesta.data;
        this.datatableInputs.tableHeaders = ['ID','Actividad','Compromiso','Fecha Inicio','Fecha Fin','Responsable'];
        this.datatableInputs.dataAttributes = [
          {name:'id',type:Number},
          {name:'actividad',type:String},
          {name:'compromiso',type:String},
          {name:'fechaInicio',type:String},
          {name:'fechaFin',type:String},
          {name:'responsable',type:String},
        ];

      },
      // Manejar errores
      error: (errorData) => {
        console.error(errorData);
      },
    });
  }
  suscribirseALasActualizaciones(){
    // Suscribirse a las notificaciones de actualización para cada tipo
    this.suscripciones.push(
      this.actualizarListarService.actualizarListar$.subscribe((tipo: string) =>{
        if(tipo=='agregar'){
          this.mostrarCreaActividad=false;
        } else if(tipo=='actualizar'){
          this.mostrarEditarActividad=false;
        } else if(tipo=='cancelado'){
          this.mostrarEditarActividad=false;
        }
        this.listarActividadesxplan();
      })
    );
  }
  toggleFormulario() {
    this.mostrarCreaActividad= !this.mostrarCreaActividad;
  }
  editarActividad(idActividad: number){
   // console.log(`Editar actividad con ID: ${idActividad}`);
    this.idActividad = idActividad;
    this.mostrarCreaActividad = false;
    this.mostrarEditarActividad = true;
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
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePage(newPage: string): void {
    if (newPage === 'atras') {
        // Enviar la disminucion del valor de la pagina al componente padre
        this.movePageEmitter.emit(-1);
        this.movePageNew(-1);
    } else {
      // Enviar el incremento del valor de la pagina al componente padre
      this.movePageEmitter.emit(1);
      this.movePageNew(1);
    }
  }
  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePageNew(newPage: number): void {
    // Realizar incremento o decremento de la Pagina
    this.formulario
      .get('pageNo')
      ?.setValue((this.formulario.get('pageNo')?.value ?? 0) + newPage);

    // Enviar el formulario para cargar los datos de la nueva página
    //this.listarLineas();
    this.listarActividadesxplan();
  }

  /**
   * Genera un array de números de página basado en el número total de páginas.
   * @returns Un array de números de página.
   */
  getPageNumbers(): number[] {
    const totalPages = this.datatableInputs.paginacion.totalPages;
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  /**
     * Cambia la página de resultados de acuerdo al número de página especificado.
     * @param pageNumber El número de página al que se debe cambiar.
     */
  changePage(pageNumber: number): void {
    // Asegurarse de que newPage no sea menor que 0
    const nextPage = Math.max(pageNumber - 1, 0);

    // Enviar el valor de la nueva pagina al componente padre
    this.changePageEmitter.emit(nextPage);
    this.changePageNew(nextPage);
  }
  /**
     * Cambia la página de resultados de acuerdo al número de página especificado.
     * @param pageNumber El número de página al que se debe cambiar.
     */
  changePageNew(pageNumber: number): void {
    // Actualizar el valor de pageNo en el formulario
    this.formulario.get('pageNo')?.setValue(pageNumber);

    // Enviar el formulario para cargar los datos de la nueva página
   this.listarActividadesxplan();
  }
}
