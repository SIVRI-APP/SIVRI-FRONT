import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  // Contine la informacion necesaria para crear los campos del formulario
  @Input() filtroInput!: FiltroInput;

  // Continen los valores para popular los campos del formulario debes pasarle el objeto clave valor
  @Input() specificInfo: any;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['specificInfo'] && changes['specificInfo'].currentValue) {
      this.updateFormWithSpecificInfo(changes['specificInfo'].currentValue);
    }
  }

  private updateFormWithSpecificInfo(data: any): void {
    Object.keys(data).forEach(key => {      
      if (this.filtro.controls[key]) {
        this.filtro.controls[key].patchValue(data[key]);
      }
    });
  }

  formatearFiltro() {
    let limit = 0;
    let limitTextArea = 0;
    let inputTmp: FiltroInput = new FiltroInput();
    let inputTmpTextArea: FiltroInput = new FiltroInput();

    this.filtroInput.filtroFields.forEach((filtroField, index) => {
      // Si el elemento es ENUM || INPUT
      if (
        filtroField.inputTipo == this.filtroFieldTipo.ENUM || filtroField.inputTipo == this.filtroFieldTipo.INPUT) {
        inputTmp.filtroFields.push(filtroField);
        limit++;
      }
      // Si es TEXTAREA
      if (filtroField.inputTipo == this.filtroFieldTipo.TEXTAREA) {
        inputTmpTextArea.filtroFields.push(filtroField);
        limitTextArea++;
      }

      // Si alcanzamos el ultimo elemento de la lista y aun no estamos en el limite de la fila
      if (index + 1 == this.filtroInput.filtroFields.length) {
        if (inputTmp.filtroFields.length > 0) {
          this.filtroFormateadoParaAjustarFilas.push(inputTmp); 
        }
        if (inputTmpTextArea.filtroFields.length > 0) {
          this.filtroFormateadoParaAjustarFilasTextArea.push(inputTmpTextArea);  
        }           
      } else {
        if (limit == 4){ // Si alcanzamos el limite de elementos por fila del input y del enum          
          this.filtroFormateadoParaAjustarFilas.push(inputTmp);
          inputTmp = new FiltroInput();
          limit = 0;
        }
        
        if (limitTextArea == 2){ // Si alcanzamos el limite de elementos por fila del textArea  
          this.filtroFormateadoParaAjustarFilasTextArea.push(inputTmpTextArea); 
          inputTmpTextArea = new FiltroInput();
          limitTextArea = 0;
        }
        
      }
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

  ejecutarAccion(accion: DatatableInputAction): void{
    let campos = this.filtro;
    if (this.filtro.valid) {
      this.accionEmitter.emit({accion, campos});
    } else {
      this.filtro.markAllAsTouched();
    }
  }
}
