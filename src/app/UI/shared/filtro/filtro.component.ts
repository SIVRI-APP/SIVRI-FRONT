import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FiltroInput } from '../../../service/common/model/filtro/filtroInput';
import { FiltroFieldTipo } from '../../../service/common/model/filtro/filtroFieldTipo';
import { EnumTranslationService } from '../../../service/common/enum-translation.service';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {

  // Contine la informacion necesaria para crear los filtros
  @Input() filtroInput!:FiltroInput;

  // Emite el evento de envio de formulario
  @Output() filtrarEmitter = new EventEmitter<FormGroup>();

  // Filtro reactivo
  protected filtro: FormGroup;

  protected filtroFieldTipo = FiltroFieldTipo;
  protected filtroFormateadoParaAjustarFilas:FiltroInput[] = [];
  protected filtroFormateadoParaAjustarFilasTextArea:FiltroInput[] = [];

  constructor(
    private formBuilder: FormBuilder,
    protected enumTranslationService: EnumTranslationService
  ){
    this.filtro = this.formBuilder.group({
      pageNo: [0],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    // Inicialización del filtro reactivo
    this.agregarCamposDinamicos();

    // Acomodar el filtroFormateadoParaAjustarFilas
    this.formatearFiltro();
  }

  formatearFiltro() {
    let count = 0;
    let inputTmp:FiltroInput;
    this.filtroInput.filtroFields.forEach((filtroField, index) => {      
      // Si el contador es cero debemos crear un nuevo filtro temporal
      if (count == 0) {
        inputTmp = new FiltroInput(); 
      }
      
      // Si no es TEXTAREA
      if (filtroField.inputTipo == this.filtroFieldTipo.ENUM || filtroField.inputTipo == this.filtroFieldTipo.INPUT) {
        inputTmp.filtroFields.push(filtroField);
      }

      // Si alcanzamos el ultimo elemento de la lista y aun no estamos en el limite de la fila
      if (index + 1 == this.filtroInput.filtroFields.length) {
        this.filtroFormateadoParaAjustarFilas.push(inputTmp);
        count = -1;
      } else if (count == 3){ // Si alcanzamos el limite de elementos por fila
        count = -1;
        this.filtroFormateadoParaAjustarFilas.push(inputTmp);
      }

      count++
    });

    let countTextArea = 0;
    let inputTmpTextArea:FiltroInput;

    this.filtroInput.filtroFields.forEach((filtroField, index) => {
      
      // Si el contador es cero debemos crear un nuevo filtro temporal
      if (countTextArea == 0) {
        inputTmpTextArea = new FiltroInput(); 
      }
      
      // Si no es TEXTAREA
      if (filtroField.inputTipo == this.filtroFieldTipo.TEXTAREA) {
        inputTmp.filtroFields.push(filtroField);
      }

      // Si alcanzamos el ultimo elemento de la lista y aun no estamos en el limite de la fila
      if (index + 1 == this.filtroInput.filtroFields.length) {
        this.filtroFormateadoParaAjustarFilasTextArea.push(inputTmp);
        count = -1;
      } else if (count == 3){ // Si alcanzamos el limite de elementos por fila
        count = -1;
        this.filtroFormateadoParaAjustarFilasTextArea.push(inputTmp);
      }

      count++
    });
  }

  onSubmit() {
    if (this.filtro.valid) {
      // Obtener los valores del filtro
      this.filtrarEmitter.emit(this.filtro);
    } else {
      console.error('El filtro no es válido');
    }
  }

  // Agregar campos el filtro de manera dinamica
  agregarCamposDinamicos() {
    this.filtroInput.filtroFields.forEach(field => {
      this.filtro.addControl(field.inputId, this.formBuilder.control(''));
    });
  }

  limpiarCampos() {
    const valoresIniciales: { [key: string]: any } = {
      pageNo: [0],
      pageSize: ['10']
    };

    // Recorrer la lista de campos para obtener los valores predeterminados
    this.filtroInput.filtroFields.forEach(field => {
      valoresIniciales[field.inputId] = '';
    });

    // Restablecer el filtro con los valores iniciales
    this.filtro.reset(valoresIniciales);
  }
}
