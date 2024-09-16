import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { VerProyectoService } from '../ver-proyecto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompromisosService } from '../../../../../service/proyecto/domain/service/compromisoService';

@Component({
  selector: 'app-compromisos-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './compromisos-proyecto.component.html',
  styleUrl: './compromisos-proyecto.component.css'
})
export class CompromisosProyectoComponent implements OnInit{

  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  private proyectoId: string = '';
  
  private formularioSubscription: Subscription | null = null;

  protected mostrarAgregarCompromiso: boolean = false; // El div está oculto por defecto

  protected formularioAgregarCompromiso: FormGroup;

  constructor(
    protected verProyectoService: VerProyectoService,
    protected compromisosService: CompromisosService,
    private formBuilder: FormBuilder,
  ) {
    this.formularioAgregarCompromiso = this.formBuilder.group({
    });
  }

  ngOnInit() {    
    this.verProyectoService.setTituloInstruccion("Compromisos del Proyecto");
    this.verProyectoService.setInstruccion("En esta sección se pueden gestionar los compromisos del Proyecto junto con la gestions de los documentos requeridos por cada compromiso");

    this.verProyectoService.formularioListo.subscribe(formulario => {
      if (formulario) {
        this.proyectoId = formulario.get('informacionGeneral')?.get('id')?.getRawValue();
      }
    });
  }

  agregarCompromiso() {
    this.mostrarAgregarCompromiso = !this.mostrarAgregarCompromiso;

    this.compromisosService.prepararAgregarCompromiso(this.proyectoId).subscribe({
      next: (respuesta) => {
        console.log(respuesta)
      }
    })
  }

  limpiarFiltroAgregarCompromiso() {
    this.formularioAgregarCompromiso = this.formBuilder.group({
    });
    this.mostrarAgregarCompromiso = !this.mostrarAgregarCompromiso;
  }

  prepararAgregarCompromiso(): void {

  }

}
