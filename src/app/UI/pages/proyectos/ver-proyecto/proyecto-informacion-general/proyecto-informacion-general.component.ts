import { Component, OnInit } from '@angular/core';
import { VerProyectoService } from '../ver-proyecto.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoDetalladoDTO } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoDetalladoDTO';

@Component({
  selector: 'app-proyecto-informacion-general',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proyecto-informacion-general.component.html',
  styleUrl: './proyecto-informacion-general.component.css'
})
export class ProyectoInformacionGeneralComponent implements OnInit {

  protected proyecto = new ProyectoDetalladoDTO

  private formularioSubscription: Subscription | null = null;
  protected informacionGeneral: FormGroup | null = null;

  constructor(
    private verProyectoService: VerProyectoService,
    private proyectoObtenerService: ProyectoObtenerService,
  ) {}

  ngOnInit() {    
    this.verProyectoService.setTituloInstruccion("Información Detallada del Proyecto");
    this.verProyectoService.setInstruccion("En esta sección se presenta la información general del proyecto, incluyendo objetivos, alcance, especificaciones y plazos. Es fundamental para formalizar el proyecto y asegurar que todos los aspectos estén claros. Recuerde guardar los cambios regularmente y cuando sea necesario actualizar el estado.");

    this.formularioSubscription = this.verProyectoService.formularioListo.subscribe(formulario => {
      if (formulario) {
        this.informacionGeneral = formulario.get('informacionGeneral') as FormGroup;
        this.subscribeToFormChanges();
      }
    });

    this.proyectoObtenerService.informacionDetalladaProyecto.subscribe({
      next: (respuesta) => {
        this.proyecto = respuesta.data
      }
    })
  }

  ngOnDestroy() {
    if (this.formularioSubscription) {
      this.formularioSubscription.unsubscribe();
    }
  }

  private subscribeToFormChanges() {
    if (this.informacionGeneral) {
      const controls = this.informacionGeneral.controls;
      Object.keys(controls).forEach(key => {
        const control = controls[key] as FormControl;
        control.valueChanges.subscribe(() => {
          control.valueChanges.pipe(
            debounceTime(300) // Tiempo para evitar múltiples actualizaciones rápidas
          ).subscribe(value => {
            if (control.touched) {
              this.actualizarCampo(`informacionGeneral.${key}`, value);
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

}
