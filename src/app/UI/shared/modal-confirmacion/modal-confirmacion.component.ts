import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacion',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmacion.component.html',
  styleUrl: './modal-confirmacion.component.css'
})
export class ModalConfirmacionComponent {

  protected activeModal = inject(NgbActiveModal);

	@Input() titulo: string = "";
  @Input() mensaje: string = "";
  @Output() aceptar: EventEmitter<boolean> = new EventEmitter();

  enviarRespuesta(aceptar: boolean) {
    if (aceptar) {
      this.aceptar.emit(true);  
      this.activeModal.close('Close click');
    }else{
      this.aceptar.emit(false); 
      this.activeModal.close('Close click');
    }
  }

}
