import { EtapaDocumento } from "../../../../convocatoria/domain/model/enum/etapaDocumento";
import { ResponsableDocumento } from "../../../../convocatoria/domain/model/enum/responsableDocumento";
import { TipoFinanciacion } from "../../../../convocatoria/domain/model/enum/tipoFinanciacion";
import { EstadoProyecto } from "../enum/estadoProyecto";
import { RolProyecto } from "../enum/rolProyecto";

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
  convocatoria: ProyectoInformacionConvocatoria
  consideraciones: string;
  justificacion: string;
  planteamiento: string;
  objetivoGeneral: string;
  eliminadoLogico: boolean;
  efectosAdversos: string;
  integrantes: IntegrantesProyeccion[]; // Define un tipo específico si es posible
  
}

export class ProyectoInformacionConvocatoria {
  id: number;
  tipoFinanciacion: TipoFinanciacion; // Puedes definir un enum si los tipos de financiación son limitados
  nombre: string;
  checklist: ChecklistProyeccion[];

  constructor(){
    this.id = 0,
    this.tipoFinanciacion = TipoFinanciacion.PROYECTOS_INTERNOS,
    this.nombre = ''
    this.checklist = []
  }
}

export class ChecklistProyeccion {
  id: number;
  etapaDocumento: EtapaDocumento;
  responsableDocumento: ResponsableDocumento;
  cantidad: number;
  obligatorio: boolean;
  completado: boolean;
  documentoConvocatoria: DocumentoProyeccion = new DocumentoProyeccion();

  constructor() {
    this.id = 0;
    this.etapaDocumento = EtapaDocumento.EJECUCION;
    this.responsableDocumento = ResponsableDocumento.ORGANISMO_DE_INVESTIGACION;
    this.cantidad = 0;
    this.obligatorio = false;
    this.completado = false;
    this.documentoConvocatoria = new DocumentoProyeccion();
  }
}

export class DocumentoProyeccion {
  id: number;
  nombre: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}

export class IntegrantesProyeccion {
  id: number;
  usuario: UsuarioProyeccion = new UsuarioProyeccion();
  rolProyecto: RolProyectoProyeccion = new RolProyectoProyeccion();

  constructor(){
    this.id = 0
  }
}

export class UsuarioProyeccion {
  id: number;
  apellido: string;
  nombre: string;

  constructor(){
    this.id = 0;
    this.apellido = '';
    this.nombre = '';
  }
}

export class RolProyectoProyeccion {
  id: number;
  nombre: RolProyecto;

  constructor(){
    this.id = 0;
    this.nombre = RolProyecto.CO_INVESTIGADOR;
  }
}
