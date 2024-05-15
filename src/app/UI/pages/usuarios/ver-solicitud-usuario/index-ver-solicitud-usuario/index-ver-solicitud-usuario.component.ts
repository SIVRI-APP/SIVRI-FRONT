import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../../../../../service/solicitudUsuarios/domain/model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoDocumento } from '../../../../../service/solicitudUsuarios/domain/model/enum/tipoDocumento';
import { Sexo } from '../../../../../service/solicitudUsuarios/domain/model/enum/sexo';
import { TipoUsuario } from '../../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { EstadoSolicitudUsuario } from '../../../../../service/solicitudUsuarios/domain/model/enum/estadoSolicitudUsuario';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsuarioSolicitudObtenerService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudObtener.service';
import { UsuarioSolicitudCrearService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudCrear.service';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';

@Component({
  selector: 'app-index-ver-solicitud-usuario',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './index-ver-solicitud-usuario.component.html',
  styleUrl: './index-ver-solicitud-usuario.component.css'
})
export class IndexVerSolicitudUsuarioComponent implements OnInit{
  
  //Campos que ayuda a la visualizacion
  protected id!: string;
  protected nombre: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.usuarioSolicitudObtenerService.obtenerSolicitudUsuarioInformaciónDetallada(this.id)
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            this.nombre = respuesta.data.nombre + ' ' + respuesta.data.apellido;
          },
          // Manejar errores
          error: (errorData) => {
            console.error(errorData);
          }
        });
    });   
  }

}
