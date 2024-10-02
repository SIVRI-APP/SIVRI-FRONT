import { EtapaDocumento } from "../../../../convocatoria/domain/model/enum/etapaDocumento";
import { ResponsableDocumento } from "../../../../convocatoria/domain/model/enum/responsableDocumento";
import { TipoFinanciacion } from "../../../../convocatoria/domain/model/enum/tipoFinanciacion";
import { EstadoProyecto } from "../enum/estadoProyecto";
import { RolProyecto } from "../enum/rolProyecto";

export class ProyectoDetalladoDTO {

  informacionDetalladaProyecto: InformacionDetalladaProyecto
  convocatoriaProyecto: ConvocatoriaProyecto
  integrantesProyecto: IntegrantesProyecto; 
  evidenciasDocumentosProyecto: EvidenciasDocumentosProyecto; 
  compromisosProyecto: CompromisosProyecto; 
  enfoquesDiferenciales: any;
  lineasDeInvestigacion: any;

  constructor() {
    this.informacionDetalladaProyecto = new InformacionDetalladaProyecto();
    this.convocatoriaProyecto = new ConvocatoriaProyecto();
    this.integrantesProyecto = new IntegrantesProyecto;
    this.evidenciasDocumentosProyecto = new EvidenciasDocumentosProyecto();
    this.compromisosProyecto = new CompromisosProyecto();
    this.enfoquesDiferenciales = [];
    this.lineasDeInvestigacion = [];
  }
  
}

export class InformacionDetalladaProyecto{
  id: number;
  enfoqueMetodologico: string;
  objetivosEspecificos: string;  
  aspectosEticosLegales: string;  
  impacResulEsperados: string;
  confidencialidad: string;
  nombre: string;
  fechaFin: string;
  fechaInicio: string; 
  consideraciones: string;
  justificacion: string;
  planteamiento: string;
  objetivoGeneral: string;
  eliminadoLogico: boolean;
  efectosAdversos: string;
  estado: EstadoProyecto;

  constructor() {
    this.id = 0;
    this.enfoqueMetodologico = '';
    this.objetivosEspecificos = '';
    this.aspectosEticosLegales = '';
    this.impacResulEsperados = '';
    this.confidencialidad = '';
    this.nombre = '';
    this.fechaFin = '';
    this.fechaInicio = '';
    this.consideraciones = '';
    this.justificacion = '';
    this.planteamiento = '';
    this.objetivoGeneral = '';
    this.eliminadoLogico = false;
    this.efectosAdversos = '';
    this.estado = EstadoProyecto.FORMULADO; // Suponiendo que INDEFINIDO es un valor en el enum EstadoProyecto
  }
}

export class ConvocatoriaProyecto {
  convocatoria: Convocatoria;

  constructor(){
    this.convocatoria = new Convocatoria()
  }
}

export class Convocatoria {
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
  documentoConvocatoria: DocumentoConvocatoria = new DocumentoConvocatoria();

  constructor() {
    this.id = 0;
    this.etapaDocumento = EtapaDocumento.EJECUCION;
    this.responsableDocumento = ResponsableDocumento.ORGANISMO_DE_INVESTIGACION;
    this.cantidad = 0;
    this.obligatorio = false;
    this.completado = false;
    this.documentoConvocatoria = new DocumentoConvocatoria();
  }
}

export class DocumentoConvocatoria {
  id: number;
  nombre: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}

export class IntegrantesProyecto {
  integrantes: Integrantes[];

  constructor(){
    this.integrantes = [];
  }
}

export class Integrantes {
  id: number;
  usuario: Usuario;
  rolProyecto: RolProyectoProyeccion;

  constructor(){
    this.id = 0
    this.usuario = new Usuario();
    this.rolProyecto = new RolProyectoProyeccion();
  }
}

export class Usuario {
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

export class EvidenciasDocumentosProyecto {
  evidenciasDocumentosConvocatoria: EvidenciasDocumentosConvocatoria[];

  constructor(){
    this.evidenciasDocumentosConvocatoria = [];
  }
}

export class EvidenciasDocumentosConvocatoria {
  id: number;
  nombre: string;
  documentoConvocatoria: DocumentoConvocatoria;

  constructor(){
    this.id = 0
    this.nombre = "";
    this.documentoConvocatoria = new DocumentoConvocatoria();
  }
}


export class CompromisosProyecto {
  compromisos: Compromisos[];

  constructor(){
    this.compromisos = [];
  }
}

export class Compromisos {
  id: number;
  producto: Producto;

  constructor(){
    this.id = 0
    this.producto = new Producto();
  }
}

export class Producto {
  id: number;
  tipo: string;

  constructor(){
    this.id = 0
    this.tipo = "";
  }
}

