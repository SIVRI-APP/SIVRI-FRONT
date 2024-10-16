import { Component, inject, OnInit } from '@angular/core';
import { VerProyectoService } from '../ver-proyecto.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ListarConvocatoriasComponent } from '../../../convocatorias/listar-convocatorias/listar-convocatorias.component';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { Router } from '@angular/router';
import { TipoFinanciacion } from '../../../../../service/convocatoria/domain/model/enum/tipoFinanciacion';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { ResponsableDocumento } from '../../../../../service/convocatoria/domain/model/enum/responsableDocumento';

@Component({
  selector: 'app-documentos-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, ListarConvocatoriasComponent],
  templateUrl: './documentos-proyecto.component.html',
  styleUrl: './documentos-proyecto.component.css'
})
export class DocumentosProyectoComponent implements OnInit{

  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  private proyectoId: string = '';
  
  private formularioSubscription: Subscription | null = null;
  protected EvidenciasDocumentosConvocatoria: FormGroup | null = null;
  protected convocatoria: FormGroup | null = null;

  protected tipoFinanciacionEnum = TipoFinanciacion;
  protected responsableDocumentoEnum = ResponsableDocumento;

  constructor(
    private router: Router,
    protected verProyectoService: VerProyectoService,
    protected proyectoCrearService: ProyectoCrearService,
    protected enumTranslationService:EnumTranslationService
  ) {
  }

  ngOnInit() {    
    this.verProyectoService.setTituloInstruccion("Convocatoria Asociada al Proyecto");
    this.verProyectoService.setInstruccion("En esta sección se presenta la información de la convocatoria asociada al proyecto, junto con la gestión de los documentos requeridos.");

    this.formularioSubscription = this.verProyectoService.formularioListo.subscribe(formulario => {
      if (formulario) {
        this.proyectoId = formulario.get('informacionGeneral')?.get('id')?.getRawValue();
        this.EvidenciasDocumentosConvocatoria = formulario.get('EvidenciasDocumentosConvocatoria') as FormGroup;
        this.convocatoria = formulario.get('convocatoria') as FormGroup;
        this.subscribeToFormChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.formularioSubscription) {
      this.formularioSubscription.unsubscribe();
    }
  }

  private subscribeToFormChanges() {
    if (this.EvidenciasDocumentosConvocatoria) {
      const controls = this.EvidenciasDocumentosConvocatoria.controls;
      Object.keys(controls).forEach(key => {
        const control = controls[key] as FormControl;
        control.valueChanges.subscribe(() => {
          control.valueChanges.pipe(
            debounceTime(300) // Tiempo para evitar múltiples actualizaciones rápidas
          ).subscribe(value => {
            if (control.touched) {
              this.actualizarCampo(`convocatoria.${key}`, value);
            }
          });
        });
      });
    }
  }

  // Ejemplo de método para actualizar un campo específico en ('informacionGeneral.nombre', nuevoNombre)
  actualizarCampo(path: string, valor: any) {
    this.verProyectoService.updateCampo(path, valor);
  }

  accion(accion: any): void {    
    if (accion.accion.accion == 'agregar') { 
      this.agregarConvocatoria(accion);
    }
  }

  manipularEvidencia(accion: any, evidencia: any){

    let ruta: string = "proyecto/" + this.proyectoId + "/" + evidencia.get('id')?.value + "-" + evidencia.get('nombre')?.value;
    this.proyectoCrearService.descargarDocConvocatoria(ruta).subscribe((blob: Blob) => {
      // Crea un enlace para descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = evidencia.get('nombre')?.value;
      document.body.appendChild(a);
      a.click();

      // Limpia el objeto URL después de la descarga
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });
  }

  agregarDoc(event: any, docId: any) {
    const file = event.target.files[0];

    if(file) {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('organismo', "proyecto");
      formData.append('organismoId', this.proyectoId);
      formData.append('documentoConvocatoriaId', docId);

      this.proyectoCrearService.cargarDocConvocatoria(formData).subscribe({
        next: (respuesta) => {
          this.openModalOk(respuesta.userMessage, "/proyectos/listar");
        },
        error: (errorData) => {
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
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

  private agregarConvocatoria(accion: any): void{
    this.proyectoCrearService.asociarConvocatoria(this.proyectoId, accion.data.id).subscribe({
      next: (respuesta) => {
        this.openModalOk(respuesta.userMessage, "/proyectos/listar");
      },
      error: (errorData) => {
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
