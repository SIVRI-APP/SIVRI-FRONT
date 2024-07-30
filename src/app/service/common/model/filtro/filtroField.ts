import { ValidatorFn } from "@angular/forms";
import { FiltroFieldTipo } from "./filtroFieldTipo";

export class FiltroField {
    // Label que se mostrara al usuario
    label: string;
    // ID del input que sera usado como identificador del formulario reactivo
    inputId: string;
    // Placehorder que se mostrara al usuario cuando no se ha seleccionado un valor
    inputPlaceholder: string;
    // Que tipo de campo sera sera
    inputTipo: FiltroFieldTipo;
    // El input debe tener un atributo type puede ser text, date, number 
    inputType: string;
    // Si el inputTipo es de tipo enum aqui se debe pasar el enum
    enumClass: any;
    // Si el campo tiene un validaciones aqui va el mensaje de error, sino tiene validaciones el campo debe ser "" 
    validacion: string;
    // Lista de Validators Si validacion es "" esta campo debe ser vacio tambien []
    validators: ValidatorFn[]
    // True si el campo el campo es editable
    editable: boolean;
    // Si el campo ya tiene un valor usarlo en esta variable
    valor: any | null

    constructor(label:string, inputId:string, inputPlaceholder:string, inputTipo:FiltroFieldTipo, inputType:string, enumClass:any, validacion:string, validators:ValidatorFn[], editable:boolean, valor:any | null) {
      this.label = label;
      this.inputId = inputId;
      this.inputPlaceholder = inputPlaceholder;
      this.inputTipo = inputTipo;
      this.inputType = inputType;
      this.enumClass = enumClass;
      this.validacion = validacion;
      this.validators = validators;
      this.editable = editable
      this.valor = valor
    }
}