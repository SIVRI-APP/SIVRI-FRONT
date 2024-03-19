import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioSolicitudObtenerService } from '../../../../service/solicitudUsuarios/domain/service/UsuarioSolicitudObtenerService';
import { Respuesta } from '../../../../service/common/respuesta';
import { Paginacion } from '../../../../service/common/paginacion';
import { UsuarioSolicitudListarConFiltroProjection } from '../../../../service/solicitudUsuarios/domain/model/UsuarioSolicitudListarConFiltro.projection';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoDocumento } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { TipoUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';

@Component({
  selector: 'app-listar-solicitud-usuario',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './listar-solicitud-usuario.component.html',
  styleUrl: './listar-solicitud-usuario.component.css'
})
export class ListarSolicitudUsuarioComponent {

  constructor(private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService){}

  protected listarForm = new FormGroup({
    pageNo: new FormControl(0),
    pageSize: new FormControl('10'),
    correo: new FormControl(),
    estado: new FormControl(''),
    tipoDocumento: new FormControl(''),
    numeroDocumento: new FormControl(''),
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    tipoUsuario: new FormControl(''),
  });

  listaSolicitudUsuarios: Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>> = new Respuesta<Paginacion<UsuarioSolicitudListarConFiltroProjection>>();


  onSubmit() {
    if (this.listarForm.valid) {

      const pageNo = this.listarForm.get('pageNo')?.value ?? 10;
      const pageSize = parseInt(this.listarForm.get('pageSize')?.value ?? '', 10);
      const correo = this.listarForm.get('correo')?.value;
      const estado = this.listarForm.get('estado')?.value;
      const tipoDocumentoString = this.listarForm.get('tipoDocumento')?.value;
      const tipoDocumento: TipoDocumento | undefined = tipoDocumentoString ? TipoDocumento[tipoDocumentoString as keyof typeof TipoDocumento] : undefined;
      const numeroDocumento = this.listarForm.get('numeroDocumento')?.value;
      const nombres = this.listarForm.get('nombres')?.value;
      const apellidos = this.listarForm.get('apellidos')?.value;
      const tipoUsuarioString = this.listarForm.get('tipoUsuario')?.value;
      const tipoUsuario: TipoUsuario | undefined = tipoUsuarioString ? TipoUsuario[tipoUsuarioString as keyof typeof TipoUsuario] : undefined;
           
      this.usuarioSolicitudObtenerService.listarConFiltro(
        pageNo,
        pageSize,
        correo ?? undefined,
        estado ?? undefined,
        tipoDocumento ?? undefined,
        numeroDocumento ?? undefined,
        nombres ?? undefined,
        apellidos ?? undefined,
        tipoUsuario ?? undefined,
      ).subscribe({
        next: (respuesta) => {
          this.listaSolicitudUsuarios = respuesta;
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
  
        },
      });
    } else {
      this.listarForm.markAllAsTouched();
      throw new Error('Formulario no valido');
    }
  }


  changePage(newPage: number): void {
    // Asegúrate de que newPage no sea menor que 0
    const nextPage = Math.max(newPage-1, 0);

    // Actualizar el valor de pageNo en el formulario
    this.listarForm.get('pageNo')?.setValue(nextPage);

    this.onSubmit(); // Asumiendo que esta función carga los datos basados en el estado actual del formulario.
  }

  movePage(newPage: string): void {
    if (newPage === 'atras') {
      this.listarForm.get('pageNo')?.setValue((this.listarForm.get('pageNo')?.value ?? 0)-1);
    }else{
      this.listarForm.get('pageNo')?.setValue((this.listarForm.get('pageNo')?.value ?? 0)+1);
    }
    
    this.onSubmit(); // Asumiendo que esta función carga los datos basados en el estado actual del formulario.
  }

}
