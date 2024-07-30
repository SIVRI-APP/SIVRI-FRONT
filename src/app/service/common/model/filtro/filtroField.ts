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

    constructor(label:string, inputId:string, inputPlaceholder:string, inputTipo:FiltroFieldTipo, inputType:string, enumClass:any) {
        this.label = label;
        this.inputId = inputId;
        this.inputPlaceholder = inputPlaceholder;
        this.inputTipo = inputTipo;
        this.inputType = inputType;
        this.enumClass = enumClass;
      }
}