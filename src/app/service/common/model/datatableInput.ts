import { DatatableInputAction } from "./datatableAction";
import { Paginacion } from "./paginacion";

export class DatatableInput {
    
    // Titulo Principal
    titulo: string;
    // Boton de accion principal
    acccionPrincipal: DatatableInputAction;
    // Mensaje cuando no hay Elementos encontrados de la busqueda
    mensajeNoHayElementos: string;
    // Mensaje cuando aun no se ha realizado un filtro para la busqueda
    mensajeBusqueda: string
    // Cuando realises la peticion al back cambia este dato por true
    searchPerformed: boolean;
    // Pon el nombre del Objeto o Entidad que estas mostrando en la tabla
    domain: string;
    // Que encabezados van en la tabla
    tableHeaders: string[]; 
    // La lista de atributos que contiene el Objeto o Entidad, es importante que el primer elemento de esta lista sea el ID de la entidad por ejemplo: id, apellido, correo, nombre
    // La lista de atributos debe estar en el mismo orden de tableHeaders
    dataAttributes: { name: string; type: any }[];
    // Enviar toda la paginacion recebida del Back esta paginacion contiene la Informacion la que vamos a popular la tabla
    paginacion: Paginacion<any>;
    //Acciones para poner al final de la Tabla
    acciones: DatatableInputAction[];
    // Desactivar controles de Paginacion porque no son necesarios
    quieresPaginar: boolean;

    constructor(
        domain: string = '',
        paginacion: Paginacion<any> = null as any
    ) {
        this.titulo = '';
        this.acccionPrincipal = new DatatableInputAction("", "", "");
        this.mensajeNoHayElementos = '';
        this.mensajeBusqueda = '';
        this.searchPerformed = false;
        this.domain = domain;
        this.tableHeaders = [];
        this.dataAttributes = [];
        this.paginacion = paginacion;
        this.acciones = [];
        this.quieresPaginar = false;
    }
}