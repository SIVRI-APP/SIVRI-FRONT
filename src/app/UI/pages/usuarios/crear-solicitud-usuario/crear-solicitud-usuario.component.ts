import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoDocumento } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { TipoUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { Sexo } from '../../../../service/solicitudUsuarios/domain/model/enum/sexo';
import { UsuarioSolicitudCrearService } from '../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudCrear.service';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../shared/modal-bad/modal-bad.component';
import { ErrorData } from '../../../../service/common/model/errorData';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-solicitud-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-solicitud-usuario.component.html',
  styleUrl: './crear-solicitud-usuario.component.css',
})
export class CrearSolicitudUsuarioComponent {

  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  // Enumeraciones que llenan los select
  protected tipoDocumentoEnum = TipoDocumento;
  protected sexoEnum = Sexo;
  protected tipoUsuarioEnum = TipoUsuario;
  // Formulario reactivo
  protected formulario: FormGroup;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;
  
  
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioSolicitudCrearService: UsuarioSolicitudCrearService,
    protected enumTranslationService: EnumTranslationService
  ) {
    this.respuesta = new Respuesta<false>();

    this.formulario = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      sexo: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      cvLac: [''],
      nota: ['', Validators.maxLength(1000)]
    });
  }

  /**
   * Maneja el envío del formulario de búsqueda de solicitudes de usuario.
   *
   * Si el formulario es válido, realiza una solicitud para obtener la respuesta.
   * Actualiza la lista de solicitudes de usuario y el texto de visualización en consecuencia.
   *
   * Si el formulario no es válido, marca todos los campos como tocados y lanza un error.
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      
      // Realizar solicitud para obtener los datos filtrados
      this.usuarioSolicitudCrearService
        .crearSolicitudUsuario({
          correo: this.formulario.value.correo,
          tipoDocumento: this.formulario.value.tipoDocumento,
          numeroDocumento: this.formulario.value.numeroDocumento,
          sexo: this.formulario.value.sexo,
          tipoUsuario: this.formulario.value.tipoUsuario,
          nombre: this.formulario.value.nombre,
          apellido: this.formulario.value.apellido,
          telefono: this.formulario.value.telefono,
          cvLac: this.formulario.value.cvLac,
          nota: this.formulario.value.nota,
          programaId: 1,
          organismoDeInvestigacionId: 1,
          rolGrupoId: 1,
        })
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            // Captura la respuesta
            this.respuesta = respuesta;

            this.openModalOk(this.respuesta.userMessage)
          },
          // Manejar errores
          error: (errorData) => {
            // Verificar si el error es del tipo esperado
            if (errorData.error && errorData.error.data) {
              let respuesta: Respuesta<ErrorData> = errorData.error;
              this.openModalBad(respuesta.data);
            } else {
              // Manejar errores inesperados
              this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
            }
          }
        });
    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
    }
  }

  /**
   * Restablece todos los campos del formulario a sus valores iniciales y reinicia la paginación.
   */
  limpiarCampos(): void {
    this.formulario = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      sexo: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      telefono: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      cvLac: [''],
      nota: ['', Validators.maxLength(1000)]
    });
  }
  
  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Aquí puedes realizar la navegación a otra ruta
        this.router.navigate(['/usuarios/listar-solicitudes']);
      }
    });
	}

  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}


  // Esta funcion hace el campo CVLAC obligatorio si el tipo de usuario a crear es DOCENTE
  onTipoUsuarioSeleccionado(event: any) {
    const valorSeleccionado = event.target.value;
    if (valorSeleccionado == 'DOCENTE') {
      const campoCvLac = this.formulario.get('cvLac');

      if (campoCvLac) {
        campoCvLac.setValidators([Validators.required]);
        campoCvLac.updateValueAndValidity(); // Actualizar los validadores
      }
    }else{
      const campoCvLac = this.formulario.get('cvLac');
      if (campoCvLac) {
        campoCvLac.clearValidators(); // Quitar todos los validadores
        campoCvLac.updateValueAndValidity(); // Actualizar los validadores
      }
    }
  }

  resetearAlturaTextArea(elemento: HTMLTextAreaElement) {
    // Restablecer la altura del textarea
    elemento.style.height = 'auto';
  }
}
