export class FormalizarProyectoDTO {
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
    planteamiento: string;
    objetivoGeneral: string;
    objetivosEspecificos: string;
    justificacion: string;
    enfoqueMetodologico: string;
    aspectosEticosLegales: string;
    confidencialidadDeInformacion: string;
    efectosAdversos: string;
    impactosResultadosEsperados: string;
    consideraciones: string;
    eliminadoLogico: boolean;

    constructor() {
        this.nombre = '';
        this.fechaInicio = '';
        this.fechaFin = '';
        this.planteamiento = '';
        this.objetivoGeneral = '';
        this.objetivosEspecificos = '';
        this.justificacion = '';
        this.enfoqueMetodologico = '';
        this.aspectosEticosLegales = '';
        this.confidencialidadDeInformacion = '';
        this.efectosAdversos = '';
        this.impactosResultadosEsperados = '';
        this.consideraciones = '';
        this.eliminadoLogico = false;
    }
}
