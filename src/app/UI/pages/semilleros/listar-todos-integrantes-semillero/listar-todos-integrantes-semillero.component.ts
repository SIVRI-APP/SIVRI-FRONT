import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IntegranteSemilleroEstado } from '../../../../service/semilleros/domain/model/enum/integranteSemilleroEstado';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { RolIntegranteSemillero } from '../../../../service/semilleros/domain/model/proyecciones/rolIntegranteSemillero';
import { RolSemilleroObtenerService } from '../../../../service/semilleros/domain/service/rol-semillero-obtener.service';
import { IntegranteSemilleroObtenerService } from '../../../../service/semilleros/domain/service/integrante-semillero-obtener.service';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { ListarTodosIntegranteSemilleroconFiltroProyeccion } from '../../../../service/semilleros/domain/model/proyecciones/listarIntegranteSemilleroconFiltroProyeccion';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { DatatableCustomComponent } from '../../../shared/datatableCustomizable/datatable-custom.component';

@Component({
  selector: 'app-listar-todos-integrantes-semillero',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatatableCustomComponent
  ],
  templateUrl: './listar-todos-integrantes-semillero.component.html',
  styleUrl: './listar-todos-integrantes-semillero.component.css'
})
export class ListarTodosIntegrantesSemilleroComponent implements OnInit {
  paginas: number[] = [2, 3, 5];
  protected formulario: FormGroup;
  protected estadoIntegranteSemilleroEnum = IntegranteSemilleroEstado;
  protected rolIntegranteSemillero: RolIntegranteSemillero[]=[];
  protected datatableInputs: DatatableInput;
  protected respuesta: Respuesta<Paginacion<ListarTodosIntegranteSemilleroconFiltroProyeccion>>
  constructor(
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService,
    private rolSemilleroObtenerService: RolSemilleroObtenerService,
    private integranteSemilleroObtenerService: IntegranteSemilleroObtenerService,
  ){
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: [2],
      numeroDocumento:[''],
      nombres:[''],
      idSemillero:[''],
      nombreSemillero:[''],
      rolSemillero: [''],
      estado: [''],
    });
    this.respuesta= new Respuesta<Paginacion<ListarTodosIntegranteSemilleroconFiltroProyeccion>>();
    this.datatableInputs = new DatatableInput('Integrantes',
      new Paginacion<ListarTodosIntegranteSemilleroconFiltroProyeccion>());
  }
  ngOnInit(): void {
    this.rolSemilleroObtenerService.obtenerRolesSemillero().subscribe({
      // Manejar respuesta exitosa
      next: (respueta) => {
        this.rolIntegranteSemillero = respueta.data;

      },// Manejar errores
      error: (errorData) => {
        console.error(errorData);
      },
    });
  }
  onsubmit(){
    console.log(this.formulario);
    if(this.formulario.valid){
      this.integranteSemilleroObtenerService.obtenerTodosIntegrantesSemilleroPaginado(
        this.formulario.value.numeroDocumento,this.formulario.value.nombres,
      this.formulario.value.idSemillero,this.formulario.value.nombreSemillero,
    this.formulario.value.rolSemillero,this.formulario.value.estado,
  this.formulario.value.pageNo,this.formulario.value.pageSize).subscribe({
          next:(respuesta)=>{
            console.log(respuesta);
            this.respuesta=respuesta;
            //actualiza el input del datatable
            this.datatableInputs.searchPerformed= true;
            this.datatableInputs.quieresPaginar =true;
            this.datatableInputs.paginacion = this.respuesta.data;
            this.datatableInputs.tableHeaders = ['Número Documento','Nombre','Id semillero','Semillero','Rol semillero','Estado'];
            this.datatableInputs.dataAttributes = [
              {name:'numeroDocumento',type:String},
              {name:'nombres',type:String},
              {name:'semilleroId',type:Number},
              {name:'nombreSemillero',type:String},
              {name:'rolSemillero',type:String},
              {name:'estado',type:String},
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
  }
  limpiarCampos(){
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: [2],
      numeroDocumento:[''],
      nombres:[''],
      idSemillero:[''],
      nombreSemillero:[''],
      rolSemillero: [''],
      estado: [''],
    });
  }
  //metodo que no permite el ingreso de punto y la letra e
  onKeyDown(event: KeyboardEvent) {
    console.log('tecla ' + event.key)
    const tecla = event.key;
    if (['.', ',', 'e'].includes(tecla)) {
      event.preventDefault();
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

}
