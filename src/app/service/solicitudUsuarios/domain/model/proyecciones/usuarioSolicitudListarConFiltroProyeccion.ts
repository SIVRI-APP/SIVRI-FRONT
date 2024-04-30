import { EstadoSolicitudUsuario } from "../enum/estadoSolicitudUsuario";
import { TipoDocumento } from "../enum/tipoDocumento";
import { TipoUsuario } from "../enum/tipoUsuario";


export interface UsuarioSolicitudListarConFiltroProyeccion {
  id: number;
  correo: string;
  nombre: string;
  apellido: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  tipoUsuario: TipoUsuario;
  estado: EstadoSolicitudUsuario;
}
