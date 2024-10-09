import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LineaInvestigacionObtenerService } from '../../../../../../service/semilleros/domain/service/linea-investigacion-obtener.service';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { LineaInvestigacionProyeccion } from '../../../../../../service/semilleros/domain/model/proyecciones/lineaInvestigacionProyeccion';
import { Paginacion } from '../../../../../../service/common/model/paginacion';
import { DatatableInput } from '../../../../../../service/common/model/datatableInput';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrearLineaComponent } from '../crear-linea/crear-linea.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarLineaModalComponent } from '../eliminar-linea-modal/eliminar-linea-modal.component';
import { Subscription } from 'rxjs';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';
import { InformacionUsuarioAutenticadoService } from '../../../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-listar-lineas',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CrearLineaComponent
  ],
  templateUrl: './listar-lineas.component.html',
  styleUrl: './listar-lineas.component.css'
})
export class ListarLineasComponent implements OnInit,OnDestroy {
  @Output() movePageEmitter = new EventEmitter<number>();
  private changePageEmitter = new EventEmitter<number>();
  private suscripciones: Subscription[]=[];
  protected idSemillero!: string;
  protected idLinea!:number;
  protected datatableInputs: DatatableInput;
  private respuesta: Respuesta<Paginacion<LineaInvestigacionProyeccion>>;
  paginas: number[] = [2, 3, 5];
  protected formulario: FormGroup;
  protected mostrarCreaLinea: boolean = false;
  protected mostrarBtnCrearLinea: boolean=false;
  protected funcionarioSemillero: boolean=false;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  private roles: string[]=[];
  constructor(
    private actualizarListarService: CommunicationComponentsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private lineaInvestigacionObtenerService: LineaInvestigacionObtenerService,
    protected enumTranslationService: EnumTranslationService,
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ){
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: [2],
      semilleroId:['']
    });
    this.roles= informacionUsuarioAutenticadoService.retornarRoles();
    this.mostrarBtnCrearLinea=this.roles.includes('GRUPO:DIRECTOR');
    this.funcionarioSemillero=this.roles.includes('FUNCIONARIO:SEMILLEROS');
    this.respuesta=new Respuesta<Paginacion<LineaInvestigacionProyeccion>>();
    this.datatableInputs = new DatatableInput('Lineas',
      new Paginacion<LineaInvestigacionProyeccion>());
  }
  ngOnDestroy(): void {
    // Liberar la suscripción para evitar memory leaks
    this.suscripciones.forEach(subcription => subcription.unsubscribe());
  }

  ngOnInit(): void {
    //obtener el id del semillero
    this.mostrarCreaLinea=false;
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id']
    });
    this.formulario.get('semilleroId')?.setValue(this.idSemillero);
    this.listarLineas();
   this.suscribirseALasActualizaciones();
  }
  onPageSizeChange() {
    this.mostrarCreaLinea=false;
    const newPageSize = this.formulario.value.pageSize;
    this.listarLineas(); // Empieza en la primera página
  }
  listarLineas(){

    this.lineaInvestigacionObtenerService.obtenerLineasPaginadoxSemilleroId(
      this.formulario.value.semilleroId,this.formulario.value.pageNo,this.formulario.value.pageSize
    ).subscribe({
      next:(respuesta)=>{
        this.respuesta=respuesta;
        this.datatableInputs.searchPerformed = true;
        this.datatableInputs.paginacion = this.respuesta.data;
        this.datatableInputs.tableHeaders= ['ID','Linea Investiación'];
        this.datatableInputs.dataAttributes = [
          {name:'id',type:Number},
          {name:'linea',type:String}
        ];
      },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
    });

  }
  suscribirseALasActualizaciones(){
    // Suscribirse a las notificaciones de actualización para cada tipo
    this.suscripciones.push(
      this.actualizarListarService.actualizarListar$.subscribe((tipo:string)=>{
        if(tipo=='agregar'){
          this.mostrarCreaLinea=false;
        }else if(tipo=='cancelar'){
          this.mostrarCreaLinea=false;
        }
        this.listarLineas( );
      })
    );
  }
  toggleFormulario() {
    this.mostrarCreaLinea= !this.mostrarCreaLinea;
  }
  eliminarLinea(idLinea:any){
    //llamar la modal de eliminar
    const modalRef = this.modalService.open(EliminarLineaModalComponent);
    modalRef.componentInstance.idLinea = idLinea;
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
    this.listarLineas();
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
    this.listarLineas();
  }

}
