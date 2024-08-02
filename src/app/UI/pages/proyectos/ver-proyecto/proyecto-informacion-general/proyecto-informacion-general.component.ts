import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularioComponent } from '../../../../shared/formulario/formulario.component';
import { FiltroInput } from '../../../../../service/common/model/filtro/filtroInput';
import { FiltroField } from '../../../../../service/common/model/filtro/filtroField';
import { FiltroFieldTipo } from '../../../../../service/common/model/filtro/filtroFieldTipo';
import { EstadoProyecto } from '../../../../../service/proyecto/domain/model/enum/estadoProyecto';
import { DatatableInputAction } from '../../../../../service/common/model/datatableAction';
import { ProyectoCrearService } from '../../../../../service/proyecto/domain/service/proyectoCrear.service';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { ErrorData } from '../../../../../service/common/model/errorData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../shared/modal-bad/modal-bad.component';
import { Router } from '@angular/router';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';

@Component({
  selector: 'app-proyecto-informacion-general',
  standalone: true,
  imports: [ReactiveFormsModule, FormularioComponent],
  templateUrl: './proyecto-informacion-general.component.html',
  styleUrl: './proyecto-informacion-general.component.css'
})
export class ProyectoInformacionGeneralComponent implements OnInit{
  
  // Inyeccion de Modal
  private modalService = inject(NgbModal);

  // Informacion necesaria para crear los campos del formulario
  protected filtroInput: FiltroInput;

  // Informacion necesaria con los valores para popular los campos del formulario
  protected filtroValues: any;

  constructor(
    private router: Router,
    private proyectoCrearService: ProyectoCrearService,
    private proyectoObtenerService: ProyectoObtenerService,
  ){
    // Inicialización de los datos para crear los campos del formulario
    this.filtroInput = new FiltroInput();
    this.filtroInput.accionPrimaria = new DatatableInputAction('done_all', 'Enviar a revisión VRI')
    this.filtroInput.accionesSecundarias = [new DatatableInputAction('save', 'Guardar cambios')]
    
    this.filtroInput.filtroFields.push(new FiltroField('ID Proyecto', 'id', 'ID', FiltroFieldTipo.INPUT, 'text', null, "ID no valido", [Validators.required], false, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Estado', 'estado', 'Estado de la Convocatoria', FiltroFieldTipo.ENUM, '', EstadoProyecto, "Digite una Estado de la Lista", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], false, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Fecha Inicio', 'fechaInicio', 'Fecha Inicio', FiltroFieldTipo.INPUT, 'date', null, "Digite una Fecha de Inicio valida", [Validators.required], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Fecha Fin', 'fechaFin', 'Fecha Fin', FiltroFieldTipo.INPUT, 'date', null, "Digite una Fecha de Fin valida", [Validators.required], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Nombre', 'nombre', 'Nombre', FiltroFieldTipo.INPUT, 'text', null, "Digite un Nombre valido (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Planteamiento', 'planteamiento', 'Planteamiento', FiltroFieldTipo.TEXTAREA, '', null, "Digite una Planteamiento valido (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Objetivo General', 'objetivoGeneral', 'Objetivo General', FiltroFieldTipo.TEXTAREA, '', null, "Digite un Objetivo General valido (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Objetivos Especificos', 'objetivosEspecificos', 'Objetivos Especificos', FiltroFieldTipo.TEXTAREA, '', null, "Digite un Objetivo Especifico valido (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Enfoque Metodologico', 'enfoqueMetodologico', 'Enfoque Metodologico', FiltroFieldTipo.TEXTAREA, '', null, "Digite un Objetivo Especifico valido (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Confidencialidad De Información', 'confidencialidadDeInformacion', 'Confidencialidad De Información', FiltroFieldTipo.TEXTAREA, '', null, "Describa la confidencialidad de la información que manejara el proyecto (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Justificación', 'justificacion', 'Justificación', FiltroFieldTipo.TEXTAREA, '', null, "Describa la justificación del Proyecto (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Aspectos Eticos Legales', 'aspectosEticosLegales', 'Aspectos Eticos Legales', FiltroFieldTipo.TEXTAREA, '', null, "Describa los Aspectos Eticos Legales (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Efectos Adversos', 'efectosAdversos', 'Efectos Adversos', FiltroFieldTipo.TEXTAREA, '', null, "Describa los Efectos Adversos (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Impactos Resultados Esperados', 'impactosResultadosEsperados', 'Impactos Resultados Esperados', FiltroFieldTipo.TEXTAREA, '', null, "Describa los Impactos Resultados Esperados (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
    this.filtroInput.filtroFields.push(new FiltroField('Consideraciones', 'consideraciones', 'Consideraciones', FiltroFieldTipo.TEXTAREA, '', null, "Describa las Consideraciones del Proyecto (5 - 256 caracteres)", [Validators.required, Validators.minLength(5), Validators.maxLength(256)], true, ''));
  }

  ngOnInit(): void {
    this.proyectoObtenerService.getRegistroInformacionDetallada().subscribe({
        next: (respuesta) => {

          if (respuesta) {
            this.filtroValues = respuesta;

          }else{
            this.filtroValues = {}; // Inicializa specificInfo según tu lógica
          }
        },
        // Manejar errores
        error: (errorData) => {
          console.error(errorData);
        }
    })
  }

  accion(accion: any): void {
    // Si la accion es Guardar cambios
    if (accion.accion.accion == 'Guardar cambios') {
      this.proyectoCrearService.formalizar(accion.campos.getRawValue()).subscribe({
        // Manejar respuesta exitosa
        next: (respuesta) => {
          this.openModalOk(respuesta.userMessage, "/proyectos/listar");
        },
        // Manejar errores
        error: (errorData) => {
          // Verificar si el error es del tipo esperado
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
  }

  submit(accion: any): void {
    if (accion.accion.accion == 'Enviar a revisión VRI') {
      console.log(accion)
    }
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
