import { Component, OnInit, inject } from '@angular/core';
import { UsuarioSolicitudInformaciónDetalladaProyección } from '../../../../../service/solicitudUsuarios/domain/model/proyecciones/usuarioSolicitudInformaciónDetalladaProyección';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { Router } from '@angular/router';
import { ModalInterroganteComponent } from '../../../../shared/modal-interrogante/modal-interrogante.component';
import { UsuarioSolicitudCrearService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudCrear.service';
import { UsuarioSolicitudObtenerService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudObtener.service';
import { InformacionUsuarioAutenticadoService } from '../../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-observaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observaciones.component.html',
  styleUrl: './observaciones.component.css'
})
export class ObservacionesComponent implements OnInit{

  // Regsitro que se esta manipulando
  protected id!: number;
  // Datos del Usuario
  protected solicitudUsuario : Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>;

  // Repustas
  protected resolverObservacionesRta : Respuesta<Boolean>;

  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  
  constructor(
    private router: Router,
    private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService,
    private usuarioSolicitudCrearService: UsuarioSolicitudCrearService,
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ){
    this.solicitudUsuario = new Respuesta<UsuarioSolicitudInformaciónDetalladaProyección>;
    this.resolverObservacionesRta = new Respuesta<Boolean>;
  }

  ngOnInit(): void {
    this.usuarioSolicitudObtenerService.getSolicitudUsuarioInformaciónDetallada()
      .subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          // Captura la respuesta
          this.solicitudUsuario = respuesta;
          this.id = this.solicitudUsuario?.data.id;
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
      });
  }

  resolverObservaciones() {
    let pathActual = this.router.url; 
    const segmentos = pathActual.split('/');
    segmentos.pop();
    pathActual = segmentos.join('/');

    // Modal de confirmacion
    const modalRef = this.modalService.open(ModalInterroganteComponent);
		modalRef.componentInstance.name = "Se marcaran todas las Observaciones como resueltas. ¿Desea Continuar?";

    // Depues de recibir la confirmacion
    modalRef.result.then((result) => {
      this.usuarioSolicitudCrearService.resolverObservacion(this.solicitudUsuario.data.observaciones.id)
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            // Captura la respuesta
            this.resolverObservacionesRta = respuesta;
            this.openModalOk(this.resolverObservacionesRta.userMessage, pathActual)
          },
          // Manejar errores
          error: (errorData) => {
            console.error(errorData);
          }
        });
    });
  }

  openModalOk(message: string, url:any) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Aquí puedes realizar la navegación a otra ruta
        this.router.navigate(["/" + url]);
      }
    });
	}

}
