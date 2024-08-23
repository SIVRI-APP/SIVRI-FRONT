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
  protected convocatoria: FormGroup | null = null;

  constructor(
    private router: Router,
    private verProyectoService: VerProyectoService,
    protected proyectoCrearService: ProyectoCrearService
  ) {
  }

  ngOnInit() {    
    this.verProyectoService.setTituloInstruccion("Convocatoria Asociada al Proyecto");
    this.verProyectoService.setInstruccion("En esta sección se presenta la información general del proyecto, incluyendo objetivos, alcance, especificaciones y plazos. Es fundamental para formalizar el proyecto y asegurar que todos los aspectos estén claros. Recuerde guardar los cambios regularmente y cuando sea necesario actualizar el estado.");

    this.formularioSubscription = this.verProyectoService.formularioListo.subscribe(formulario => {
      if (formulario) {
        this.proyectoId = formulario.get('informacionGeneral')?.get('id')?.getRawValue();
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
    if (this.convocatoria) {
      const controls = this.convocatoria.controls;
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
    
    if (accion.accion.accion == 'verDocs') {  
      alert("Desplegar Docs")
    }
    if (accion.accion.accion == 'agregar') { 
      this.agregarConvocatoria(accion);
    }
  }

  private agregarConvocatoria(accion: any): void{
    this.proyectoCrearService.asociarConvocatoria(this.proyectoId, accion.data.id).subscribe({
      next: (respuesta) => {
        this.openModalOk(respuesta.userMessage, "/proyectos/listar/"+ this.proyectoId +"/informacion-general");
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
