import { DatatableInputAction } from "../datatableAction";
import { FiltroField } from "./filtroField";

export class FiltroInput {
        
    // Listado de Inputs del formulario
    filtroFields: FiltroField[];

    // El Boton primario
    accionPrimaria: DatatableInputAction | null;

    // Botones secundarios
    accionesSecundarias: DatatableInputAction[];   

    constructor(
    ) {
        this.filtroFields = [];
        this.accionPrimaria = null;
        this.accionesSecundarias = [];        
    }
}