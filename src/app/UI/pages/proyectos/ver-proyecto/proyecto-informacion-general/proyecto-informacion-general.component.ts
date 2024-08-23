import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VerProyectoService } from '../ver-proyecto.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-proyecto-informacion-general',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proyecto-informacion-general.component.html',
  styleUrl: './proyecto-informacion-general.component.css'
})
export class ProyectoInformacionGeneralComponent implements OnInit, AfterViewInit {

  private formularioSubscription: Subscription | null = null;
  protected informacionGeneral: FormGroup | null = null;

  constructor(
    private verProyectoService: VerProyectoService,
  ) {}

  ngAfterViewInit(): void {
    this.verProyectoService._tituloInstruccion = "Información Detallada del Proyecto";
    this.verProyectoService._instruccion = "En esta sección se presenta la información general del proyecto, incluyendo objetivos, alcance, especificaciones y plazos. Es fundamental para formalizar el proyecto y asegurar que todos los aspectos estén claros. Recuerde guardar los cambios regularmente y, cuando el proyecto esté listo, actualizar su estado.";
  }

  ngOnInit() {    
    this.formularioSubscription = this.verProyectoService.formularioListo.subscribe(formulario => {
      if (formulario) {
        this.informacionGeneral = formulario.get('informacionGeneral') as FormGroup;
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
