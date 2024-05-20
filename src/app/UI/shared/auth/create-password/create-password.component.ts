import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorData } from '../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../modal-bad/modal-bad.component';
import { ModalOkComponent } from '../../modal-ok/modal-ok.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent {

  protected id!: string;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  // Formulario reactivo
  protected formulario: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    });
  }

  /**
   * Maneja el envío del formulario.
   *
   * Si el formulario es válido, realiza una solicitud para obtener la respuesta.
   * Actualiza la lista de solicitudes de usuario y el texto de visualización en consecuencia.
   *
   * Si el formulario no es válido, marca todos los campos como tocados y lanza un error.
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formulario.valid) {

      this.route.params.subscribe(params => {
        this.id = params['id']; 
        console.log(this.id);
      });  
      
      // // Realizar solicitud para obtener los datos filtrados
      // this.usuarioSolicitudCrearService
      //   .crearSolicitudUsuario({
      //     correo: this.formulario.value.correo,
      //     tipoDocumento: this.formulario.value.tipoDocumento,
      //     numeroDocumento: this.formulario.value.numeroDocumento,
      //     sexo: this.formulario.value.sexo,
      //     tipoUsuario: this.formulario.value.tipoUsuario,
      //     nombre: this.formulario.value.nombre,
      //     apellido: this.formulario.value.apellido,
      //     telefono: this.formulario.value.telefono,
      //     cvLac: this.formulario.value.cvLac,
      //     nota: this.formulario.value.nota,
      //     programaId: 1,
      //     organismoDeInvestigacionId: 1,
      //     rolGrupoId: 1,
      //   })
      //   .subscribe({
      //     // Manejar respuesta exitosa
      //     next: (respuesta) => {
      //       // Captura la respuesta
      //       this.respuesta = respuesta;

      //       this.openModalOk(this.respuesta.userMessage)
      //     },
      //     // Manejar errores
      //     error: (errorData) => {
      //       // Verificar si el error es del tipo esperado
      //       if (errorData.error && errorData.error.data) {
      //         let respuesta: Respuesta<ErrorData> = errorData.error;
      //         this.openModalBad(respuesta.data);
      //       } else {
      //         // Manejar errores inesperados
      //         this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
      //       }
      //     }
      //   });
    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.formulario.markAllAsTouched();
    }
  }

  contraseniasCoinciden(): boolean{
    if (this.formulario.value.password == this.formulario.value.verifyPassword) {
      return true;
    }

    return false;
  }


  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Aquí puedes realizar la navegación a otra ruta
        this.router.navigate(['/login']);
      }
    });
	}

  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}
}
