import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { ActividadPlanObtenerService } from '../../../../../../../service/planTrabajo/domain/service/actividad-plan-obtener.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListarActividadPlan } from '../../../../../../../service/planTrabajo/domain/model/proyecciones/listarActividadPlan';
import { Paginacion } from '../../../../../../../service/common/model/paginacion';
import { Respuesta } from '../../../../../../../service/common/model/respuesta';
import { DatatableInput } from '../../../../../../../service/common/model/datatableInput';
import { EnumTranslationService } from '../../../../../../../service/common/enum-translation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-actividades',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './listar-actividades.component.html',
  styleUrl: './listar-actividades.component.css'
})
export class ListarActividadesComponent implements OnInit {
  paginas: number[] = [2, 3, 5];
  @Input() idPlan!: number;
  protected datatableInputs: DatatableInput;
  protected formulario: FormGroup;
  protected respuesta: Respuesta<Paginacion<ListarActividadPlan>>;
  @Output() movePageEmitter = new EventEmitter<number>();
  constructor(
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
  ngOnInit(): void {
     this.listarActividadesxplan();
  }

  listarActividadesxplan(){
    console.log(this.formulario)
    this.actividadPlanObtenerService.listarActividadxPlan(
      this.idPlan,this.formulario.value.pageNo,
      this.formulario.value.pageSize,this.formulario.value.fechaInicio,
      this.formulario.value.fechaFin
    ).subscribe({
      next:(respuesta)=>{
        console.log('respuesta de la lista de actividades')
        console.log(respuesta);
        // Actualizar la lista de actividades del plan con los datos obtenidos
        this.respuesta=respuesta;
        //actualiza el input del datatable
        this.datatableInputs.searchPerformed = true;
        this.datatableInputs.paginacion = respuesta.data;
        this.datatableInputs.tableHeaders =['ID','Actividad','Producto','Fecha Inicio','Fecha Fin','Responsable','Objetivo'];
        this.datatableInputs.dataAttributes =[
          {name:'id',type:Number},
          {name:'actividad',type:String},
          {name:'compromiso',type:String},
          {name:'fechaInicio',type:String},
          {name:'fechaFin',type:String},
          {name:'responsable',type:String},
          {name:'objetivo',type:String},
        ];

      },
      // Manejar errores
      error: (errorData) => {
        console.error(errorData);
      },
    });
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
    // Actualizar el valor de pageNo en el formulario
    this.formulario.get('pageNo')?.setValue(pageNumber);

    // Enviar el formulario para cargar los datos de la nueva página
   // this.onsubmit();
   this.listarActividadesxplan();
  }
}
