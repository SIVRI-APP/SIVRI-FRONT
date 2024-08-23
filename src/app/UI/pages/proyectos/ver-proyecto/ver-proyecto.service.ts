import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProyectoInformaciónDetalladaProyección } from '../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerProyectoService {

  public _tituloInstruccion: string;
  public _instruccion: string;

  // Formulario reactivo con la información del Proyecto
  private _formularioinformacionDetalladaProyecto: FormGroup;
  private _formularioListo = new BehaviorSubject<FormGroup | null>(null);

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this._formularioinformacionDetalladaProyecto = this.formBuilder.group({});
    this._tituloInstruccion = '';
    this._instruccion = '';
  }

  // Getter para el formulario
  get formularioInformacionDetalladaProyecto(): FormGroup {
    return this._formularioinformacionDetalladaProyecto;
  }

  // Getter para el observable que emite cuando el formulario está listo
  get formularioListo() {
    return this._formularioListo.asObservable();
  }

  // Método para construir el formulario en base a la respuesta del back
  construirFormulario(informacion: ProyectoInformaciónDetalladaProyección) {
    this._formularioinformacionDetalladaProyecto = this.formBuilder.group({
      informacionGeneral: this.formBuilder.group({
        id: [{value: informacion.id, disabled: true}, Validators.required],
        estado: [informacion.estado, Validators.required],
        nombre: [informacion.nombre, Validators.required],
        fechaFin: [informacion.fechaFin, Validators.required],
        fechaInicio: [informacion.fechaInicio, Validators.required],
        objetivoGeneral: [informacion.objetivoGeneral, Validators.required],
        objetivosEspecificos: [informacion.objetivosEspecificos, Validators.required],
        planteamiento: [informacion.planteamiento, Validators.required],
        justificacion: [informacion.justificacion, Validators.required],
        enfoqueMetodologico: [informacion.enfoqueMetodologico, Validators.required],        
        aspectosEticosLegales: [informacion.aspectosEticosLegales, Validators.required],
        impactosResultadosEsperados: [informacion.impactosResultadosEsperados, Validators.required],
        confidencialidadDeInformacion: [informacion.confidencialidadDeInformacion, Validators.required],                
        consideraciones: [informacion.consideraciones, Validators.required],        
        eliminadoLogico: [informacion.eliminadoLogico],
        efectosAdversos: [informacion.efectosAdversos, Validators.required],        
      }),      
      convocatoria: this.formBuilder.group({
        id: [informacion.convocatoria.id, Validators.required],
        tipoFinanciacion: [informacion.convocatoria.tipoFinanciacion, Validators.required],
        nombre: [informacion.convocatoria.nombre, Validators.required],
        checklist: this.formBuilder.array(
          informacion.convocatoria.checklist.map(item => this.formBuilder.group({
            id: [item.id, Validators.required],
            etapaDocumento: [item.etapaDocumento, Validators.required],
            responsableDocumento: [item.responsableDocumento, Validators.required],
            cantidad: [item.cantidad, Validators.required],
            obligatorio: [item.obligatorio],
            completado: [item.completado],
            documentoConvocatoria: this.formBuilder.group({
              id: [item.documentoConvocatoria.id, Validators.required],
              nombre: [item.documentoConvocatoria.nombre, Validators.required],
            })
          }))
        )
      }),
      integrantes: this.formBuilder.array(
        informacion.integrantes.map(integrante => this.formBuilder.group({
          id: [integrante.id, Validators.required],
          usuario: this.formBuilder.group({
            id: [integrante.usuario.id, Validators.required],
            apellido: [integrante.usuario.apellido, Validators.required],
            nombre: [integrante.usuario.nombre, Validators.required],
          }),
          rolProyecto: this.formBuilder.group({
            id: [integrante.rolProyecto.id, Validators.required],
            nombre: [integrante.rolProyecto.nombre, Validators.required],
          })
        }))
      ),
      enfoquesDiferenciales: this.formBuilder.array(
        informacion.enfoquesDiferenciales.map(enfoque => new FormControl(enfoque))
      ),
      lineasDeInvestigacion: this.formBuilder.array(
        informacion.lineasDeInvestigacion.map(linea => new FormControl(linea))
      ),
    });

    // Emitir el formulario cuando esté listo
    this._formularioListo.next(this._formularioinformacionDetalladaProyecto);
  }

  // Método para actualizar campos específicos del formulario
  updateCampo(path: string, valor: any) {
    const control = this._formularioinformacionDetalladaProyecto.get(path);
    if (control) {
      control.setValue(valor);
    } else {
      console.warn(`El campo ${path} no existe en el formulario.`);
    }
  }

}
