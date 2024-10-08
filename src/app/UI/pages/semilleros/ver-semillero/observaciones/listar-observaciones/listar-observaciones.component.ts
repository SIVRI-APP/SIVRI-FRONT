import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListarObservacionSemilleroProyeccion } from '../../../../../../service/semilleros/domain/model/proyecciones/listarObservacionSemilleroProyeccion';
import { Paginacion } from '../../../../../../service/common/model/paginacion';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { SemilleroObservacionObtenerService } from '../../../../../../service/semilleros/domain/service/semillero-observacion-obtener.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatatableInput } from '../../../../../../service/common/model/datatableInput';
import { DatatableComponent } from '../../../../../shared/datatable/datatable.component';
import { CrearObservacionComponent } from '../crear-observacion/crear-observacion.component';
import { Subscription } from 'rxjs';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { InformacionUsuarioAutenticadoService } from '../../../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-listar-observaciones',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    DatatableComponent,
    CrearObservacionComponent,
  ],
  templateUrl: './listar-observaciones.component.html',
  styleUrl: './listar-observaciones.component.css'
})
export class ListarObservacionesComponent implements OnInit,OnDestroy {
  @Output() movePageEmitter = new EventEmitter<number>();
  private changePageEmitter = new EventEmitter<number>();
  paginas: number[] = [2, 3, 5];
  protected idSemillero!: string;
  protected formulario: FormGroup;
  protected datatableInputs: DatatableInput;
  protected respuesta: Respuesta<Paginacion<ListarObservacionSemilleroProyeccion>>;
  protected mostrarFormularioCrear: boolean = false;
  protected mostrarCrearObservacion: boolean=false;
  private suscripciones: Subscription[]=[];
  private roles: string[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private semilleroObservacionObtenerService: SemilleroObservacionObtenerService,
    private actualizarListarService: CommunicationComponentsService,
    protected enumTranslationService: EnumTranslationService,
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ){
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      idSemillero: [''],

    });
    this.roles=informacionUsuarioAutenticadoService.retornarRoles();
    this.mostrarCrearObservacion=this.roles.includes('FUNCIONARIO:SEMILLEROS');
    this.respuesta = new Respuesta<Paginacion<ListarObservacionSemilleroProyeccion>>();
    this.datatableInputs = new DatatableInput('Observaciones',new Paginacion<ListarObservacionSemilleroProyeccion>);
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
      this.formulario.get('idSemillero')?.setValue(this.idSemillero);
    });
    this.listarObservaciones();
    this.suscribirseALasActualizaciones();
  }
  ngOnDestroy(): void {
    // Liberar la suscripción para evitar memory leaks
    this.suscripciones.forEach(subcription => subcription.unsubscribe());
  }
  listarObservaciones(){
    //llama al servicio de consultar observaciones
    this.semilleroObservacionObtenerService.obtenerObservacionxSemilleroId(
      this.formulario.value.idSemillero,this.formulario.value.pageNo,this.formulario.value.pageSize
    ).subscribe({
      next:(respuesta)=>{
        this.respuesta=respuesta;
        this.datatableInputs.searchPerformed = true;
        this.datatableInputs.paginacion = this.respuesta.data;
        this.datatableInputs.tableHeaders= ['ID','Observacion','Funcionario','Fecha'];
        this.datatableInputs.dataAttributes = [
          {name:'id',type:Number},
          {name:'observacion',type:String},
          {name:'usuario',type:String},
          {name:'fecha',type:String}
        ];
      },
      // Manejar errores
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }
  toggleFormulario(){
    this.mostrarFormularioCrear= !this.mostrarFormularioCrear;
  }
  suscribirseALasActualizaciones(){
    // Suscribirse a las notificaciones de actualización para cada tipo
    this.suscripciones.push(
      this.actualizarListarService.actualizarListar$.subscribe((tipo:string)=>{
        if(tipo=='agregar'){
          this.mostrarFormularioCrear=false;
          this.listarObservaciones();
        }else if(tipo=='cancelar'){
          this.mostrarFormularioCrear=false;
          this.listarObservaciones();
        }

      })
    );
  }
  onPageSizeChange(){
    this.mostrarFormularioCrear=false;
     this.listarObservaciones();
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
    this.listarObservaciones();
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
    this.listarObservaciones();
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
