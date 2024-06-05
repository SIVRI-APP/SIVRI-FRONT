import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorData } from '../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../modal-bad/modal-bad.component';
import { ModalOkComponent } from '../../modal-ok/modal-ok.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CredencialService } from '../../../../service/auth/domain/service/credencial.service';
import { Respuesta } from '../../../../service/common/model/respuesta';

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
    private formBuilder: FormBuilder,
    private credencialService: CredencialService
  ) {
    this.formulario = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(245)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(245)]],
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

      if (this.contraseniasCoinciden()) {
        this.route.params.subscribe(params => {
          this.id = params['id']; 
        });  
        
        // Realizar solicitud
        this.credencialService
          .crearActualizarCredencial({
            passwordRecoveryCode: this.id,
            password: this.formulario.value.password,
            repeatPassword: this.formulario.value.verifyPassword
          })
          .subscribe({
            // Manejar respuesta exitosa
            next: (respuesta) => {
              this.openModalOk("Contraseña asignada correctamente, Inicia Sesión para continuar.");
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
      }else{
        this.openModalBad(new ErrorData({error: "Las contraseñas no Coinciden"}));
      }
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
