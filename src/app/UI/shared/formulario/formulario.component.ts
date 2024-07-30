import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FiltroInput } from '../../../service/common/model/filtro/filtroInput';
import { FiltroFieldTipo } from '../../../service/common/model/filtro/filtroFieldTipo';
import { EnumTranslationService } from '../../../service/common/enum-translation.service';
import { DatatableInputAction } from '../../../service/common/model/datatableAction';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  // Contine la informacion necesaria para crear los filtros
  @Input() filtroInput!: FiltroInput;

  // Accion emitida
  @Output() accionEmitter = new EventEmitter<any>();

  // Emite el evento de envio de formulario
  @Output() submitEmitter = new EventEmitter<FormGroup>();

  // Filtro reactivo
  protected filtro: FormGroup;

  protected filtroFieldTipo = FiltroFieldTipo;
  protected filtroFormateadoParaAjustarFilas: FiltroInput[] = [];
  protected filtroFormateadoParaAjustarFilasTextArea: FiltroInput[] = [];

  constructor(
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService
  ) {
    this.filtro = this.formBuilder.group({});
  }

  ngOnInit() {
    // Inicialización del filtro reactivo
    this.agregarCamposDinamicos();

    // Acomodar el filtroFormateadoParaAjustarFilas
    this.formatearFiltro();
  }

  formatearFiltro() {
    let count = 0;
    let inputTmp: FiltroInput;
    this.filtroInput.filtroFields.forEach((filtroField, index) => {
      // Si el contador es cero debemos crear un nuevo filtro temporal
      if (count == 0) {
        inputTmp = new FiltroInput();
      }

      // Si no es TEXTAREA
      if (
        filtroField.inputTipo == this.filtroFieldTipo.ENUM ||
        filtroField.inputTipo == this.filtroFieldTipo.INPUT
      ) {
        inputTmp.filtroFields.push(filtroField);
      }

      // Si alcanzamos el ultimo elemento de la lista y aun no estamos en el limite de la fila
      if (index + 1 == this.filtroInput.filtroFields.length) {
        if (inputTmp.filtroFields.length > 0) {
          this.filtroFormateadoParaAjustarFilas.push(inputTmp); 
        }         
        count = -1;
      } else if (count == 2) {
        // Si alcanzamos el limite de elementos por fila
        if (inputTmp.filtroFields.length > 0) {
          this.filtroFormateadoParaAjustarFilas.push(inputTmp); 
        } 
        count = -1;
      }

      count++;
    });

    let countTextArea = 0;
    let inputTmpTextArea: FiltroInput;

    this.filtroInput.filtroFields.forEach((filtroField, index) => {
      // Si el contador es cero debemos crear un nuevo filtro temporal
      if (countTextArea == 0) {
        inputTmpTextArea = new FiltroInput();
      }

      // Si es TEXTAREA
      if (filtroField.inputTipo == this.filtroFieldTipo.TEXTAREA) {
        inputTmpTextArea.filtroFields.push(filtroField);
      }

      // Si alcanzamos el ultimo elemento de la lista y aun no estamos en el limite de la fila
      if (index + 1 == this.filtroInput.filtroFields.length) {
        if (inputTmpTextArea.filtroFields.length > 0) {
          this.filtroFormateadoParaAjustarFilasTextArea.push(inputTmpTextArea);  
        }        

      } else if (countTextArea == 1) {
        // Si alcanzamos el limite de elementos por fila
        if (inputTmpTextArea.filtroFields.length > 0) {
          this.filtroFormateadoParaAjustarFilasTextArea.push(inputTmpTextArea);  
        }
      }

      countTextArea++;
    });
  }

  // Agregar campos el filtro de manera dinamica
  agregarCamposDinamicos() {
    this.filtroInput.filtroFields.forEach((field) => {
      const restrictions: ValidatorFn[] = field.validators || []; // Obtén el validators, si existe
      const initialValue = field.valor || ''; // Obtén el valor inicial, si existe
      if (field.editable) {
        this.filtro.addControl(field.inputId, this.formBuilder.control(initialValue, { validators: restrictions }));
      } else {
        this.filtro.addControl(field.inputId, this.formBuilder.control({ value: initialValue, disabled: !field.editable }, { validators: restrictions }));
      }
    });
  }

  onSubmit() {
    if (this.filtro.valid) {
      this.submitEmitter.emit(this.filtro);
    } else {
      this.filtro.markAllAsTouched();
    }
  }

  ejecutarAccion(accion: DatatableInputAction, data:any): void{
    console.log("value: " + data.value)
    console.log("form: " + data)
    if (this.filtro.valid) {
      this.accionEmitter.emit({accion, data});
    } else {
      this.filtro.markAllAsTouched();
    }
  }
}
