import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrupoObtenerService } from '../../../../service/grupos/domain/service/grupo-obtener.service';
import { ListarGrupoProyeccion } from '../../../../service/grupos/domain/model/proyecciones/listarGrupoProyeccion';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { RouterLink } from '@angular/router';
import { IntegrantesGrupoObtenerService } from '../../../../service/grupos/domain/service/integrantes-grupo-obtener.service';
import { IntegrantesMentores } from '../../../../service/grupos/domain/model/proyecciones/integrantesMentores';
import { SemilleroCrearService } from '../../../../service/semilleros/domain/service/semillero-crear.service';
import { ErrorData } from '../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../shared/modal-bad/modal-bad.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../shared/modal-ok/modal-ok.component';

@Component({
  selector: 'app-crear-semillero',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-semillero.component.html',
  styleUrl: './crear-semillero.component.css'
})
export class CrearSemilleroComponent implements OnInit {
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  //formulario reactivo
  protected formulario: FormGroup;
  //private respuestaGrupo: Respuesta<ListarGrupoProyeccion>;
  protected grupos: ListarGrupoProyeccion[]=[];
  protected integrantesMentores: IntegrantesMentores[]=[];
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>
  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private grupoObtenerService: GrupoObtenerService,
    private integrantesGrupoObtenerService:IntegrantesGrupoObtenerService,
    private semilleroCrearService:SemilleroCrearService,
  ) {
    this.respuesta = new Respuesta<false>();
    this.formulario = this.formBuilder.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(200)]],
      grupoId: [,Validators.required],
      mentorId: [null,Validators.required],
      fechaCreacion: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')]
    });
    this.formulario.get('fechaCreacion')?.disable();
     }
  ngOnInit(): void {
    //llamar los grupos para mostrar en la lista de crear semillero
    this.grupoObtenerService.obtenergruposxUsuario().subscribe({
      next:(respuesta)=>{
        this.grupos=respuesta.data
      }
    });
    this.formulario.get('grupoId')?.setValue(this.formulario.value.grupoId);

    //llamar los mentores dependiendo del grupo que se selccione
  }
  listarMentores(){
    const idGrupo=this.formulario.value.grupoId;
    this.integrantesGrupoObtenerService.obtenerMentoresxgrupo(idGrupo).subscribe({
      next:(respuesta)=>{
        this.integrantesMentores=respuesta.data;

      }
    });
  }
  onSubmit(){
    console.log('formulario ------------');
    console.log(this.formulario);
    this.semilleroCrearService.crearSemillero({
      nombre:this.formulario.value.nombre,
      grupoId:this.formulario.value.grupoId,
      mentorId:this.formulario.value.mentorId
    }).subscribe({
      next:(respuesta)=>{
        this.respuesta=respuesta;
        this.openModalOk(respuesta.userMessage);
      },
      // Manejar errores
      error: (errorData) => {
        // Verificar si el error es del tipo esperado
        if (errorData.error && errorData.error.data) {
          let respuesta: Respuesta<ErrorData> = errorData.error;
          this.openModalBad(respuesta.data);
        } else {
          // Manejar errores inesperados
          this.openModalBad(new ErrorData({ error: "Error inseperado, contactar a soporte" }));
        }
      }
    });
  }
  openModalOk(message: string) {
    const modalRef = this.modalService.open(ModalOkComponent);
    modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        //cierra todas las modales
        this.modalService.dismissAll();
      }

    });
  }
  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }
}
