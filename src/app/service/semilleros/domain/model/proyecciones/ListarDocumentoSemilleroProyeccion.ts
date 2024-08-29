import { EstadoDocumentoSemillero } from "../enum/estadoDocumentoSemillero";
import { TipoDocumentoSemillero } from "../enum/tipoDocumentoSemillero";

export interface ListarDocumentoSemilleroProyeccion{
  id:number;
  semilleroId:number;
  tipo: TipoDocumentoSemillero;
  estado: EstadoDocumentoSemillero;
  fechaRegistro: Date;
  observacion: string;
  documentoActivo: boolean;
}
