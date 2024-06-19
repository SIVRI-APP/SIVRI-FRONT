
export class DatatableInputAction {
    // Titulo Principal
    icono: string;
    // Mensaje cuando no hay Elementos encontrados de la busqueda
    accion: string;

    constructor(icono:string, accion:string) {
        this.icono = icono;
        this.accion = accion;
    }
}