import { Component } from '@angular/core';
import { SemilleroEstado } from '../../../../service/semilleros/domain/model/enum/semilleroEstado';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { SemilleroListarConFiltroxMentorProyeccion } from '../../../../service/semilleros/domain/model/proyecciones/semilleroListarConFIltroxMentorProyeccion';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { RouterLink } from '@angular/router';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { SemilleroObtenerService } from '../../../../service/semilleros/service/semillero-obtener.service';
import { DatatableComponent } from '../../../shared/datatable/datatable.component';

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

  estadoSemilleroEnum = SemilleroEstado;
  paginas: number[] = [2, 3, 5];
  protected formularioFiltro: FormGroup;
  protected datos: Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>;
  protected datatableInputs: DatatableInput

  constructor(private semilleroObtenerService: SemilleroObtenerService) {
    this.datos = new Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>();
    this.formularioFiltro = new FormGroup({
      pageNo: new FormControl(0),
      pageSize: new FormControl('2'),
      idSemillero: new FormControl(null),
      idUsuario: new FormControl(null),
      nombre: new FormControl(""),
      estado: new FormControl("")
    });

    this.datatableInputs = new DatatableInput('Semilleros',
      new Paginacion<SemilleroListarConFiltroxMentorProyeccion>());
  }

  onsubmit() {
    console.log(this.obtenerDatosFormulario());
    if (this.formularioFiltro.valid) {
      console.log("el for es valido")
      //obtener los valores del formulario
      const formValues = this.obtenerDatosFormulario();
      //realiza la peticion para obtener los datos filtrados
      this.semilleroObtenerService.listarConFiltro(
        formValues.pageNo,
        formValues.pageSize,
        formValues.idSemillero, formValues.idUsuario,
        formValues.nombre, formValues.estado
      ).subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          console.log("Respuesta ------------------------")
          console.log(respuesta)
          // Actualizar la lista de solicitudes de usuario con los datos obtenidos
          this.datos = respuesta;
          console.log("datos"+JSON.stringify(this.datos))
          this.datatableInputs.searchPerformed = true;
          this.datatableInputs.paginacion = this.datos.data;
          this.datatableInputs.tableHeaders = ['ID', 'Semillero', 'Estado'];
          this.datatableInputs.dataAttributes = [
            {name:'idSemillero',type:Number},
            {name:'nombre', type:String},
            {name:'estado', type:String}
          ]
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        },
        // Ejecutar acciones al completar la solicitud
        complete: () => {},
      });
    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formularioFiltro.markAllAsTouched();
      // Lanzar un error
      throw new Error('Formulario no válido');
    }
  }

  getKeys(enumObject: any): string[] {
    return Object.keys(enumObject);
  }

  getValueByKey(enumObject: any, key: string): string {
    return enumObject[key];
  }

  private obtenerDatosFormulario(): {
    pageNo: number;
    pageSize: number;
    idSemillero: number;
    idUsuario: number;
    nombre: string;
    estado: string;
  } {
    //toma los valores de los campos de las vistas
    const pageNo = this.formularioFiltro.get('pageNo')?.value ?? 0;
    const pageSize = parseInt(
      this.formularioFiltro.get('pageSize')?.value ?? '2', 10
    );
    const idSemillero = this.formularioFiltro.get('idSemillero')?.value ?? null;
    //el idusuario lo debo obtener del login
    const idUsuario = 3;
    const nombre = this.formularioFiltro.get('nombre')?.value ?? undefined;
    const estado = this.formularioFiltro.get('estado')?.value ?? undefined;
    return {
      pageNo,
      pageSize,
      idSemillero,
      idUsuario,
      nombre,
      estado
    }
  }
  //borrar los datos ingresados en el filtro
  limpiarCampos(): void {
    //restablece datos
    this.formularioFiltro.reset();

    // Establecer el número de página en 0 y el tamaño de página en 1
    this.formularioFiltro.get('pageNo')?.setValue(0);
    this.formularioFiltro.get('pageSize')?.setValue('2');

    // Restablecer el estado inicial de los selectores
    this.restaurarEstadoInicialSelect('estado', '#estado');

    // Reiniciar la lista de usuarios solicitados
    this.datos = new Respuesta<Paginacion<SemilleroListarConFiltroxMentorProyeccion>>();
  }

  /**
   * Restablece el estado inicial de un selector dado.
   * @param controlName El nombre del control del formulario.
   * @param selector El selector CSS del elemento del DOM.
   */
  restaurarEstadoInicialSelect(controlName: string, selector: string): void {
    const control = this.formularioFiltro.get(controlName);
    if (control) {
      // Restablecer el valor del control a vacío
      control.setValue('');
      // Restablecer el estado inicial del elemento del DOM
      const option = document.querySelector(`${selector} option[value=""]`);
      if (option) {
        option.setAttribute('disabled', 'true');
        option.setAttribute('selected', 'true');
        option.setAttribute('hidden', 'true');
      }
    }
  }

  /**
   * Cambia la página de resultados de acuerdo al número de página especificado.
   * @param pageNumber El número de página al que se debe cambiar.
   */
  changePage(pageNumber: number): void {
    // Actualizar el valor de pageNo en el formulario
    this.formularioFiltro.get('pageNo')?.setValue(pageNumber);

    // Enviar el formulario para cargar los datos de la nueva página
    this.onsubmit();
  }

  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePage(newPage: number): void {
    // Realizar incremento o decremento de la Pagina
    this.formularioFiltro
      .get('pageNo')
      ?.setValue((this.formularioFiltro.get('pageNo')?.value ?? 0) + newPage);

    // Enviar el formulario para cargar los datos de la nueva página
    this.onsubmit();
  }
}
