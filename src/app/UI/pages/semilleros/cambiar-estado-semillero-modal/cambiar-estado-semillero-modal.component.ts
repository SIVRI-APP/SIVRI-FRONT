import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SemilleroCrearService } from '../../../../service/semilleros/domain/service/semillero-crear.service';
import { ErrorData } from '../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../shared/modal-bad/modal-bad.component';
import { ModalOkComponent } from '../../../shared/modal-ok/modal-ok.component';

@Component({
  selector: 'app-cambiar-estado-semillero-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cambiar-estado-semillero-modal.component.html',
  styleUrl: './cambiar-estado-semillero-modal.component.css'
})
export class CambiarEstadoSemilleroModalComponent implements OnInit {
  @Input() idSemillero !: number;
  @Input() estadoActual !: string;
  activeModal = inject(NgbActiveModal);
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  private respuesta:Respuesta<boolean>;
  //formulario reactivo
  protected formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private semilleroCrearService: SemilleroCrearService,

  ){
    this.formulario = this.formBuilder.group({
      estadoSemillero: ['',Validators.required],
    });
    this.respuesta=new Respuesta<false>();

  }
  ngOnInit(): void {
    this.formulario.get('estadoSemillero')?.setValue(this.estadoActual);

  }
  onsubmit(){
    if(this.formulario.valid){
      this.semilleroCrearService.actualizarEstadoSemillero(this.idSemillero,{
        estado: this.formulario.value.estadoSemillero
      }).subscribe({
        next: (respuesta)=>{

          this.respuesta= respuesta;
          this.openModalOk(this.respuesta.userMessage);
          // Emitir evento al cerrar el modal con éxito
          this.activeModal.close('actualizar');
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
    }else{
      this.formulario.markAllAsTouched();
    }
  }
  cancelar(){
    this.activeModal.dismiss('cancelar');
  }
  openModalOk(message: string) {
    const modalRef = this.modalService.open(ModalOkComponent);
    modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        //cierra todas las modales
        this.modalService.dismissAll();
        //TODO FALTA QUE REDIRIJA A LISTAR
        //this.router.navigate([''])
      }
    });
  }
  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }
}
