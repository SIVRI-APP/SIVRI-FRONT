import { TipoFinanciacion } from "../enum/tipoFinanciacion";


export interface ConvocatoriaListarConFiltroProyeccion {
  id: number;
  nombre: string;
  estado: string;
  tipoFinanciacion: TipoFinanciacion;
}

