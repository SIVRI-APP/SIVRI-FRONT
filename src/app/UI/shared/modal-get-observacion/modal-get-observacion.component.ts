import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-get-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-get-observacion.component.html',
  styleUrl: './modal-get-observacion.component.css'
})
export class ModalGetObservacionComponent {
  
  // NG Modal
  activeModal = inject(NgbActiveModal);
  // Formulario reactivo
  protected formulario: FormGroup;

	@Input() mensaje: string = 'empty';
  @Input() restriccion: string = 'Error';
  @Output() enviarInformacion = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.formulario = this.formBuilder.group({
      observacion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.enviarInformacion.emit(this.formulario.value.observacion);
      this.activeModal.close('navegar'); // Cerrar la modal después de enviar la información

    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
    }
    
  }
}
