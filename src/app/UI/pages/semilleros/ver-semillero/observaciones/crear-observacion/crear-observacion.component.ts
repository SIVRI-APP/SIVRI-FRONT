import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SemilleroObservacionCrearService } from '../../../../../../service/semilleros/domain/service/semillero-observacion-crear.service';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';

@Component({
  selector: 'app-crear-observacion',
  standalone: true,
  imports: [
    ReactiveFormsModule,

  ],
  templateUrl: './crear-observacion.component.html',
  styleUrl: './crear-observacion.component.css'
})
export class CrearObservacionComponent implements OnInit {
  protected formulario: FormGroup;
  protected idSemillero!: string;
  protected respuestaCrear: Respuesta<boolean>;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  @Output() mostrarFormularioCrear:boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private semilleroObservacionCrearService: SemilleroObservacionCrearService,
    private actualizarListarService: CommunicationComponentsService,
  ){
    this.mostrarFormularioCrear=true;
    this.formulario = this.formBuilder.group({
      idSemillero: [''],
      observacion: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(1445)]],
    });
    this.respuestaCrear = new Respuesta<false>();
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
      this.formulario.get('idSemillero')?.setValue(this.idSemillero);
    });
    }
  onsubmitCrear(){
    console.log(this.formulario);
    this.semilleroObservacionCrearService.crearObservacionSemillero(this.formulario.value.idSemillero,
      {observacion: this.formulario.value.observacion
      }).subscribe({
        next:(respuesta)=>{
          this.respuestaCrear=respuesta;
          this.openModalOk(respuesta.userMessage);
          this.actualizarListarService.notificarActualizarListar('agregar');
          this.mostrarFormularioCrear=false;
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
