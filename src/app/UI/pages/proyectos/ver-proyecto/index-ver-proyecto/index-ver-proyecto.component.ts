import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoInformaciónDetalladaProyección } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { EstadoProyecto } from '../../../../../service/proyecto/domain/model/enum/estadoProyecto';
import { VerProyectoService } from '../ver-proyecto.service';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';

@Component({
  selector: 'app-index-ver-proyecto',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './index-ver-proyecto.component.html',
  styleUrl: './index-ver-proyecto.component.css'
})
export class IndexVerProyectoComponent implements OnInit{

  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Mensaje al usuario
  public tituloInstruccion: string = '';
  public instruccion: string = '';

  // Informacion del Proyecto proveniente del Back
  protected informacionDetalladaProyecto: Respuesta<ProyectoInformaciónDetalladaProyección>;
  protected estadoProyectoEnum = EstadoProyecto;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    protected verProyectoService: VerProyectoService,
    private proyectoObtenerService: ProyectoObtenerService,
    private proyectoCrearService: ProyectoCrearService,
    protected enumTranslationService: EnumTranslationService
  ){
    this.informacionDetalladaProyecto = new Respuesta(0, '', '', new ProyectoInformaciónDetalladaProyección());
  }

  ngOnInit() {
    // Suscribirse a los observables
    this.route.params.subscribe(params => {
      this.proyectoObtenerService.obtenerInformaciónDetallada(params['id']);
      this.proyectoObtenerService.informacionDetalladaProyecto.subscribe({
        next: (respuesta) => {
          this.informacionDetalladaProyecto = respuesta;
          this.verProyectoService.construirFormulario(this.informacionDetalladaProyecto.data);
        }
      });

    });  
        
    this.verProyectoService.tituloInstruccion$.subscribe(titulo => {
      this.tituloInstruccion = titulo;
      this.cdr.detectChanges(); // Forzar detección de cambios
    });

    this.verProyectoService.instruccion$.subscribe(instruccion => {
      this.instruccion = instruccion;
      this.cdr.detectChanges(); // Forzar detección de cambios
    });
  }

  guardarCambios() {
    console.log(this.verProyectoService.formularioInformacionDetalladaProyecto)

    this.proyectoCrearService.  guardar(this.verProyectoService.formularioInformacionDetalladaProyecto.getRawValue()).subscribe({
          next: (respuesta) => {
            this.openModalOk(respuesta.userMessage)
          },
          error: (errorData) => {
            if (errorData.error && errorData.error.data) {
              let respuesta: Respuesta<ErrorData> = errorData.error;
              this.openModalBad(respuesta.data);
            } else {
              this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
            }
          }
    });
  }

  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;

    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Recargar el componente actual
        this.router.navigate([this.router.url]);
      }
    });
	}

  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}
}
