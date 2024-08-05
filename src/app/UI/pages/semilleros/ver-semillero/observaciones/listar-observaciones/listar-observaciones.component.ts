import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListarObservacionSemilleroProyeccion } from '../../../../../../service/semilleros/domain/model/proyecciones/listarObservacionSemilleroProyeccion';
import { Paginacion } from '../../../../../../service/common/model/paginacion';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { SemilleroObservacionObtenerService } from '../../../../../../service/semilleros/domain/service/semillero-observacion-obtener.service';
import { ActivatedRoute } from '@angular/router';
import { DatatableInput } from '../../../../../../service/common/model/datatableInput';
import { DatatableComponent } from '../../../../../shared/datatable/datatable.component';
import { CrearObservacionComponent } from '../crear-observacion/crear-observacion.component';
import { Subscription } from 'rxjs';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';

@Component({
  selector: 'app-listar-observaciones',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatatableComponent,
    CrearObservacionComponent,
  ],
  templateUrl: './listar-observaciones.component.html',
  styleUrl: './listar-observaciones.component.css'
})
export class ListarObservacionesComponent implements OnInit,OnDestroy {
  paginas: number[] = [2, 3, 5];
  protected idSemillero!: string;
  protected formulario: FormGroup;
  protected datatableInputs: DatatableInput;
  protected respuesta: Respuesta<Paginacion<ListarObservacionSemilleroProyeccion>>;
  protected mostrarFormularioCrear: boolean = false;
  private suscripciones: Subscription[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private semilleroObservacionObtenerService: SemilleroObservacionObtenerService,
    private actualizarListarService: CommunicationComponentsService,
  ){
    this.formulario = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['2'],
      idSemillero: [''],

    });
    this.respuesta = new Respuesta<Paginacion<ListarObservacionSemilleroProyeccion>>();
    this.datatableInputs = new DatatableInput('Observaciones',new Paginacion<ListarObservacionSemilleroProyeccion>);
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
      this.formulario.get('idSemillero')?.setValue(this.idSemillero);
    });
    this.listarObservaciones();
    this.suscribirseALasActualizaciones();
  }
  ngOnDestroy(): void {
    // Liberar la suscripción para evitar memory leaks
    this.suscripciones.forEach(subcription => subcription.unsubscribe());
  }
  listarObservaciones(){
    //llama al servicio de consultar observaciones
    this.semilleroObservacionObtenerService.obtenerObservacionxSemilleroId(
      this.formulario.value.idSemillero,this.formulario.value.pageNo,this.formulario.value.pageSize
    ).subscribe({
      next:(respuesta)=>{
        this.respuesta=respuesta;
        this.datatableInputs.searchPerformed = true;
        this.datatableInputs.paginacion = this.respuesta.data;
        this.datatableInputs.tableHeaders= ['ID','Observacion','Funcionario','Fecha'];
        this.datatableInputs.dataAttributes = [
          {name:'id',type:Number},
          {name:'observacion',type:String},
          {name:'usuario',type:String},
          {name:'fecha',type:String}
        ];
      },
      // Manejar errores
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }
  toggleFormulario(){
    this.mostrarFormularioCrear= !this.mostrarFormularioCrear;
  }
  suscribirseALasActualizaciones(){
    // Suscribirse a las notificaciones de actualización para cada tipo
    this.suscripciones.push(
      this.actualizarListarService.actualizarListar$.subscribe((tipo:string)=>{
        if(tipo=='agregar'){
          this.mostrarFormularioCrear=false;
          this.listarObservaciones();
        }

      })
    );
  }
  onPageSizeChange(){
    this.mostrarFormularioCrear=false;
     this.listarObservaciones();
  }
  /**
   * Cambia la página de resultados de acuerdo al número de página especificado.
   * @param pageNumber El número de página al que se debe cambiar.
   */
  changePage(pageNumber: number): void {
    // Actualizar el valor de pageNo en el formulario
    this.formulario.get('pageNo')?.setValue(pageNumber);

    // Enviar el formulario para cargar los datos de la nueva página
    this.listarObservaciones();
    //this.onsubmit();
  }
  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePage(newPage: number): void {
    // Realizar incremento o decremento de la Pagina
    this.formulario.get('pageNo')?.setValue((this.formulario.get('pageNo')?.value ?? 0) + newPage);

    // Enviar el formulario para cargar los datos de la nueva página
    this.listarObservaciones();
  }
}