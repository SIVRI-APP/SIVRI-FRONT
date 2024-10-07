import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoDetalladoDTO } from '../../../../service/proyecto/domain/model/proyecciones/proyectoDetalladoDTO';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerProyectoService {

  private tituloInstruccionSubject = new BehaviorSubject<string>('');
  private instruccionSubject = new BehaviorSubject<string>('');

  // Observable streams
  public readonly tituloInstruccion$ = this.tituloInstruccionSubject.asObservable();
  public readonly instruccion$ = this.instruccionSubject.asObservable();

  // Setters
  setTituloInstruccion(titulo: string) {
    this.tituloInstruccionSubject.next(titulo);
  }

  setInstruccion(instruccion: string) {
    this.instruccionSubject.next(instruccion);
  }

  // Formulario reactivo con la información del Proyecto
  private _formularioinformacionDetalladaProyecto: FormGroup;
  private _formularioListo = new BehaviorSubject<FormGroup | null>(null);

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this._formularioinformacionDetalladaProyecto = this.formBuilder.group({});
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
  construirFormulario(informacion: ProyectoDetalladoDTO) {
    this._formularioinformacionDetalladaProyecto = this.formBuilder.group({

      organismoPrincipal: this.formBuilder.group({
        id: [{value: informacion.organismoPrincipal.id, disabled: true}, Validators.required],
        nombre: [{value: informacion.organismoPrincipal.nombre, disabled: true}, Validators.required],       
      }), 

      informacionGeneral: this.formBuilder.group({
        id: [{value: informacion.informacionDetalladaProyecto.id, disabled: true}, Validators.required],
        estado: [informacion.informacionDetalladaProyecto.estado, Validators.required],
        nombre: [informacion.informacionDetalladaProyecto.nombre, Validators.required],
        fechaFin: [informacion.informacionDetalladaProyecto.fechaFin, Validators.required],
        fechaInicio: [informacion.informacionDetalladaProyecto.fechaInicio, Validators.required],
        objetivoGeneral: [informacion.informacionDetalladaProyecto.objetivoGeneral, Validators.required],
        objetivosEspecificos: [informacion.informacionDetalladaProyecto.objetivosEspecificos, Validators.required],
        planteamiento: [informacion.informacionDetalladaProyecto.planteamiento, Validators.required],
        justificacion: [informacion.informacionDetalladaProyecto.justificacion, Validators.required],
        enfoqueMetodologico: [informacion.informacionDetalladaProyecto.enfoqueMetodologico, Validators.required],        
        aspectosEticosLegales: [informacion.informacionDetalladaProyecto.aspectosEticosLegales, Validators.required],
        impactosResultadosEsperados: [informacion.informacionDetalladaProyecto.impacResulEsperados, Validators.required],
        confidencialidadDeInformacion: [informacion.informacionDetalladaProyecto.confidencialidad, Validators.required],                
        consideraciones: [informacion.informacionDetalladaProyecto.consideraciones, Validators.required],        
        eliminadoLogico: [informacion.informacionDetalladaProyecto.eliminadoLogico],
        efectosAdversos: [informacion.informacionDetalladaProyecto.efectosAdversos, Validators.required],        
      }),   

      convocatoria: this.formBuilder.group({
        id: [informacion.convocatoriaProyecto.convocatoria?.id || '', Validators.required],
        tipoFinanciacion: [informacion.convocatoriaProyecto.convocatoria?.tipoFinanciacion || '', Validators.required],
        nombre: [informacion.convocatoriaProyecto.convocatoria?.nombre || '', Validators.required],
        checklist: this.formBuilder.array(
          (informacion.convocatoriaProyecto.convocatoria?.checklist || []).map(item => this.formBuilder.group({
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
        (informacion.integrantesProyecto.integrantes || []).map(integrante => this.formBuilder.group({
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

      EvidenciasDocumentosConvocatoria: this.formBuilder.array(
        (informacion.evidenciasDocumentosProyecto.evidenciasDocumentosConvocatoria || []).map(evidencia => this.formBuilder.group({
          id: [evidencia.id, Validators.required],
          nombre: [evidencia.nombre, Validators.required],
          documentoConvocatoria: this.formBuilder.group({
            id: [evidencia.documentoConvocatoria.id, Validators.required],
            nombre: [evidencia.documentoConvocatoria.nombre, Validators.required],
          })
        }))
      ),

      compromisosProyecto: this.formBuilder.array(
        (informacion.compromisosProyecto.compromisos).map(compromiso => this.formBuilder.group({
          id: [compromiso.id, Validators.required],
          producto: this.formBuilder.group({
            id: [compromiso.producto.id, Validators.required],
            tipo: [compromiso.producto.tipo, Validators.required],
          })
        }))
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

  get checklistControls() {
    return (this._formularioinformacionDetalladaProyecto.get('convocatoria.checklist') as FormArray).controls;
  }

  get evidenciasDocumentosConvocatoriaControls() {
    return (this._formularioinformacionDetalladaProyecto.get('EvidenciasDocumentosConvocatoria') as FormArray).controls;
  }

  get compromisosControls() {
    return (this._formularioinformacionDetalladaProyecto.get('compromisosProyecto') as FormArray).controls;
  }

}
