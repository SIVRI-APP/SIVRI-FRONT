import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-ok',
  standalone: true,
  imports: [],
  template: `
		<div class="modal-header">
			<h4 class="modal-title">Solicitud Exitosa</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>{{ name }}!</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})
export class ModalOkComponent {
  activeModal = inject(NgbActiveModal);

	@Input() name: string = 'empty';	
}
