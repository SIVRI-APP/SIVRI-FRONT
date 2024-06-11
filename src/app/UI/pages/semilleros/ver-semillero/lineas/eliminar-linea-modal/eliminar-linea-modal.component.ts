import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eliminar-linea-modal',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-linea-modal.component.html',
  styleUrl: './eliminar-linea-modal.component.css'
})
export class EliminarLineaModalComponent {
  @Input() idLinea !: string;
  activeModal = inject(NgbActiveModal);

}
