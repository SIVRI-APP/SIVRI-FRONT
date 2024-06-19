import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearChecklistDTO, DocumentoDTO, ObtenerDocumentosDTO } from '../../../../../service/convocatoria/domain/model/DTO/crearConvocatoriaDTO';
import { ResponsableDocumento } from '../../../../../service/convocatoria/domain/model/enum/responsableDocumento';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';

@Component({
  selector: 'app-modal-get-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-crear-checklist.component.html',
  styleUrl: './modal-crear-checklist.component.css'
})
export class ModalCrearChecklistComponent {
  
  // NG Modal
  activeModal = inject(NgbActiveModal);
  
  // Formulario reactivo
  protected formulario: FormGroup;
  protected checklist: CrearChecklistDTO;

  // Documentos convocatoria
  protected documentos: ObtenerDocumentosDTO;

  // Enums
  protected responsableDocumentoEnum = ResponsableDocumento;

	@Input() mensaje: string = 'empty';
  @Input() restriccion: string = 'Error';
  @Output() enviarInformacion = new EventEmitter<CrearChecklistDTO>();

  constructor(
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService
  ){
    this.formulario = this.formBuilder.group({
      documentoId: ['', [Validators.required]],
      responsableDocumento: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      obligatorio: [''],
    });

    this.checklist = new CrearChecklistDTO();

    this.documentos = new ObtenerDocumentosDTO();

    // todo miguel Consumir los docs del back
    this.documentos.documentos = [
      new DocumentoDTO(1,"For-24"), 
      new DocumentoDTO(2,"For-54"),
      new DocumentoDTO(3,"For-3"),
      new DocumentoDTO(3,"For-30")
    ]
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.checklist.documentoId = this.formulario.value.documentoId;
      this.checklist.cantidad = this.formulario.value.cantidad;
      this.checklist.obligatorio = this.formulario.value.obligatorio == "" ?false : true;
      
      this.checklist.responsableDocumento = this.formulario.value.responsableDocumento;
      this.enviarInformacion.emit(this.checklist);
      this.activeModal.close('guardar'); // Cerrar la modal después de enviar la información
    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
    }
  }

  seleccionarDocumento(event: any) {
    const opcionSeleccionada = event.target.options[event.target.selectedIndex];
    const textoSeleccionado = opcionSeleccionada.text;

    this.checklist.nombre = textoSeleccionado;
  }


}
