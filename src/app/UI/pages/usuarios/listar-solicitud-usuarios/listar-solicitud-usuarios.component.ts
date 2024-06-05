import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, DatatableComponent],
  templateUrl: './listar-solicitud-usuarios.component.html',
  styleUrl: './listar-solicitud-usuarios.component.css',
})
export class ListarSolicitudUsuariosComponent implements OnInit{

  // Enumeraciones que llenan los select
  protected tipoDocumentoEnum = TipoDocumento;
  protected tipoUsuarioEnum = TipoUsuario;
  protected estadoSolicitudUsuarioEnum = EstadoSolicitudUsuario;
  // Formulario reactivo
  protected formulario: FormGroup;
  // Respuesta del Back
  protected respuesta: Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>
  // Informacion del Datatable
  protected datatableInputs: DatatableInput;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService,
    protected enumTranslationService: EnumTranslationService
  ) {
    this.respuesta = new Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProyeccion>>();

    // Inicialización de los datos que construyen el datatable
    this.datatableInputs = new DatatableInput(
      'Solicitud Usuarios',
      new Paginacion<UsuarioSolicitudListarConFiltroProyeccion>()
    );

    // Inicialización del formulario reactivo
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      correo: [''],
      estado: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
      nombres: [''],
      apellidos: [''],
      tipoUsuario: ['']
    });
  }

  ngOnInit(): void {
    this.usuarioSolicitudObtenerService.getSolicitudUsuarioListarConFilrtro()
      .subscribe({
        next: (respuesta) => {
          this.respuesta = respuesta;

          // Actualiar el Input del datatable
          this.datatableInputs.searchPerformed = true;
          this.datatableInputs.paginacion = this.respuesta.data;
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
        }
      })

    this.formulario = this.usuarioSolicitudObtenerService.getFormularioListarConFiltro();
  }

  /**
   * Maneja el envío del formulario de búsqueda de solicitudes de usuario.
   *
   * Si el formulario es válido, realiza una solicitud para obtener la respuesta.
   * Actualiza la lista de solicitudes de usuario y el texto de visualización en consecuencia.
   *
   * Si el formulario no es válido, marca todos los campos como tocados y lanza un error.
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {

      //Guardamos el estado actual del formulario
      this.usuarioSolicitudObtenerService.setFormularioListarConFiltro(this.formulario)
      // Realizar solicitud para obtener la respuesta
      this.usuarioSolicitudObtenerService
        .listarConFiltro(
          this.formulario.value.pageNo,
          this.formulario.value.pageSize,
          this.formulario.value.correo,
          this.formulario.value.estado,
          this.formulario.value.tipoDocumento,
          this.formulario.value.numeroDocumento,
          this.formulario.value.nombres,
          this.formulario.value.apellidos,
          this.formulario.value.tipoUsuario
        )
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            // Actualizar la lista de solicitudes de usuario con los datos obtenidos
            this.respuesta = respuesta;
            
            // Actualiar el Input del datatable
            this.datatableInputs.searchPerformed = true;
            this.datatableInputs.paginacion = this.respuesta.data;
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
   * Restablece todos los campos del formulario a sus valores iniciales y reinicia la paginación.
   */
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      correo: [''],
      estado: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
      nombres: [''],
      apellidos: [''],
      tipoUsuario: ['']
    });

    // Reiniciar la lista de usuarios solicitados
    this.respuesta = new Respuesta<
      Paginacion<UsuarioSolicitudListarConFiltroProyeccion>
    >();

    this.datatableInputs = new DatatableInput(
      'Solicitud Usuarios',
      new Paginacion<UsuarioSolicitudListarConFiltroProyeccion>()
    );

    this.usuarioSolicitudObtenerService.limpiarSolicitudUsuarioListarConFilrtro();

    //Guardamos el estado actual del formulario
    this.usuarioSolicitudObtenerService.setFormularioListarConFiltro(this.formulario)
  }

  /**
   * Cambia la página de resultados de acuerdo al número de página especificado.
   * @param pageNumber El número de página al que se debe cambiar.
   */
  changePage(pageNumber: number): void {
    // Actualizar el valor de pageNo en el formulario
    this.formulario.get('pageNo')?.setValue(pageNumber - 1 );

    // Enviar el formulario para cargar los respuesta de la nueva página
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

    // Enviar el formulario para cargar los respuesta de la nueva página
    this.onSubmit();
  }
}
