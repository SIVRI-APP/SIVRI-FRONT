import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { SemilleroProgramaEliminarService } from '../../../../../../service/semilleros/domain/service/semillero-programa-eliminar.service';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';

@Component({
  selector: 'app-eliminar-programa',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-programa.component.html',
  styleUrl: './eliminar-programa.component.css'
})
export class EliminarProgramaComponent implements OnInit {

  @Input() idPrograma !: number;
  activeModal = inject(NgbActiveModal);
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  private respuesta:Respuesta<boolean>;
  constructor(
    private actuailzarListarService: CommunicationComponentsService,
    private programaSemilleroEliminarService: SemilleroProgramaEliminarService,
  ){
    this.respuesta=new Respuesta<false>();
  }
  ngOnInit(): void {

  }

  onsubmit(){
    console.log('id programa del modal'+this.idPrograma);
    this.programaSemilleroEliminarService.eliminarProgramaSemillero(this.idPrograma).subscribe({
      next:(respuesta)=>{
        this.respuesta=respuesta;
        this.openModalOk(respuesta.userMessage);
        this.actuailzarListarService.notificarActualizarListar('eliminar');
        this.activeModal.close('eliminarExitoso')
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
