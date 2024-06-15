import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { Paginacion } from '../../../../../../service/common/model/paginacion';
import { SemilleroProgramaProyeccion } from '../../../../../../service/semilleros/domain/model/proyecciones/semilleroProgramaProyeccion';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SemilleroProgramasAdapter } from '../../../../../../service/academica/infraestructure/semillero-programa.adapter';
import { DatatableInput } from '../../../../../../service/common/model/datatableInput';
import { EnumTranslationService } from '../../../../../../service/common/enum-translation.service';
import { EliminarProgramaComponent } from '../eliminar-programa/eliminar-programa.component';

@Component({
  selector: 'app-listar-programas',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './listar-programas.component.html',
  styleUrl: './listar-programas.component.css'
})
export class ListarProgramasComponent implements OnInit {

  private changePageEmitter = new EventEmitter<number>();
  private movePageEmitter = new EventEmitter<number>();
  protected idSemillero!: string;
  protected idLinea!: number;
  private respuesta: Respuesta<Paginacion<SemilleroProgramaProyeccion>>;
  paginas: number[] = [2, 3, 5];
  protected formulario: FormGroup;
  protected mostrarCreaPrograma: boolean = false;
  protected datatableInputs: DatatableInput;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private semillleroProgramaAdapter: SemilleroProgramasAdapter,
    protected enumTranslationService: EnumTranslationService,
  ) {
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: [2],
      semilleroId: ['']
    });
    this.respuesta = new Respuesta<Paginacion<SemilleroProgramaProyeccion>>();
    this.datatableInputs = new DatatableInput('Programas',
      new Paginacion<SemilleroProgramaProyeccion>());
  }
  ngOnInit(): void {
    this.mostrarCreaPrograma=false;
    //obtener el id del semillero
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id']
    });
    this.formulario.get('semilleroId')?.setValue(this.idSemillero);
    console.log('llamar la lista de las programas');
    this.listarProgramas();
  }
  listarProgramas() {

    this.semillleroProgramaAdapter.obtenerProgramasxSemilleroId(this.formulario.value.semilleroId, this.formulario.value.pageNo, this.formulario.value.pageSize
    ).subscribe({
      next: (respuesta) => {
        console.log('programas ------------------')
        console.log(respuesta)
        // Actualizar la lista de programas con los datos obtenidos
        this.respuesta = respuesta;
        //actualiza el input del datatable
        this.datatableInputs.searchPerformed = true;
        this.datatableInputs.paginacion = this.respuesta.data;
        this.datatableInputs.tableHeaders = ['ID', 'Programa'];
        this.datatableInputs.dataAttributes = [
          { name: 'id', type: Number },
          { name: 'nombre', type: String },
        ];
      },
      // Manejar errores
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }
  onPageSizeChange() {
    this.mostrarCreaPrograma=false;
    const newPageSize = this.formulario.value.pageSize;
    this.listarProgramas(); // Empieza en la primera página
  }
  toggleFormulario() {
    this.mostrarCreaPrograma= !this.mostrarCreaPrograma;
  }
  eliminarPrograma(idPrograma:any){
    console.log('id de programa---'+idPrograma);
    const modalRef = this.modalService.open(EliminarProgramaComponent);
    modalRef.componentInstance.idPrograma = idPrograma;
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
    this.changePageEmitter.emit(pageNumber);
    this.changePageNew(pageNumber);
  }
  /**
   * Cambia la página de resultados de acuerdo al número de página especificado.
   * @param pageNumber El número de página al que se debe cambiar.
   */
  changePageNew(pageNumber: number): void {
    // Actualizar el valor de pageNo en el formulario
    this.formulario.get('pageNo')?.setValue(pageNumber);

    // Enviar el formulario para cargar los datos de la nueva página
    this.listarProgramas();
  }
  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePage(newPage: string):void {
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
    this.listarProgramas();
  }

}
