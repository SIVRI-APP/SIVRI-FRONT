import { EstadoSolicitudUsuario } from "./estadoSolicitudUsuario";
import { TipoDocumento } from "./tipoDocumento";
import { TipoUsuario } from "./tipoUsuario";

export interface UsuarioSolicitudListarConFiltroProyección {
    id: number;
    correo: string;
    nombres: string;
    apellidos: string;
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    tipoUsuario: TipoUsuario; 
    estado: EstadoSolicitudUsuario;
  }