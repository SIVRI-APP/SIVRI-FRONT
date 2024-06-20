import { Component, OnInit } from '@angular/core';
import { TipoFinanciacion } from '../../../../service/convocatoria/domain/model/enum/tipoFinanciacion';
import { ConvocatoriaEstado } from '../../../../service/convocatoria/domain/model/enum/convocatoriaEstado';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { ConvocatoriaListarConFiltroProyeccion } from '../../../../service/convocatoria/domain/model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { ConvocatoriaObtenerService } from '../../../../service/convocatoria/domain/service/convocatoriaObtener.service';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { Router, RouterLink } from '@angular/router';
import { DatatableCustomComponent } from '../../../shared/datatableCustomizable/datatable-custom.component';
import { DatatableInputAction } from '../../../../service/common/model/datatableAction';

@Component({
  selector: 'app-listar-convocatorias',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, DatatableCustomComponent],
  templateUrl: './listar-convocatorias.component.html',
  styleUrl: './listar-convocatorias.component.css'
})
export class ListarConvocatoriasComponent implements OnInit{

  // Enumeraciones que llenan los select
  protected tipoFinanciacionEnum = TipoFinanciacion;
  protected convocatoriaEstadoEnum = ConvocatoriaEstado;

  // Formulario reactivo
  protected formulario: FormGroup;
  
  // Informacion del Datatable
  protected datatableInputs: DatatableInput;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private obtenerService: ConvocatoriaObtenerService,
    protected enumTranslationService: EnumTranslationService
  ) {

    // Inicialización de los datos que construyen el datatable
    this.datatableInputs = new DatatableInput(
      'Convocatorias',
      new Paginacion<ConvocatoriaListarConFiltroProyeccion>()
    );
    this.datatableInputs.quieresPaginar = true;
    this.datatableInputs.acciones = [new DatatableInputAction('visibility', 'ver')]
    this.datatableInputs.mensajeNoHayElementos = 'No hay Convocatorias asociadas a esta Busqueda'
    this.datatableInputs.mensajeBusqueda = 'Visualiza registros de Convocatoria llenando los campos del formulario.'
    this.datatableInputs.tableHeaders = ['ID', 'Nombre', 'Estado', 'Tipo Financiacion'];
    this.datatableInputs.dataAttributes = [
      {name:'id', type:String}, 
      {name:'nombre', type:String}, 
      {name:'estado', type:ConvocatoriaEstado}, 
      {name:'tipoFinanciacion', type:TipoFinanciacion} 
    ]
    
    // Inicialización del formulario reactivo
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      id: [''],
      nombre: [''],
      estado: [''],
      tipoFinanciacion: ['']
    });
  }

  ngOnInit(): void {
    // Recuperar el estado del listado en el servicio
    this.obtenerService.getRegistroListarConFiltro()
      .subscribe({
        next: (respuesta) => {
          // Actualiar el Input del datatable
          this.datatableInputs.searchPerformed = true;
          this.datatableInputs.paginacion = respuesta.data;    
        }
      })
    // Recuperar el estado del formulario en el servicio
    // this.formulario = this.obtenerService.getFormularioListarConFiltro(); 
  }

  /**
   * Maneja el envío del formulario de búsqueda.
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      //Guardamos el estado actual del formulario
      this.obtenerService.setFormularioListarConFiltro(this.formulario)

      // Realizar solicitud para obtener la respuesta
      this.obtenerService.listarConFiltro(
          this.formulario.value.pageNo,
          this.formulario.value.pageSize,
          this.formulario.value.id,
          this.formulario.value.nombre,
          this.formulario.value.estado,
          this.formulario.value.tipoFinanciacion
      );

      this.obtenerService.getRegistroListarConFiltro()
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {        
            // Actualiar el Input del datatable
            this.datatableInputs.searchPerformed = true;
            this.datatableInputs.paginacion = respuesta.data
          },
          // Manejar errores
          error: (errorData) => {
            console.error(errorData);
          }
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
    // Limpiamos el formulario del componente
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      id: [''],
      nombre: [''],
      estado: [''],
      tipoFinanciacion: ['']
    });

    // Limpiamos los datos que construyen el datatable
    this.datatableInputs = new DatatableInput(
      'Convocatorias',
      new Paginacion<ConvocatoriaListarConFiltroProyeccion>()
    );
    this.datatableInputs.searchPerformed = false;
    this.datatableInputs.quieresPaginar = true;
    this.datatableInputs.acciones = [new DatatableInputAction('visibility', 'ver')]
    this.datatableInputs.mensajeNoHayElementos = 'No hay Convocatorias asociadas a esta Busqueda'
    this.datatableInputs.mensajeBusqueda = 'Visualiza registros de Convocatoria llenando los campos del formulario.'
    this.datatableInputs.tableHeaders = ['ID', 'Nombre', 'Estado', 'Tipo Financiacion'];
    this.datatableInputs.dataAttributes = [
      {name:'id', type:String}, 
      {name:'nombre', type:String}, 
      {name:'estado', type:ConvocatoriaEstado}, 
      {name:'tipoFinanciacion', type:TipoFinanciacion} 
    ]

    // Limpiamos los datos en el servicio
    this.obtenerService.limpiarSolicitudUsuarioListarConFilrtro();
  }

  accion(accion: any): void {
    // Si la accion es ver
    if (accion.accion.accion == 'ver') {
      this.obtenerService.obtenerSolicitudUsuarioInformaciónDetallada(accion.data.id);
      this.router.navigate(['/convocatorias/listar', accion.data.id]);
    }
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
