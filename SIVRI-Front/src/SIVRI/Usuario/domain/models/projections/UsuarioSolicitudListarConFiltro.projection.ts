import { EstadoSolicitudUsuario } from '../enums/estadoSolicitudUsuario';
import { TipoDocumento } from '../enums/tipoDocumento';
import { TipoUsuario } from '../enums/tipoUsuario';

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
