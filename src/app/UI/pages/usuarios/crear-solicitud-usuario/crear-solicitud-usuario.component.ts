import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-crear-solicitud-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-solicitud-usuario.component.html',
  styleUrl: './crear-solicitud-usuario.component.css',
})
export class CrearSolicitudUsuarioComponent {

  private modalService = inject(NgbModal);
  protected respuestaBack: Respuesta<boolean>;
  protected formulario: FormGroup;
  protected tipoDocumentoEnum = TipoDocumento;
  protected sexoEnum = Sexo;
  protected tipoUsuarioEnum = TipoUsuario;
  
  constructor(
    private usuarioSolicitudCrearService: UsuarioSolicitudCrearService,
    protected enumTranslationService: EnumTranslationService
  ) {
    this.respuestaBack = new Respuesta<false>();

    this.formulario = new FormGroup({
      correo: new FormControl(''),
      tipoDocumento: new FormControl(''),
      numeroDocumento: new FormControl(''),
      sexo: new FormControl(''),
      tipoUsuario: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      telefono: new FormControl(''),
      cvLac: new FormControl(''),
      nota: new FormControl(''),
    });
  }

  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {
      // Obtener los valores del formulario
      const formValues = this.obtenerValoresFormulario();
      
      // Realizar solicitud para obtener los datos filtrados
      this.usuarioSolicitudCrearService
        .crearSolicitudUsuario({
          correo: formValues.correo,
          tipoDocumento: formValues.tipoDocumento,
          numeroDocumento: formValues.numeroDocumento,
          sexo: formValues.sexo,
          tipoUsuario: formValues.tipoUsuario,
          nombre: formValues.nombre,
          apellido: formValues.apellido,
          telefono: formValues.telefono,
          cvLac: formValues.cvLac,
          nota: formValues.nota,
          programaId: 1,
          organismoDeInvestigacionId: 1,
          rolGrupoId: 1,
        })
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            // Captura la respuesta
            this.respuestaBack = respuesta;

            this.openModalOk(this.respuestaBack.userMessage)
          },
          // Manejar errores
          error: (error) => {
            // Verificar si el error es del tipo esperado
            if (error.error && error.error.data) {
              let respuesta: Respuesta<ErrorData> = error.error;
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
      // Lanzar un error
      throw new Error('Formulario no válido');
    }
  }

  /**
   * Obtiene los valores del formulario de búsqueda de solicitudes de usuario.
   *
   * @returns Un objeto que contiene los valores de los campos del formulario.
   *          - pageNo: El número de página.
   *          - pageSize: El tamaño de la página.
   *          - correo: El valor del campo "correo".
   *          - estado: El valor del campo "estado".
   *          - tipoDocumento: El valor del campo "tipoDocumento" como TipoDocumento enum.
   *          - numeroDocumento: El valor del campo "numeroDocumento".
   *          - nombres: El valor del campo "nombres".
   *          - apellidos: El valor del campo "apellidos".
   *          - tipoUsuario: El valor del campo "tipoUsuario" como TipoUsuario enum.
   */
  private obtenerValoresFormulario(): {
    correo?: string;
    tipoDocumento?: string;
    numeroDocumento?: string;
    sexo?: string;
    tipoUsuario?: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    cvLac?: string;
    nota?: string;
  } {
    // Captura de los valores del formulario
    const correo = this.formulario.get('correo')?.value ?? undefined;
    const numeroDocumento =
      this.formulario.get('numeroDocumento')?.value ?? undefined;
    const nombre = this.formulario.get('nombre')?.value ?? undefined;
    const apellido = this.formulario.get('apellido')?.value ?? undefined;
    const telefono = this.formulario.get('telefono')?.value ?? undefined;
    const cvLac = this.formulario.get('cvLac')?.value ?? undefined;
    const nota = this.formulario.get('nota')?.value ?? undefined;
    const tipoUsuario = this.formulario.get('tipoUsuario')?.value ?? undefined;
    const tipoDocumento = this.formulario.get('tipoDocumento')?.value ?? undefined;
    const sexo = this.formulario.get('sexo')?.value ?? undefined;

    // Devuelve un objeto con los valores capturados del formulario
    return {
      correo,
      tipoDocumento,
      numeroDocumento,
      sexo,
      tipoUsuario,
      nombre,
      apellido,
      telefono,
      cvLac,
      nota,
    };
  }

  /**
   * Restablece todos los campos del formulario a sus valores iniciales y reinicia la paginación.
   */
  limpiarCampos(): void {
    // Restablecer los campos del formulario
    this.formulario.reset();

    // Restablecer el estado inicial de los selectores
    this.restaurarEstadoInicialSelect('tipoDocumento', '#tipoDocumento');
    this.restaurarEstadoInicialSelect('sexo', '#sexo');
    this.restaurarEstadoInicialSelect('tipoUsuario', '#tipoUsuario');
  }

  /**
   * Restablece el estado inicial de un selector dado.
   * @param controlName El nombre del control del formulario.
   * @param selector El selector CSS del elemento del DOM.
   */
  restaurarEstadoInicialSelect(controlName: string, selector: string): void {
    const control = this.formulario.get(controlName);
    if (control) {
      // Restablecer el valor del control a vacío
      control.setValue('');
      // Restablecer el estado inicial del elemento del DOM
      const option = document.querySelector(`${selector} option[value=""]`);
      if (option) {
        option.setAttribute('disabled', 'true');
        option.setAttribute('selected', 'true');
        option.setAttribute('hidden', 'true');
      }
    }
  }
  
  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;
	}

  openModalBad(data: ErrorData) {
    console.log(data);
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}
}
