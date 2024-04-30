import { EstadoSolicitudUsuario } from "../enum/estadoSolicitudUsuario";
import { Sexo } from "../enum/sexo";
import { TipoDocumento } from "../enum/tipoDocumento";
import { TipoUsuario } from "../enum/tipoUsuario";


export interface UsuarioSolicitudInformaciónDetalladaProyección {
  id: number;
  tipoUsuario: TipoUsuario;
  apellido: string;
  correo: string;
  nombre: string;
  estado: EstadoSolicitudUsuario;
  telefono: string;
  numeroDocumento: string;
  tipoDocumento: TipoDocumento;
  cvLac: string | null;
  sexo: Sexo;
  nota: string;
}
