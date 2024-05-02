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

@Component({
  selector: 'app-crear-solicitud-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-solicitud-usuario.component.html',
  styleUrl: './crear-solicitud-usuario.component.css',
})
export class CrearSolicitudUsuarioComponent {

  private modalService = inject(NgbModal);
  
  constructor(
    private usuarioSolicitudCrearService: UsuarioSolicitudCrearService
  ) {}


  protected creado: Respuesta<boolean> = new Respuesta<false>();

  protected crearForm = new FormGroup({
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

  tipoDocumentoEnum = TipoDocumento;
  sexoEnum = Sexo;
  tipoUsuarioEnum = TipoUsuario;

  getKeys(enumObject: any): string[] {
    return Object.keys(enumObject);
  }

  getValueByKey(enumObject: any, key: string): string {
    return enumObject[key];
  }

  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.crearForm.valid) {
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
            this.creado = respuesta;
            console.log(this.creado);

            this.openModalOk(this.creado.userMessage)
          },
          // Manejar errores
          error: (error) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // Error del lado del cliente
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // Error del lado del servidor
              errorMessage = error.error.userMessage || 'Ocurrió un error en el servidor';
            }
            // Manejar el error aquí
            console.error(errorMessage);
            this.openModalBad(errorMessage);
          },
          // Ejecutar acciones al completar la solicitud
          complete: () => {},
        });
    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.crearForm.markAllAsTouched();
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
    const correo = this.crearForm.get('correo')?.value ?? undefined;
    const numeroDocumento =
      this.crearForm.get('numeroDocumento')?.value ?? undefined;
    const nombre = this.crearForm.get('nombre')?.value ?? undefined;
    const apellido = this.crearForm.get('apellido')?.value ?? undefined;
    const telefono = this.crearForm.get('telefono')?.value ?? undefined;
    const cvLac = this.crearForm.get('cvLac')?.value ?? undefined;
    const nota = this.crearForm.get('nota')?.value ?? undefined;
    const tipoUsuario = this.crearForm.get('tipoUsuario')?.value ?? undefined;
    const tipoDocumento = this.crearForm.get('tipoDocumento')?.value ?? undefined;
    const sexo = this.crearForm.get('sexo')?.value ?? undefined;

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
    this.crearForm.reset();

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
    const control = this.crearForm.get(controlName);
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
  openModalBad(message: string) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.name = message;
	}
}
