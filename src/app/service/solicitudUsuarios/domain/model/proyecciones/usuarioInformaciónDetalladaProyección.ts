import { Sexo } from "../enum/sexo";
import { TipoDocumento } from "../enum/tipoDocumento";
import { TipoUsuario } from "../enum/tipoUsuario";


export interface UsuarioInformaciónDetalladaProyección {
  id: number;
  tipoUsuario: TipoUsuario;
  apellido: string;
  correo: string;
  nombre: string;
  telefono: string;
  numeroDocumento: string;
  tipoDocumento: TipoDocumento;
  cvLac: string | null;
  sexo: Sexo;
  departamentoNombre: string;
  programaNombre: string;
  programaId: number;
}
