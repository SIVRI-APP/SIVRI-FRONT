import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LineaInvestigacionEliminarService } from '../../../../../../service/semilleros/domain/service/linea-investigacion-eliminar.service';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';

@Component({
  selector: 'app-eliminar-linea-modal',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-linea-modal.component.html',
  styleUrl: './eliminar-linea-modal.component.css'
})
export class EliminarLineaModalComponent implements OnInit {

  @Input() idLinea !: number;
  activeModal = inject(NgbActiveModal);
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  private respuesta:Respuesta<boolean>;
  constructor(
    private actuailzarListarService: CommunicationComponentsService,
    private lineaInvetigacionEliminarservice: LineaInvestigacionEliminarService,
  ){
    this.respuesta=new Respuesta<false>();
  }
  ngOnInit(): void {
   // console.log('id linea desde el modal------'+this.idLinea);
  }
  onsubmit(){
    console.log('id linea desde el modal------'+this.idLinea);
    this.lineaInvetigacionEliminarservice.eliminarLinea(this.idLinea).subscribe({
      next:(respuesta)=>{
        this.respuesta=respuesta;
        this.openModalOk(respuesta.userMessage);
        this.actuailzarListarService.notificarActualizarListar('eliminar');
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
