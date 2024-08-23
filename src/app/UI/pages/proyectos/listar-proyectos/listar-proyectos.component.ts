import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DatatableCustomComponent } from '../../../shared/datatableCustomizable/datatable-custom.component';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { ProyectoObtenerService } from '../../../../service/proyecto/domain/service/proyectoObtener.service';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { ProyectoListarConFiltroProyeccion } from '../../../../service/proyecto/domain/model/proyecciones/proyectoListarConFiltroProyeccion';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { DatatableInputAction } from '../../../../service/common/model/datatableAction';
import { EstadoProyecto } from '../../../../service/proyecto/domain/model/enum/estadoProyecto';
import { TipoFinanciacion } from '../../../../service/convocatoria/domain/model/enum/tipoFinanciacion';

@Component({
  selector: 'app-listar-proyectos',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, DatatableCustomComponent],
  templateUrl: './listar-proyectos.component.html',
  styleUrl: './listar-proyectos.component.css'
})
export class ListarProyectosComponent implements OnInit{
  // Formulario reactivo
  protected formulario: FormGroup;
  // Informacion del Datatable
  protected datatableInputs: DatatableInput;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private obtenerService: ProyectoObtenerService,
    protected enumTranslationService: EnumTranslationService
  ) {

    // Inicialización de los datos que construyen el datatable
    this.datatableInputs = new DatatableInput(
      'Proyectos',
      new Paginacion<ProyectoListarConFiltroProyeccion>()
    );
    this.datatableInputs.quieresPaginar = true;
    this.datatableInputs.acciones = [new DatatableInputAction('visibility', 'ver')]
    this.datatableInputs.mensajeNoHayElementos = 'No hay Proyectos asociados a esta Busqueda'
    this.datatableInputs.mensajeBusqueda = 'Visualiza registros de Proyectos llenando los campos del formulario.'
    this.datatableInputs.tableHeaders = ['ID', 'Nombre', 'Estado', 'Tipo Financiación'];
    this.datatableInputs.dataAttributes = [
      {name:'id', type:String}, 
      {name:'nombre', type:String}, 
      {name:'estado', type:EstadoProyecto}, 
      {name:'tipoFinanciacion', type:TipoFinanciacion} 
    ]

    // Inicialización del formulario reactivo
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10'],
      id: [''],
      nombre: ['']
    });
  }

  ngOnInit(): void {
    // // Recuperar el estado del listado en el servicio
    // this.obtenerService.getRegistroListarConFiltro()
    //   .subscribe({
    //     next: (respuesta) => {
    //       // Actualiar el Input del datatable
    //       this.datatableInputs.searchPerformed = true;
    //       this.datatableInputs.paginacion = respuesta.data;    
    //     }
    //   })
    // // Recuperar el estado del formulario en el servicio
    // this.formulario = this.obtenerService.getFormularioListarConFiltro(); 
  }


  onSubmit(): void {
    if (this.formulario.valid) {
      // Realizar solicitud para obtener la respuesta
      this.obtenerService.listarConFiltro(
          this.formulario.value.pageNo,
          this.formulario.value.pageSize,
          this.formulario.value.id,
          this.formulario.value.nombre
      );

      this.obtenerService.listarConFiltroProyectos.subscribe({
        next: (respuesta) => {        
          // Actualiar el Input del datatable
          this.datatableInputs.searchPerformed = true;
          this.datatableInputs.paginacion = respuesta.data
        }
      });
    } else {
      this.formulario.markAllAsTouched();
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
      nombre: ['']
    });

    // Limpiamos los datos que construyen el datatable
    this.datatableInputs = new DatatableInput(
      'Proyectos',
      new Paginacion<ProyectoListarConFiltroProyeccion>()
    );
    this.datatableInputs.quieresPaginar = true;
    this.datatableInputs.acciones = [new DatatableInputAction('visibility', 'ver')]
    this.datatableInputs.mensajeNoHayElementos = 'No hay Proyectos asociados a esta Busqueda'
    this.datatableInputs.mensajeBusqueda = 'Visualiza registros de Proyectos llenando los campos del formulario.'
    this.datatableInputs.tableHeaders = ['ID', 'Nombre', 'Estado', 'Tipo Financiación'];
    this.datatableInputs.dataAttributes = [
      {name:'id', type:String}, 
      {name:'nombre', type:String}, 
      {name:'estado', type:EstadoProyecto}, 
      {name:'tipoFinanciacion', type:TipoFinanciacion} 
    ]
  }

  accion(accion: any): void {
    // Si la accion es ver
    if (accion.accion.accion == 'ver') {
      this.obtenerService.obtenerInformaciónDetallada(accion.data.id);
      this.router.navigate(['/proyectos/listar', accion.data.id]);
    }

    if (accion.accion.accion == 'adelante') {
      alert("Adelante")
    }

    if (accion.accion.accion == 'atras') {
      alert("Adelante")
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
