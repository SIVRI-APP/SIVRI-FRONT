import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SemilleroEstado } from '../../../../service/semilleros/domain/model/enum/semilleroEstado';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { ListarSemilleroosFuncionarioProyeccion } from '../../../../service/semilleros/domain/model/proyecciones/liatarSemillerosFuncionarioProyeccion';
import { SemilleroObtenerService } from '../../../../service/semilleros/domain/service/semillero-obtener.service';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { DatatableComponent } from '../../../shared/datatable/datatable.component';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CambiarEstadoSemilleroModalComponent } from '../cambiar-estado-semillero-modal/cambiar-estado-semillero-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-todos-semilleros',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    DatatableComponent
  ],
  templateUrl: './listar-todos-semilleros.component.html',
  styleUrl: './listar-todos-semilleros.component.css'
})
export class ListarTodosSemillerosComponent {
  @Output() movePageEmitter = new EventEmitter<number>();
  private changePageEmitter = new EventEmitter<number>();
  paginas: number[] = [10,25, 50, 100];
  protected formulario: FormGroup;
  protected datatableInputs: DatatableInput;
  protected estadoSemilleroEnum = SemilleroEstado;
  protected respuesta: Respuesta<Paginacion<ListarSemilleroosFuncionarioProyeccion>>

  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  constructor(
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService,
    private semilleroObtenerService:SemilleroObtenerService,

  ){
    this.respuesta = new Respuesta<Paginacion<ListarSemilleroosFuncionarioProyeccion>>();
    this.datatableInputs = new DatatableInput('Semilleros',
      new Paginacion<ListarSemilleroosFuncionarioProyeccion>());
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      nombre: [''],
      correo: [''],
      estado: ['']
    });
  }

  onsubmit(){
    if (this.formulario.valid){
      this.listarSemillerosFuncionario();
    }else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
      // Lanzar un error
      throw new Error('Formulario no válido');
    }
  }
  listarSemillerosFuncionario(){

    this.semilleroObtenerService.listarConFiltroFuncionario(
      this.formulario.value.pageNo,this.formulario.value.pageSize,
    this.formulario.value.nombre, this.formulario.value.correo, this.formulario.value.estado).subscribe({
      next:(respuesta)=>{

        this.respuesta = respuesta;
        //actualiza el input del datatable
        this.datatableInputs.searchPerformed = true;
        this.datatableInputs.paginacion = this.respuesta.data;
        this.datatableInputs.tableHeaders = ['ID','Semillero','Email','Fecha Creación', 'Estado'];
        this.datatableInputs.dataAttributes = [
          {name: 'semilleroId', type: Number},
          {name: 'nombre', type:String},
          {name: 'correo', type:String},
          {name: 'fechaCreacion', type:String},
          {name: 'estado',type: SemilleroEstado},
        ];
      },
      // Manejar errores
      error: (errorData) => {
        console.error(errorData);
      },
      // Ejecutar acciones al completar la solicitud
      complete: () => { },
    });
  }
  cambiarEstado(idSemillero:any){
    // Aquí supongamos que puedes obtener el estado actual del semillero desde tus datos
    const estadoSemillero = this.datatableInputs.paginacion.content.find(data => data.semilleroId == idSemillero)?.estado;
    //llamar la modal de cambiar el estado del semillero
    const modalRef = this.modalService.open(CambiarEstadoSemilleroModalComponent);
    modalRef.componentInstance.idSemillero = idSemillero;
    modalRef.componentInstance.estadoActual = estadoSemillero;
    modalRef.result.then((result) =>{
      if(result== 'actualizar'){
        this.listarSemillerosFuncionario();
      }
    })
  }
  limpiarCampos(){
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      nombre: [''],
      correo: [''],
      estado: ['']
    });
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
    this.onsubmit();
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

}
