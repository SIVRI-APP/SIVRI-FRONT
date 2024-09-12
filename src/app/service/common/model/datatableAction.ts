
export class DatatableInputAction {
    // Titulo Principal
    icono: string;
    // Mensaje cuando no hay Elementos encontrados de la busqueda
    accion: string;
    // Texto del boton
    texto: string;

    constructor(icono:string, accion:string, texto:string = '') {
        this.icono = icono;
        this.accion = accion;
        this.texto = texto;
    }
}