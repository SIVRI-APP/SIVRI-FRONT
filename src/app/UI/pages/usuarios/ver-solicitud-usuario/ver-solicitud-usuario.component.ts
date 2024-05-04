import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioSolicitudObtenerService } from '../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudObtener.service';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../../../../service/solicitudUsuarios/domain/model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoDocumento } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { Sexo } from '../../../../service/solicitudUsuarios/domain/model/enum/sexo';
import { TipoUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { UsuarioSolicitudCrearService } from '../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudCrear.service';
import { EstadoSolicitudUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/estadoSolicitudUsuario';

@Component({
  selector: 'app-ver-solicitud-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './ver-solicitud-usuario.component.html',
  styleUrl: './ver-solicitud-usuario.component.css'
})
export class VerSolicitudUsuarioComponent implements OnInit {

  protected id!: string;
  protected nombre: string = '';
  protected solicitudUsuario : Respuesta<UsuarioSolicitudInformaciónDetalladaProyección> = new Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>;
  protected crearUsuario: Respuesta<boolean> = new Respuesta<false>;
  protected solicitudUsuarioForm: FormGroup;
  

  protected tipoDocumentoEnum = TipoDocumento;
  protected sexoEnum = Sexo;
  protected tipoUsuarioEnum = TipoUsuario;
  protected estadoSolicitudUsuarioEnum = EstadoSolicitudUsuario;

  getKeys(enumObject: any): string[] {
    return Object.keys(enumObject);
  }

  getValueByKey(enumObject: any, key: string): string {
    return enumObject[key];
  }

  constructor(
    private route: ActivatedRoute,
    private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService,
    private usuarioSolicitudCrearService: UsuarioSolicitudCrearService
  ){
    this.solicitudUsuarioForm = new FormGroup({
      id: new FormControl(''),
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
      estadoSolicitud: new FormControl(''),
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

            this.solicitudUsuarioForm?.get('id')?.setValue(this.solicitudUsuario?.data.id);
            this.solicitudUsuarioForm?.get('id')?.disable()
            this.solicitudUsuarioForm?.get('correo')?.setValue(this.solicitudUsuario?.data.correo);
            this.solicitudUsuarioForm?.get('correo')?.disable()
            this.solicitudUsuarioForm?.get('tipoDocumento')?.setValue(this.solicitudUsuario?.data.tipoDocumento);
            this.solicitudUsuarioForm?.get('tipoDocumento')?.disable()
            this.solicitudUsuarioForm?.get('numeroDocumento')?.setValue(this.solicitudUsuario?.data.numeroDocumento);
            this.solicitudUsuarioForm?.get('numeroDocumento')?.disable()
            this.solicitudUsuarioForm?.get('sexo')?.setValue(this.solicitudUsuario?.data.sexo);
            this.solicitudUsuarioForm?.get('sexo')?.disable()
            this.solicitudUsuarioForm?.get('tipoUsuario')?.setValue(this.solicitudUsuario?.data.tipoUsuario);
            this.solicitudUsuarioForm?.get('tipoUsuario')?.disable()
            this.solicitudUsuarioForm?.get('nombre')?.setValue(this.solicitudUsuario?.data.nombre);
            this.solicitudUsuarioForm?.get('nombre')?.disable()
            this.solicitudUsuarioForm?.get('apellido')?.setValue(this.solicitudUsuario?.data.apellido);
            this.solicitudUsuarioForm?.get('apellido')?.disable(),
            this.solicitudUsuarioForm?.get('telefono')?.setValue(this.solicitudUsuario?.data.telefono);
            this.solicitudUsuarioForm?.get('telefono')?.disable()
            this.solicitudUsuarioForm?.get('cvLac')?.setValue(this.solicitudUsuario?.data.cvLac);
            this.solicitudUsuarioForm?.get('cvLac')?.disable()
            this.solicitudUsuarioForm?.get('nota')?.setValue(this.solicitudUsuario?.data.nota);
            this.solicitudUsuarioForm?.get('nota')?.disable()
            this.solicitudUsuarioForm?.get('estadoSolicitud')?.setValue(this.solicitudUsuario?.data.estado);
            this.solicitudUsuarioForm?.get('estadoSolicitud')?.disable()

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
        this.crearUsuario = respuesta;
      },
      // Manejar errores
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }



}
