import { Component, inject, OnInit } from '@angular/core';
import { DatatableCustomComponent } from '../../../../shared/datatableCustomizable/datatable-custom.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableInput } from '../../../../../service/common/model/datatableInput';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { Paginacion } from '../../../../../service/common/model/paginacion';
import { IntegrantesProyeccion } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';
import { DatatableInputAction } from '../../../../../service/common/model/datatableAction';
import { IntegranteDataTable, IntegrantesDataTable } from '../../../../../service/proyecto/domain/model/proyecciones/integrantesDataTable';
import { RolProyecto } from '../../../../../service/proyecto/domain/model/enum/rolProyecto';

@Component({
  selector: 'app-integrantes-proyecto',
  standalone: true,
  imports: [DatatableCustomComponent],
  templateUrl: './integrantes-proyecto.component.html',
  styleUrl: './integrantes-proyecto.component.css'
})
export class IntegrantesProyectoComponent implements OnInit{
  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Informacion de la convocatoria asociada
  protected proyectoInformacionIntegrante:IntegrantesProyeccion[] = [];

  // Datatable para los documentos
  protected datatableInputsIntegrantes: DatatableInput;

  // Informacion del proyecto involucrado
  private proyectoId:number = 0;

  constructor(
    protected proyectoObtenerService: ProyectoObtenerService
  ){
    // Inicialización de los datos que construyen el datatable Integrantes
    this.datatableInputsIntegrantes = new DatatableInput(
      'Integrantes',
      new Paginacion<IntegranteDataTable>()
    );
    this.datatableInputsIntegrantes.searchPerformed = true;
    this.datatableInputsIntegrantes.acciones = [new DatatableInputAction('visibility', 'ver'), new DatatableInputAction('delete', 'eliminar')];
    this.datatableInputsIntegrantes.tableHeaders = ['ID', 'Integrante', 'Rol'];
    this.datatableInputsIntegrantes.dataAttributes = [
      {name:'id', type:String},
      {name:'integrante', type:String},
      {name:'rol', type:RolProyecto}
    ]  
    this.datatableInputsIntegrantes.mensajeNoHayElementos = 'No hay Integrantes Asociados al Proyecto'
    this.datatableInputsIntegrantes.quieresPaginar = false;
  }

  ngOnInit(): void {
    this.proyectoObtenerService.getRegistroInformacionDetallada().subscribe({
      next: (respuesta) => {
        if (respuesta.data.integrantes != null) {
          this.proyectoInformacionIntegrante = respuesta.data.integrantes;

          let paginacionEjecucion = new Paginacion();
          paginacionEjecucion.content = new IntegrantesDataTable(respuesta.data.integrantes).integrantes;

          this.datatableInputsIntegrantes.paginacion = paginacionEjecucion;
          this.datatableInputsIntegrantes.searchPerformed = true;
        }
        this.proyectoId = respuesta.data.id;          
      }
    })
  }

  accion(accion: any): void {
    alert("accion");
  }
}
