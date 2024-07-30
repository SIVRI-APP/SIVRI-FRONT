import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoFinanciacion } from '../../../../service/convocatoria/domain/model/enum/tipoFinanciacion';
import { ConvocatoriaEstado } from '../../../../service/convocatoria/domain/model/enum/convocatoriaEstado';
import { Router, RouterLink } from '@angular/router';
import { DatatableCustomComponent } from '../../../shared/datatableCustomizable/datatable-custom.component';
import { FiltroInput } from '../../../../service/common/model/filtro/filtroInput';
import { FiltroComponent } from '../../../shared/filtro/filtro.component';
import { FiltroField } from '../../../../service/common/model/filtro/filtroField';
import { FiltroFieldTipo } from '../../../../service/common/model/filtro/filtroFieldTipo';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { ConvocatoriaListarConFiltroProyeccion } from '../../../../service/convocatoria/domain/model/proyecciones/usuarioSolicitudListarConFiltroProyeccion';
import { DatatableInputAction } from '../../../../service/common/model/datatableAction';
import { ConvocatoriaObtenerService } from '../../../../service/convocatoria/domain/service/convocatoriaObtener.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar-convocatorias',
  standalone: true,
  imports: [RouterLink, DatatableCustomComponent, FiltroComponent],
  templateUrl: './listar-convocatorias.component.html',
  styleUrl: './listar-convocatorias.component.css'
})
export class ListarConvocatoriasComponent implements OnInit{

  // Bandera si queremos que el componente retorne el registro ID
  @Input() obtenerRegistroId!:boolean;

  // Emite el registro ID
  @Output() filtrarEmitter = new EventEmitter<any>();

  // Informacion necesaria para crear el filtro
  protected filtroInput: FiltroInput;

  // Informacion necesaria para el datatable
  protected datatableInputs: DatatableInput;

  constructor(
    private router: Router,
    private obtenerService: ConvocatoriaObtenerService,
  ){
    // Inicialización de los datos que construyen el filtro
    this.filtroInput = new FiltroInput();
    this.filtroInput.filtroFields.push(new FiltroField('ID Convocatoria', 'id', 'ID', FiltroFieldTipo.INPUT, 'text', null, "", [], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Nombre', 'nombre', 'Nombre', FiltroFieldTipo.INPUT, 'text', null, "", [], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Estado', 'estado', 'Estado de la Convocatoria', FiltroFieldTipo.ENUM, '', ConvocatoriaEstado, "", [], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Financiación', 'tipoFinanciacion', 'Tipo de Financiación', FiltroFieldTipo.ENUM, '', TipoFinanciacion, "", [], true, ''));

    // Inicialización de los datos que construyen el datatable
    this.datatableInputs = new DatatableInput(
      'Convocatorias',
      new Paginacion<ConvocatoriaListarConFiltroProyeccion>()
    );
    this.datatableInputs.quieresPaginar = true;
    this.datatableInputs.acciones = [new DatatableInputAction('visibility', 'ver')];
    this.datatableInputs.mensajeNoHayElementos = 'No hay Convocatorias asociadas a esta Busqueda'
    this.datatableInputs.mensajeBusqueda = 'Visualiza registros de Convocatoria llenando los campos del formulario.'
    this.datatableInputs.tableHeaders = ['ID', 'Nombre', 'Estado', 'Tipo Financiacion'];
    this.datatableInputs.dataAttributes = [
      {name:'id', type:String}, 
      {name:'nombre', type:String}, 
      {name:'estado', type:ConvocatoriaEstado}, 
      {name:'tipoFinanciacion', type:TipoFinanciacion} 
    ]
  }

  ngOnInit() {
    // Si queremos emitir el registro al padre agregamos la accion
    if (this.obtenerRegistroId) {
      this.datatableInputs.acciones.push(new DatatableInputAction('add', 'agregar'));
    }
  }

  accion(accion: any): void {
    // Si la accion es ver
    if (accion.accion.accion == 'ver') {
      this.obtenerService.obtenerInformaciónDetallada(accion.data.id);
      this.router.navigate(['/convocatorias/listar', accion.data.id]);
    }

    if (accion.accion.accion == 'agregar') {
      this.filtrarEmitter.emit(accion);
    }
  }

  filtrar(filtro: FormGroup) {
    // Realizar solicitud para obtener la respuesta
    this.obtenerService.listarConFiltro(
        filtro.value.pageNo,
        filtro.value.pageSize,
        filtro.value.id,
        filtro.value.nombre,
        filtro.value.estado,
        filtro.value.tipoFinanciacion
    );

    this.obtenerService.getRegistroListarConFiltro().subscribe({
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
  }

}






