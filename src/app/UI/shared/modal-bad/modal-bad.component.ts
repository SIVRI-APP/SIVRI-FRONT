import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorData } from '../../../service/common/model/errorData';

@Component({
  selector: 'app-modal-bad',
  standalone: true,
  imports: [],
  templateUrl: './modal-bad.component.html',
  styleUrl: './modal-bad.component.css'
})
export class ModalBadComponent {
  activeModal = inject(NgbActiveModal);

	@Input() mensaje: ErrorData = new ErrorData;	

  getErrorDataKeys(): string[] {
    return Object.keys(this.mensaje);
  }
}
