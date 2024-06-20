import { TipoFinanciacion } from "../../../../convocatoria/domain/model/enum/tipoFinanciacion";
import { EstadoProyecto } from "../enum/estadoProyecto";

export interface ProyectoInformaciónDetalladaProyección {

  id: number;
  enfoqueMetodologico: string;
  objetivosEspecificos: string;
  lineasDeInvestigacion: any[]; // Si conoces la estructura exacta podrías definir un tipo más específico
  aspectosEticosLegales: string;
  enfoquesDiferenciales: any[]; // Similar a lineasDeInvestigacion, define un tipo específico si es posible
  impactosResultadosEsperados: string;
  confidencialidadDeInformacion: string;
  nombre: string;
  fechaFin: string; // O cambiar a tipo Date si prefieres manejar fechas directamente
  fechaInicio: string; // O cambiar a tipo Date
  estado: EstadoProyecto; // Podría ser un enum si tienes definido un conjunto fijo de estados
  convocatoria: {
    id: number;
    tipoFinanciacion: TipoFinanciacion; // Puedes definir un enum si los tipos de financiación son limitados
    nombre: string;
  };
  consideraciones: string;
  justificacion: string;
  planteamiento: string;
  objetivoGeneral: string;
  eliminadoLogico: boolean;
  efectosAdversos: string;
  integrantes: any[]; // Define un tipo específico si es posible
  
}
