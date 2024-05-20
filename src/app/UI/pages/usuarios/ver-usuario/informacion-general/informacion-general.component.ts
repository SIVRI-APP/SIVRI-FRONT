import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInformaciónDetalladaProyección } from '../../../../../service/solicitudUsuarios/domain/model/proyecciones/usuarioInformaciónDetalladaProyección';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoDocumento } from '../../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { Sexo } from '../../../../../service/solicitudUsuarios/domain/model/enum/sexo';
import { TipoUsuario } from '../../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { Router } from '@angular/router';
import { UsuarioObtenerService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioObtener.service';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { ErrorData } from '../../../../../service/common/model/errorData';

@Component({
  selector: 'app-informacion-general',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './informacion-general.component.html',
  styleUrl: './informacion-general.component.css'
})
export class InformacionGeneralComponent implements OnInit {

  // Regsitro que se esta manipulando
  protected id!: number;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  // Datos del Usuario
  protected usuario : Respuesta<UsuarioInformaciónDetalladaProyección>;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;
  // Formulario reactivo
  protected formulario: FormGroup;
  // Enumeraciones que llenan los select
  protected tipoDocumentoEnum = TipoDocumento;
  protected sexoEnum = Sexo;
  protected tipoUsuarioEnum = TipoUsuario;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioObtenerService: UsuarioObtenerService,
    protected enumTranslationService: EnumTranslationService
  ){
    this.respuesta = new Respuesta<false>;
    this.usuario = new Respuesta<UsuarioInformaciónDetalladaProyección>;
    this.formulario = this.formBuilder.group({
      id: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      sexo: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      cvLac: [''],
    });
  }

  ngOnInit(): void {
    this.usuarioObtenerService.getUsuarioInformaciónDetallada()
      .subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          // Captura la respuesta
          this.usuario = respuesta;

          this.id = this.usuario?.data.id;
          this.formulario?.get('id')?.setValue(this.usuario?.data.id);
          this.formulario?.get('id')?.disable()
          
          this.formulario?.get('correo')?.setValue(this.usuario?.data.correo);
          this.formulario?.get('tipoDocumento')?.setValue(this.usuario?.data.tipoDocumento);
          this.formulario?.get('numeroDocumento')?.setValue(this.usuario?.data.numeroDocumento);
          this.formulario?.get('sexo')?.setValue(this.usuario?.data.sexo);
          this.formulario?.get('tipoUsuario')?.setValue(this.usuario?.data.tipoUsuario);
          this.formulario?.get('nombre')?.setValue(this.usuario?.data.nombre);
          this.formulario?.get('apellido')?.setValue(this.usuario?.data.apellido);
          this.formulario?.get('telefono')?.setValue(this.usuario?.data.telefono);
          this.formulario?.get('cvLac')?.setValue(this.usuario?.data.cvLac);
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
      });
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

  onSubmit(): void {
    alert("Falta implementar esta funcionalidad")
    // this.usuarioCrearService.actualizarUsuario(this.id)
    // .subscribe({
    //   // Manejar respuesta exitosa
    //   next: (respuesta) => {
    //     // Captura la respuesta
    //     this.respuesta = respuesta;

    //     this.openModalOk(this.respuesta.userMessage)
    //   },
    //   // Manejar errores
    //   error: (errorData) => {
    //     // Verificar si el error es del tipo esperado
    //     if (errorData.error && errorData.error.data) {
    //       let respuesta: Respuesta<ErrorData> = errorData.error;
    //       this.openModalBad(respuesta.data);
    //     } else {
    //       // Manejar errores inesperados
    //       this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
    //     }
    //   }
    // });
  }

  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Aquí puedes realizar la navegación a otra ruta
        this.router.navigate(['/usuarios/listar-usuarios']);
      }
    });
	}

  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}
}
