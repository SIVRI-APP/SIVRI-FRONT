import { ConvocatoriaEstado } from '../enum/convocatoriaEstado';
import { EtapaDocumento } from '../enum/etapaDocumento';
import { ResponsableDocumento } from '../enum/responsableDocumento';
import { TipoFinanciacion } from '../enum/tipoFinanciacion';

export interface ConvocatoriaInformaciónDetalladaProyección {

  id: number;
  nombre: string;
  descripcion: string;
  objetivos: string;
  oferente: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: ConvocatoriaEstado;
  tipoFinanciacion: TipoFinanciacion;

  checklist: {
    id: number;
    etapaDocumento: EtapaDocumento;
    responsableDocumento: ResponsableDocumento;
    cantidad: number;
    obligatorio: boolean;
    completado: boolean;

    documentoConvocatoria: {
      id: number;
      nombre: string;
    };

  }[];
  
}
