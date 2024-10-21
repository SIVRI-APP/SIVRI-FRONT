import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableInput } from '../../../service/common/model/datatableInput';
import { RouterLink } from '@angular/router';
import { EnumTranslationService } from '../../../service/common/enum-translation.service';
import { DatatableInputAction } from '../../../service/common/model/datatableAction';

@Component({
  selector: 'app-datatable-custom',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './datatable-custom.component.html',
  styleUrl: './datatable-custom.component.css'
})
export class DatatableCustomComponent{

  @Input() datatableInputs: DatatableInput = new DatatableInput();
  @Output() accionEmitter = new EventEmitter<any>();
  @Output() changePageEmitter = new EventEmitter<number>();
  @Output() movePageEmitter = new EventEmitter<number>();

  constructor(
    protected enumTranslationService: EnumTranslationService
  ){}

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
  }

  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePage(newPage: string): void {
    if (newPage === 'atras') {
        // Enviar la disminucion del valor de la pagina al componente padre
        this.movePageEmitter.emit(-1);
    } else {
      // Enviar el incremento del valor de la pagina al componente padre
      this.movePageEmitter.emit(1);
    }
  }

  ejecutarAccion(accion: DatatableInputAction, data:any): void{
    this.accionEmitter.emit({accion, data});
  }

  ejecutarAccionPrincipal(data:any): void{
    this.accionEmitter.emit(data);
  }
}
