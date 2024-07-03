export class CrearProyectoDTO {
    nombre: string;
    organismoDeInvestigacionId: string;
    directorDeProyectoId: string;

    constructor() {
        this.nombre = '';
        this.organismoDeInvestigacionId = '';
        this.directorDeProyectoId = '';
    }
}
