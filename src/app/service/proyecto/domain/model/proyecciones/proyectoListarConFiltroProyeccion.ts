import { TipoFinanciacion } from "../../../../convocatoria/domain/model/enum/tipoFinanciacion";
import { EstadoProyecto } from "../enum/estadoProyecto";

export interface ProyectoListarConFiltroProyeccion {
  id: number;
  nombre: string;
  estado: EstadoProyecto;
  tipoFinanciacion: TipoFinanciacion;
}

