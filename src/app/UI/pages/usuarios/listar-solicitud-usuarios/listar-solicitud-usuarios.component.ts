import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioSolicitudObtenerService } from '../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudObtener.service';
import { UsuarioSolicitudListarConFiltroProyeccion } from '../../../../service/solicitudUsuarios/domain/model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { TipoDocumento } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { TipoUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { EstadoSolicitudUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/estadoSolicitudUsuario';
import { DatatableComponent } from '../../../shared/datatable/datatable.component';
import { DatatableInput } from '../../../../service/common/model/datatableInput';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, DatatableComponent],
  templateUrl: './listar-solicitud-usuarios.component.html',
  styleUrl: './listar-solicitud-usuarios.component.css',
})
export class ListarSolicitudUsuariosComponent {

  protected formulario: FormGroup;
  protected datos: Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>
  protected datatableInputs: DatatableInput;

  constructor(private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService) {
    this.datos = new Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>();

    this.formulario = new FormGroup({
      pageNo: new FormControl(0),
      pageSize: new FormControl('10'),
      correo: new FormControl(''),
      estado: new FormControl(''),
      tipoDocumento: new FormControl(''),
      numeroDocumento: new FormControl(''),
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      tipoUsuario: new FormControl(''),
    });

    this.datatableInputs = new DatatableInput(
      'Solicitud Usuarios',
      new Paginacion<UsuarioSolicitudListarConFiltroProyeccion>()
    );
  }

  tipoDocumentoEnum = TipoDocumento;
  tipoUsuarioEnum = TipoUsuario;
  estadoSolicitudUsuarioEnum = EstadoSolicitudUsuario;

  getKeys(enumObject: any): string[] {
    return Object.keys(enumObject);
  }

  getValueByKey(enumObject: any, key: string): string {
    return enumObject[key];
  }

  /**
   * Maneja el envío del formulario de búsqueda de solicitudes de usuario.
   *
   * Si el formulario es válido, realiza una solicitud para obtener los datos filtrados.
   * Actualiza la lista de solicitudes de usuario y el texto de visualización en consecuencia.
   *
   * Si el formulario no es válido, marca todos los campos como tocados y lanza un error.
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      // Obtener los valores del formulario
      const formValues = this.obtenerValoresFormulario();

      // Realizar solicitud para obtener los datos filtrados
      this.usuarioSolicitudObtenerService
        .listarConFiltro(
          formValues.pageNo,
          formValues.pageSize,
          formValues.correo,
          formValues.estado,
          formValues.tipoDocumento,
          formValues.numeroDocumento,
          formValues.nombres,
          formValues.apellidos,
          formValues.tipoUsuario
        )
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            // Actualizar la lista de solicitudes de usuario con los datos obtenidos
            this.datos = respuesta;
            
            // Actualiar el Input del datatable
            this.datatableInputs.searchPerformed = true;
            this.datatableInputs.paginacion = this.datos.data;
            this.datatableInputs.tableHeaders = ['ID', 'Correo', 'Nombre', 'Apellido', 'Tipo Documento', 'Numero Documento', 'Tipo Usuario', 'Estado'];
            this.datatableInputs.dataAttributes = [
              {name:'id', type:String}, 
              {name:'correo', type:String}, 
              {name:'nombre', type:String}, 
              {name:'apellido', type:String}, 
              {name:'tipoDocumento', type:TipoDocumento}, 
              {name:'numeroDocumento', type:String}, 
              {name:'tipoUsuario', type:TipoUsuario}, 
              {name:'estado', type:EstadoSolicitudUsuario}
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
      this.formulario.markAllAsTouched();
      // Lanzar un error
      throw new Error('Formulario no válido');
    }
  }

  /**
   * Obtiene los valores del formulario de búsqueda de solicitudes de usuario.
   *
   * @returns Un objeto que contiene los valores de los campos del formulario.
   *          - pageNo: El número de página.
   *          - pageSize: El tamaño de la página.
   *          - correo: El valor del campo "correo".
   *          - estado: El valor del campo "estado".
   *          - tipoDocumento: El valor del campo "tipoDocumento" como TipoDocumento enum.
   *          - numeroDocumento: El valor del campo "numeroDocumento".
   *          - nombres: El valor del campo "nombres".
   *          - apellidos: El valor del campo "apellidos".
   *          - tipoUsuario: El valor del campo "tipoUsuario" como TipoUsuario enum.
   */
  private obtenerValoresFormulario(): {
    pageNo: number;
    pageSize: number;
    correo?: string;
    estado?: string;
    tipoDocumento?: string;
    numeroDocumento?: string;
    nombres?: string;
    apellidos?: string;
    tipoUsuario?: string;
  } {
    // Captura de los valores del formulario
    const pageNo = this.formulario.get('pageNo')?.value ?? 0;
    const pageSize = parseInt(
      this.formulario.get('pageSize')?.value ?? '10',
      10
    );
    const correo = this.formulario.get('correo')?.value ?? undefined;
    const estado = this.formulario.get('estado')?.value ?? undefined;
    const tipoDocumento = this.formulario.get('tipoDocumento')?.value ?? undefined;
    const numeroDocumento = this.formulario.get('numeroDocumento')?.value ?? undefined;
    const nombres = this.formulario.get('nombres')?.value ?? undefined;
    const apellidos = this.formulario.get('apellidos')?.value ?? undefined;
    const tipoUsuario = this.formulario.get('tipoUsuario')?.value ?? undefined;

    // Devuelve un objeto con los valores capturados del formulario
    return {
      pageNo,
      pageSize,
      correo,
      estado,
      tipoDocumento,
      numeroDocumento,
      nombres,
      apellidos,
      tipoUsuario,
    };
  }

  /**
   * Restablece todos los campos del formulario a sus valores iniciales y reinicia la paginación.
   */
  limpiarCampos(): void {
    // Restablecer los campos del formulario
    this.formulario.reset();

    // Establecer el número de página en 0 y el tamaño de página en 1
    this.formulario.get('pageNo')?.setValue(0);
    this.formulario.get('pageSize')?.setValue('10');

    // Restablecer el estado inicial de los selectores
    this.restaurarEstadoInicialSelect('estado', '#estado');
    this.restaurarEstadoInicialSelect('tipoDocumento', '#tipo_documento');
    this.restaurarEstadoInicialSelect('tipoUsuario', '#tipo_usuario');

    // Reiniciar la lista de usuarios solicitados
    this.datos = new Respuesta<
      Paginacion<UsuarioSolicitudListarConFiltroProyeccion>
    >();
  }

  /**
   * Restablece el estado inicial de un selector dado.
   * @param controlName El nombre del control del formulario.
   * @param selector El selector CSS del elemento del DOM.
   */
  restaurarEstadoInicialSelect(controlName: string, selector: string): void {
    const control = this.formulario.get(controlName);
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
    this.formulario.get('pageNo')?.setValue(pageNumber);

    // Enviar el formulario para cargar los datos de la nueva página
    this.onSubmit();
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
    this.onSubmit();
  }
}
