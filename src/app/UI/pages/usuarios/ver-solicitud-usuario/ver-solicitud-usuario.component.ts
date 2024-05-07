import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioSolicitudObtenerService } from '../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudObtener.service';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../../../../service/solicitudUsuarios/domain/model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoDocumento } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { Sexo } from '../../../../service/solicitudUsuarios/domain/model/enum/sexo';
import { TipoUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { UsuarioSolicitudCrearService } from '../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudCrear.service';
import { EstadoSolicitudUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/estadoSolicitudUsuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../shared/modal-bad/modal-bad.component';
import { ErrorData } from '../../../../service/common/model/errorData';

@Component({
  selector: 'app-ver-solicitud-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './ver-solicitud-usuario.component.html',
  styleUrl: './ver-solicitud-usuario.component.css'
})
export class VerSolicitudUsuarioComponent implements OnInit {

  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  //Campos que ayuda a la visualizacion
  protected id!: string;
  protected nombre: string = '';
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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService,
    private usuarioSolicitudCrearService: UsuarioSolicitudCrearService
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.usuarioSolicitudObtenerService.obtenerSolicitudUsuarioInformaciónDetallada(this.id)
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            // Captura la respuesta
            this.solicitudUsuario = respuesta;

            this.formulario?.get('id')?.setValue(this.solicitudUsuario?.data.id);
            this.formulario?.get('id')?.disable()
            
            this.formulario?.get('correo')?.setValue(this.solicitudUsuario?.data.correo);
            this.formulario?.get('correo')?.disable()
            this.formulario?.get('tipoDocumento')?.setValue(this.solicitudUsuario?.data.tipoDocumento);
            this.formulario?.get('tipoDocumento')?.disable()
            this.formulario?.get('numeroDocumento')?.setValue(this.solicitudUsuario?.data.numeroDocumento);
            this.formulario?.get('numeroDocumento')?.disable()
            this.formulario?.get('sexo')?.setValue(this.solicitudUsuario?.data.sexo);
            this.formulario?.get('sexo')?.disable()
            this.formulario?.get('tipoUsuario')?.setValue(this.solicitudUsuario?.data.tipoUsuario);
            this.formulario?.get('tipoUsuario')?.disable()
            this.formulario?.get('nombre')?.setValue(this.solicitudUsuario?.data.nombre);
            this.formulario?.get('nombre')?.disable()
            this.formulario?.get('apellido')?.setValue(this.solicitudUsuario?.data.apellido);
            this.formulario?.get('apellido')?.disable(),
            this.formulario?.get('telefono')?.setValue(this.solicitudUsuario?.data.telefono);
            this.formulario?.get('telefono')?.disable()
            this.formulario?.get('cvLac')?.setValue(this.solicitudUsuario?.data.cvLac);
            this.formulario?.get('cvLac')?.disable()
            this.formulario?.get('nota')?.setValue(this.solicitudUsuario?.data.nota);
            this.formulario?.get('nota')?.disable()
            this.formulario?.get('estadoSolicitud')?.setValue(this.solicitudUsuario?.data.estado);
            this.formulario?.get('estadoSolicitud')?.disable()

            this.nombre = this.solicitudUsuario.data.nombre + ' ' + this.solicitudUsuario.data.apellido;
          },
          // Manejar errores
          error: (errorData) => {
            console.error(errorData);
          }
        });
    });   
  }

  onSubmit(): void {
    this.usuarioSolicitudCrearService.aprobarSolicitudUsuario(this.id)
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
  }


  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;
	}

  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}



}
