import { EstadoSolicitudUsuario } from "./enum/estadoSolicitudUsuario";
import { TipoDocumento } from "./enum/tipoDocumento";
import { TipoUsuario } from "./enum/tipoUsuario";


export interface UsuarioSolicitudListarConFiltroProjection {
  id: number;
  correo: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  tipoUsuario: TipoUsuario;
  estado: EstadoSolicitudUsuario;
}
