import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SemilleroEstado } from '../../../../service/semilleros/domain/model/enum/semilleroEstado';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { Paginacion } from '../../../../service/common/model/paginacion';
import { ListarSemilleroosFuncionarioProyeccion } from '../../../../service/semilleros/domain/model/proyecciones/liatarSemillerosFuncionarioProyeccion';
import { SemilleroObtenerService } from '../../../../service/semilleros/domain/service/semillero-obtener.service';
import { DatatableInput } from '../../../../service/common/model/datatableInput';
import { DatatableComponent } from '../../../shared/datatable/datatable.component';

@Component({
  selector: 'app-listar-todos-semilleros',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatatableComponent
  ],
  templateUrl: './listar-todos-semilleros.component.html',
  styleUrl: './listar-todos-semilleros.component.css'
})
export class ListarTodosSemillerosComponent {
  paginas: number[] = [2, 3, 5];
  protected formulario: FormGroup;
  protected datatableInputs: DatatableInput;
  protected estadoSemilleroEnum = SemilleroEstado;
  protected respuesta: Respuesta<Paginacion<ListarSemilleroosFuncionarioProyeccion>>
  constructor(
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService,
    private semilleroObtenerService:SemilleroObtenerService,
  ){
    this.respuesta = new Respuesta<Paginacion<ListarSemilleroosFuncionarioProyeccion>>();
    this.datatableInputs = new DatatableInput('Semilleros',
      new Paginacion<ListarSemilleroosFuncionarioProyeccion>());
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      nombre: [''],
      correo: [''],
      estado: ['']
    });
  }

  onsubmit(){
    if (this.formulario.valid){
    this.listarSemillerosFuncionario();
    }else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
      // Lanzar un error
      throw new Error('Formulario no válido');
    }
  }
  listarSemillerosFuncionario(){
    console.log(this.formulario)
    this.semilleroObtenerService.listarConFiltroFuncionario(
      this.formulario.value.pageNo,this.formulario.value.pageSize,
    this.formulario.value.nombre, this.formulario.value.correo, this.formulario.value.estado).subscribe({
      next:(respuesta)=>{
        console.log(respuesta);
        this.respuesta = respuesta;
        //actualiza el input del datatable
        this.datatableInputs.searchPerformed = true;
        this.datatableInputs.paginacion = this.respuesta.data;
        this.datatableInputs.tableHeaders = ['ID','Semillero','Email','Fecha Creación', 'Estado'];
        this.datatableInputs.dataAttributes = [
          {name: 'semilleroId', type: Number},
          {name: 'nombre', type:String},
          {name: 'correo', type:String},
          {name: 'fechaCreacion', type:String},
          {name: 'estado',type: SemilleroEstado},
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
  limpiarCampos(){
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      nombre: [''],
      correo: [''],
      estado: ['']
    });
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
