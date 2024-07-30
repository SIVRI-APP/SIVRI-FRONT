import { Component, inject } from '@angular/core';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoInformacionConvocatoria } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';
import { ListarConvocatoriasComponent } from '../../../convocatorias/listar-convocatorias/listar-convocatorias.component';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentos-proyecto',
  standalone: true,
  imports: [ListarConvocatoriasComponent],
  templateUrl: './documentos-proyecto.component.html',
  styleUrl: './documentos-proyecto.component.css'
})
export class DocumentosProyectoComponent {

  // Informacion de la convocatoria asociada
  protected proyectoInformacionConvocatoria:ProyectoInformacionConvocatoria = new ProyectoInformacionConvocatoria();

  private proyectoId:number = 0;

  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  constructor(
    private router: Router,
    protected proyectoObtenerService: ProyectoObtenerService,
    protected proyectoCrearService: ProyectoCrearService
  ) { 
    // Suscribirse a la informacion de la Convocatoria del Proyecto
    proyectoObtenerService.getRegistroInformacionDetallada().subscribe({
        next: (respuesta) => {
          if (respuesta.data.convocatoria != null) {
            this.proyectoInformacionConvocatoria = respuesta.data.convocatoria;
          }
          this.proyectoId = respuesta.data.id;          
        }
    })
  }

  accion(accion: any): void {
    if (accion.accion.accion == 'agregar') {
      this.proyectoCrearService.asociarConvocatoria(this.proyectoId.toString(), accion.data.id).subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          // Captura la respuesta
          this.openModalOk(respuesta.userMessage, "/proyectos/listar/"+ this.proyectoId +"/informacion-general");
        },
        // Manejar errores
        error: (errorData) => {
          // Verificar si el error es del tipo esperado
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
            // Manejar errores inesperados
            this.openModalBad(
              new ErrorData({
                error: 'Error inseperado, contactar a soporte',
              })
            );
          }
        }
      });
    }
  }

  openModalOk(message: string, nuevaUrl: any) {
    const modalRef = this.modalService.open(ModalOkComponent);
    modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Aquí puedes realizar la navegación a otra ruta
        this.router.navigate([nuevaUrl]);
      }
    });
  }

  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }

}
