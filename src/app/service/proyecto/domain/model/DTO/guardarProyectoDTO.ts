export interface GuardarProyectoDTO {
    informacionGeneral: {
      id: number;
      estado: string;
      nombre: string;
      fechaFin: string;
      fechaInicio: string;
      objetivoGeneral: string;
      objetivosEspecificos: string;
      planteamiento: string;
      justificacion: string;
      enfoqueMetodologico: string;
      aspectosEticosLegales: string;
      impactosResultadosEsperados: string;
      confidencialidadDeInformacion: string;
      consideraciones: string;
      eliminadoLogico: boolean;
      efectosAdversos: string;
    };
    convocatoria: {
      id: number;
      tipoFinanciacion: string;
      nombre: string;
      checklist: {
        id: number;
        etapaDocumento: string;
        responsableDocumento: string;
        cantidad: number;
        obligatorio: boolean;
        completado: boolean;
        documentoConvocatoria: {
          id: number;
          nombre: string;
        };
      }[];
    };
    integrantes: {
      id: number;
      usuario: {
        id: number;
        apellido: string;
        nombre: string;
      };
      rolProyecto: {
        id: number;
        nombre: string;
      };
    }[];
    enfoquesDiferenciales: string[];
    lineasDeInvestigacion: string[];
  }
  