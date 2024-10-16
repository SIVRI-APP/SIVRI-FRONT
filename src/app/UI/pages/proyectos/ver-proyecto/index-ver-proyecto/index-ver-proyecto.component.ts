import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoDetalladoDTO } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoDetalladoDTO';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { EstadoProyecto } from '../../../../../service/proyecto/domain/model/enum/estadoProyecto';
import { VerProyectoService } from '../ver-proyecto.service';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { InformacionUsuarioAutenticadoService } from '../../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';
import { ModalService } from '../../../../../service/common/modalService';

@Component({
  selector: 'app-index-ver-proyecto',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './index-ver-proyecto.component.html',
  styleUrl: './index-ver-proyecto.component.css'
})
export class IndexVerProyectoComponent implements OnInit{

  roles: string[] = [];


  // Mensaje al usuario
  public tituloInstruccion: string = '';
  public instruccion: string = '';

  // Informacion del Proyecto proveniente del Back
  protected informacionDetalladaProyecto: Respuesta<ProyectoDetalladoDTO>;
  protected estadoProyectoEnum = EstadoProyecto;

  //Estados Proyecto
  protected aprobado = false;
  protected formuladoConObservaciones = false;
  protected revisionVri = false;
  protected btnGuardarCambios = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    protected verProyectoService: VerProyectoService,
    private proyectoObtenerService: ProyectoObtenerService,
    private proyectoCrearService: ProyectoCrearService,
    protected enumTranslationService: EnumTranslationService,
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService,
    protected modalService: ModalService
  ){
    this.informacionDetalladaProyecto = new Respuesta(0, '', '', new ProyectoDetalladoDTO());
    this.roles = informacionUsuarioAutenticadoService.retornarRoles();
  }

  ngOnInit() {
    // Suscribirse a los observables
    this.route.params.subscribe(params => {
      this.proyectoObtenerService.obtenerInformaciónDetallada(params['id']);
      this.proyectoObtenerService.informacionDetalladaProyecto.subscribe({
        next: (respuesta) => {
          this.informacionDetalladaProyecto = respuesta;
          this.verProyectoService.construirFormulario(this.informacionDetalladaProyecto.data);
          this.estadosVisibles(respuesta.data.informacionDetalladaProyecto.estado);
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

  estadosVisibles(estadoProyecto: EstadoProyecto){
    if (this.informacionUsuarioAutenticadoService.esFuncionarioProyectos() && estadoProyecto == this.enumTranslationService.getKeyByValue(EstadoProyecto, EstadoProyecto.REVISION_VRI)) {
      this.formuladoConObservaciones = true;
      this.btnGuardarCambios = false;
    }
    
    if (this.informacionUsuarioAutenticadoService.esFuncionarioProyectos() && estadoProyecto == this.enumTranslationService.getKeyByValue(EstadoProyecto, EstadoProyecto.REVISION_VRI)) {
      this.aprobado = true;
      this.btnGuardarCambios = false;
    }

    if (this.informacionUsuarioAutenticadoService.esInvestigadorProyectos() && estadoProyecto == this.enumTranslationService.getKeyByValue(EstadoProyecto, EstadoProyecto.FORMULADO)) {
      this.revisionVri = true;
      this.btnGuardarCambios = false;
    }

    if (this.informacionUsuarioAutenticadoService.esInvestigadorProyectos() && estadoProyecto == this.enumTranslationService.getKeyByValue(EstadoProyecto, EstadoProyecto.FORMULADO_OBSERVACIONES)) {
      this.revisionVri = true;
      this.btnGuardarCambios = false;
    }
  }

  guardarCambios() {
    this.proyectoCrearService.  guardar(this.verProyectoService.formularioInformacionDetalladaProyecto.getRawValue()).subscribe({
          next: (respuesta) => {
            this.modalService.openModalOk(respuesta.userMessage)
          },
          error: (errorData) => {
            if (errorData.error && errorData.error.data) {
              let respuesta: Respuesta<ErrorData> = errorData.error;
              this.modalService.openModalBad(respuesta.data);
            } else {
              this.modalService.openModalBad(
                new ErrorData({
                  error: 'Error inseperado, contactar a soporte',
                })
              );
            }
          }
    });
  }

  enviarProyectoRevisionVRI() {
    const proyectoId = this.informacionDetalladaProyecto.data.informacionDetalladaProyecto.id?.toString();
    const estado = this.enumTranslationService.getKeyByValue(EstadoProyecto, EstadoProyecto.REVISION_VRI);

    if (proyectoId && estado) {
      this.proyectoCrearService.cambiarEstado(proyectoId, estado).subscribe({
        next: (respuesta) => {
          this.modalService.openModalOk(respuesta.userMessage, "/proyectos/listar");
        },
        error: (errorData) => {
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.modalService.openModalBad(respuesta.data);
          } else {
            this.modalService.openModalBad(
              new ErrorData({
                error: 'Error inseperado, contactar a soporte',
              })
            );
          }
        }
      })
    }
  }

  aprobarProyecto() {
    const proyectoId = this.informacionDetalladaProyecto.data.informacionDetalladaProyecto.id?.toString();
    const estado = this.enumTranslationService.getKeyByValue(EstadoProyecto, EstadoProyecto.APROBADO);

    if (proyectoId && estado) {
      this.proyectoCrearService.cambiarEstado(proyectoId, estado).subscribe({
        next: (respuesta) => {
          this.modalService.openModalOk(respuesta.userMessage, "/proyectos/listar");
        },
        error: (errorData) => {
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.modalService.openModalBad(respuesta.data);
          } else {
            this.modalService.openModalBad(
              new ErrorData({
                error: 'Error inseperado, contactar a soporte',
              })
            );
          }
        }
      })
    }
  }
    
  formularProyectoConObservaciones() {
    const proyectoId = this.informacionDetalladaProyecto.data.informacionDetalladaProyecto.id?.toString();
    const estado = this.enumTranslationService.getKeyByValue(EstadoProyecto, EstadoProyecto.FORMULADO_OBSERVACIONES);

    if (proyectoId && estado) {
      this.proyectoCrearService.cambiarEstado(proyectoId, estado).subscribe({
        next: (respuesta) => {
          this.modalService.openModalOk(respuesta.userMessage, "/proyectos/listar");
        },
        error: (errorData) => {
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.modalService.openModalBad(respuesta.data);
          } else {
            this.modalService.openModalBad(
              new ErrorData({
                error: 'Error inseperado, contactar a soporte',
              })
            );
          }
        }
      })
    }
  }
}
