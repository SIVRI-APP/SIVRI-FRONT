import { Paginacion } from "./paginacion";

export class DatatableInput {
    // Cuando realises la peticion al back cambia este dato por true
    searchPerformed: boolean;
    // Pon el nombre del Objeto o Entidad que estas mostrando en la tabla
    domain: string;
    // Que encabezados van en la tabla
    tableHeaders: string[]; 
    // La lista de atributos que contiene el Objeto o Entidad, es importante que el primer elemento de esta lista sea el ID de la entidad por ejemplo: id, apellido, correo, nombre
    // La lista de atributos debe estar en el mismo orden de tableHeaders
    dataAttributes: string[];
    // Enviar toda la paginacion recebida del Back
    paginacion: Paginacion<any>;

    constructor(
        searchPerformed: boolean = false,
        domain: string = '',
        tableHeaders: string[] = [],
        dataAttributes: string[] = [],
        paginacion: Paginacion<any> = null as any
    ) {
        this.searchPerformed = searchPerformed;
        this.domain = domain;
        this.tableHeaders = tableHeaders;
        this.dataAttributes = dataAttributes;
        this.paginacion = paginacion;
    }
}