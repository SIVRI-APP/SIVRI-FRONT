import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../../../../../service/solicitudUsuarios/domain/model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';
import { TipoDocumento } from '../../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { Sexo } from '../../../../../service/solicitudUsuarios/domain/model/enum/sexo';
import { TipoUsuario } from '../../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { EstadoSolicitudUsuario } from '../../../../../service/solicitudUsuarios/domain/model/enum/estadoSolicitudUsuario';
import { UsuarioSolicitudCrearService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudCrear.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { ModalGetObservacionComponent } from '../../../../shared/modal-get-observacion/modal-get-observacion.component';
import { AuthService } from '../../../../../service/auth/domain/service/auth.service';
import { UsuarioSolicitudObtenerService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudObtener.service';
import { InformacionUsuarioAutenticadoService } from '../../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-informacion-general',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './informacion-general.component.html',
  styleUrl: './informacion-general.component.css'
})
export class InformacionGeneralComponent implements OnInit{

  // Regsitro que se esta manipulando
  protected id!: number;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  // Datos del Usuario
  protected solicitudUsuario : Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;
  // Formulario reactivo
  protected formulario: FormGroup;
  // Enumeraciones que llenan los select
  protected tipoDocumentoEnum = TipoDocumento;
  protected sexoEnum = Sexo;
  protected tipoUsuarioEnum = TipoUsuario;
  protected estadoSolicitudUsuarioEnum = EstadoSolicitudUsuario;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioSolicitudCrearService: UsuarioSolicitudCrearService,
    private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService,
    protected enumTranslationService: EnumTranslationService,
    protected authService: AuthService,
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ){
    this.respuesta = new Respuesta<false>;
    this.solicitudUsuario = new Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>;
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
      estadoSolicitud: ['', [Validators.required]],
      cvLac: [''],
      nota: ['', Validators.maxLength(1000)]
    });
  }
  
  ngOnInit(): void {

    this.usuarioSolicitudObtenerService.getSolicitudUsuarioInformaciónDetallada()
      .subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          // Captura la respuesta
          this.solicitudUsuario = respuesta;

          this.id = this.solicitudUsuario?.data.id;
          this.formulario?.get('id')?.setValue(this.solicitudUsuario?.data.id);
          this.formulario?.get('id')?.disable()          

          this.formulario?.get('correo')?.setValue(this.solicitudUsuario?.data.correo);          
          this.formulario?.get('tipoDocumento')?.setValue(this.solicitudUsuario?.data.tipoDocumento);          
          this.formulario?.get('numeroDocumento')?.setValue(this.solicitudUsuario?.data.numeroDocumento);          
          this.formulario?.get('sexo')?.setValue(this.solicitudUsuario?.data.sexo);          
          this.formulario?.get('tipoUsuario')?.setValue(this.solicitudUsuario?.data.tipoUsuario);          
          this.formulario?.get('nombre')?.setValue(this.solicitudUsuario?.data.nombre);          
          this.formulario?.get('apellido')?.setValue(this.solicitudUsuario?.data.apellido);          
          this.formulario?.get('telefono')?.setValue(this.solicitudUsuario?.data.telefono);          
          this.formulario?.get('cvLac')?.setValue(this.solicitudUsuario?.data.cvLac);          
          this.formulario?.get('nota')?.setValue(this.solicitudUsuario?.data.nota);          
          this.formulario?.get('estadoSolicitud')?.setValue(this.solicitudUsuario?.data.estado);
          

          if (this.informacionUsuarioAutenticadoService.esFuncionario()) {
            if (this.informacionUsuarioAutenticadoService.esFuncionarioUsuarios() && respuesta.data.estado == this.enumTranslationService.getKeyByValue(EstadoSolicitudUsuario, EstadoSolicitudUsuario.FORMULADO_OBSERVACIONES)) {
              console.log("Es USUARIOS")
              this.deshabilitarCamposDelFormulario();
            }else if (!this.informacionUsuarioAutenticadoService.esFuncionarioUsuarios()) {
              console.log("NO Es USUARIOS")
              this.deshabilitarCamposDelFormulario();
            }            
          }else if(respuesta.data.estado == this.enumTranslationService.getKeyByValue(EstadoSolicitudUsuario, EstadoSolicitudUsuario.REVISION_VRI)){
            this.deshabilitarCamposDelFormulario();
          }
          
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
      });
  }

  deshabilitarCamposDelFormulario(){
    this.formulario?.get('correo')?.disable()
    this.formulario?.get('tipoDocumento')?.disable()
    this.formulario?.get('numeroDocumento')?.disable()
    this.formulario?.get('sexo')?.disable()
    this.formulario?.get('tipoUsuario')?.disable()
    this.formulario?.get('nombre')?.disable()
    this.formulario?.get('apellido')?.disable()
    this.formulario?.get('telefono')?.disable()
    this.formulario?.get('cvLac')?.disable()
    this.formulario?.get('nota')?.disable()
    this.formulario?.get('estadoSolicitud')?.disable()
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

  rechazarSolicitud(){
    //Preparar la ULR donde enviaremos al usuario
    let pathActual = this.router.url; 
    const segmentos = pathActual.split('/');
    segmentos.pop();
    pathActual = segmentos.join('/');
    const nuevaUrl = `${pathActual}/observaciones`;

    const modalRef = this.modalService.open(ModalGetObservacionComponent);
    modalRef.componentInstance.mensaje = '¿Estas seguro de devolver esta solicitud de Usuario con observaciones?';
    modalRef.componentInstance.restriccion = 'La Observación debe contener (10 - 1000 caracteres)';

    // Esperara a la Modal
    modalRef.componentInstance.enviarInformacion.subscribe((informacion: string) => {
      this.usuarioSolicitudCrearService.rechazarSolicitudUsuario({
        usuarioSolicitudId: this.formulario.getRawValue().id,
        observacion: informacion,
      })
      .subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          this.openModalOk(respuesta.userMessage, nuevaUrl)
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
    });
  }

  enviarRevisionVRI(){
    //Preparar la ULR donde enviaremos al usuario
    let pathActual = this.router.url; 
    const segmentos = pathActual.split('/');
    segmentos.pop();
    pathActual = segmentos.join('/');
    const nuevaUrl = `${pathActual}/observaciones`;

    const modalRef = this.modalService.open(ModalGetObservacionComponent);
    modalRef.componentInstance.mensaje = '¿Estas seguro de que corrigieron las observaciones?';
    modalRef.componentInstance.restriccion = 'La Observación debe contener (10 - 1000 caracteres)';

    // Esperara a la Modal
    modalRef.componentInstance.enviarInformacion.subscribe((informacion: string) => {
      this.usuarioSolicitudCrearService.enviarRevisionVRI({
        usuarioSolicitudId: this.formulario.getRawValue().id,
        observacion: informacion,
      })
      .subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          this.openModalOk(respuesta.userMessage, nuevaUrl)
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
    });
  }

  onSubmit(): void {
    //Preparar la ULR donde enviaremos al usuario
    let pathActual = this.router.url; 
    const segmentos = pathActual.split('/');
    segmentos.pop();
    segmentos.pop();
    pathActual = segmentos.join('/');

    this.usuarioSolicitudCrearService.aprobarSolicitudUsuario(this.id)
    .subscribe({
      // Manejar respuesta exitosa
      next: (respuesta) => {
        // Captura la respuesta
        this.respuesta = respuesta;

        this.openModalOk(this.respuesta.userMessage, pathActual)
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
  }

  openModalOk(message: string, nuevaUrl:any) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Aquí puedes realizar la navegación a otra ruta
        this.router.navigate(["/" + nuevaUrl]);
      }
    });
	}

  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}
}
