import { Component, OnInit } from '@angular/core';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoInformacionConvocatoria } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListarConvocatoriasComponent } from '../../../convocatorias/listar-convocatorias/listar-convocatorias.component';

@Component({
  selector: 'app-documentos-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, ListarConvocatoriasComponent],
  templateUrl: './documentos-proyecto.component.html',
  styleUrl: './documentos-proyecto.component.css'
})
export class DocumentosProyectoComponent implements OnInit{

  protected proyectoInformacionConvocatoria: ProyectoInformacionConvocatoria

  // Formulario reactivo
  protected asociarConvocatoriaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected proyectoObtenerService: ProyectoObtenerService
  ) {
    this.proyectoInformacionConvocatoria = new ProyectoInformacionConvocatoria();
    
    // // Suscribirse a la informacion de la Convocatoria del Proyecto
    // proyectoObtenerService.getRegistroInformacionDetallada()
    // .subscribe({
    //     next: (respuesta) => {
    //       this.proyectoInformacionConvocatoria = respuesta.data.convocatoria;
    //     }
    // })

    // Inicialización del formulario reactivo
    this.asociarConvocatoriaForm = this.formBuilder.group({
      proyectoId: [0],
      convocatoriaId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    // this.proyectoObtenerService.getRegistroInformacionDetallada()
    //   .subscribe({
    //       next: (respuesta) => {
    //         this.proyectoInformacionConvocatoria = respuesta.data.convocatoria;
    //       }
    //   })
  }

  /**
   * Maneja el envío del formulario de búsqueda.
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.asociarConvocatoriaForm.valid) {

    } else {
      // Marcar todos los campos del formulario como tocados si el formulario no es válido
      this.asociarConvocatoriaForm.markAllAsTouched();
      throw new Error('Formulario no válido');
    }
  }


}
