import { TipoDocumento } from "../enum/tipoDocumento";
import { TipoUsuario } from "../enum/tipoUsuario";


export interface UsuarioListarConFiltroProyeccion {
  id: number;
  correo: string;
  nombre: string;
  apellido: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  tipoUsuario: TipoUsuario;
}
