import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-ok',
  standalone: true,
  imports: [],
  templateUrl: './modal-ok.component.html',
  styleUrl: './modal-ok.component.css'
})
export class ModalOkComponent {
  activeModal = inject(NgbActiveModal);

	@Input() name: string = 'empty';	
}
