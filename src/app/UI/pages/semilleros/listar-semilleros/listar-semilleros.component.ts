import { Component } from '@angular/core';
import { SemilleroEstado } from '../../../../service/semilleros/domain/model/enum/semilleroEstado';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { SemilleroListarConFiltroxMentorProyeccion } from '../../../../service/semilleros/domain/model/proyecciones/semilleroListarConFIltroxMentorProyeccion';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { RouterLink } from '@angular/router';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { SemilleroObtenerService } from '../../../../service/semilleros/domain/service/semillero-obtener.service';
import { DatatableComponent } from '../../../shared/datatable/datatable.component';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';

@Component({
  selector: 'app-listar-semilleros',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    DatatableComponent
  ],
  templateUrl: './listar-semilleros.component.html',
  styleUrl: './listar-semilleros.component.css'
})
export class ListarSemillerosComponent {

  paginas: number[] = [10, 25, 50, 100];
  protected formulario: FormGroup;
  protected respuesta: Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>;
  protected datatableInputs: DatatableInput;
  protected estadoSemilleroEnum = SemilleroEstado;

  constructor(private semilleroObtenerService: SemilleroObtenerService,
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService
  ) {

    this.respuesta = new Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>();

    this.datatableInputs = new DatatableInput('Semilleros',
      new Paginacion<SemilleroListarConFiltroxMentorProyeccion>());

    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      idSemillero: [null],
      nombre: [''],
      estado: ['']
    });

  }

  onsubmit() {

    if (this.formulario.valid) {

      //realiza la peticion para obtener los datos filtrados
      this.semilleroObtenerService.listarConFiltro(
        this.formulario.value.idSemillero,
        this.formulario.value.pageNo,
        this.formulario.value.pageSize,
        this.formulario.value.nombre,
        this.formulario.value.estado
      ).subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          // Actualizar la lista de solicitudes de usuario con los datos obtenidos
          this.respuesta = respuesta;
          //actualiza el input del datatable
          this.datatableInputs.searchPerformed = true;
          this.datatableInputs.paginacion = this.respuesta.data;
          this.datatableInputs.tableHeaders = ['ID', 'Semillero', 'Estado'];
          this.datatableInputs.dataAttributes = [
            { name: 'semilleroId', type: Number },
            { name: 'nombre', type: String },
            { name: 'estado', type: SemilleroEstado }

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
      throw new Error('Formulario no válido');
    }
  }

  //borrar los datos ingresados en el filtro
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      idSemillero: [null],
      nombre: [''],
      estado: ['']
    })
    // Reiniciar la lista de usuarios solicitados
    this.respuesta = new Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>();
    this.datatableInputs = new DatatableInput('semilleros', new Paginacion<SemilleroListarConFiltroxMentorProyeccion>());
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

  //metodo que no permite el ingreso de punto y la letra e
  onKeyDown(event: KeyboardEvent) {
    const tecla = event.key;
    if (['.', ',', 'e'].includes(tecla)) {
      event.preventDefault();
    }
  }

}
