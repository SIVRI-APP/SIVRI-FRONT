import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-interrogante',
  standalone: true,
  imports: [],
  templateUrl: './modal-interrogante.component.html',
  styleUrl: './modal-interrogante.component.css'
})
export class ModalInterroganteComponent {
  activeModal = inject(NgbActiveModal);

	@Input() name: string = 'empty';	
}
