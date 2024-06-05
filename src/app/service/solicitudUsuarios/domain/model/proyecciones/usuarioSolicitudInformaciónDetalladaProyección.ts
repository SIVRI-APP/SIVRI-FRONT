import { EstadoSolicitudUsuario } from '../enum/estadoSolicitudUsuario';
import { Sexo } from '../enum/sexo';
import { TipoDocumento } from '../enum/tipoDocumento';
import { TipoUsuario } from '../enum/tipoUsuario';

export interface UsuarioSolicitudInformaciónDetalladaProyección {
  id: number;
  tipoUsuario: TipoUsuario;
  correo: string;
  apellido: string;
  nombre: string;
  numeroDocumento: string;
  tipoDocumento: TipoDocumento;
  sexo: Sexo;
  cvLac: string | null;
  telefono: string;
  nota: string;
  estado: EstadoSolicitudUsuario;
  observaciones: {
    id: number;
    resuelta: boolean;
    fechaObservacion: string;
    observacion: string;
    funcionario: {
      usuario: {
        nombre: string;
        apellido: string;
      };
    };
    conversacion: {
      id: number;
      mensaje: string;
      autor: string;
      fechaMensaje: string;
    }[];
  };
}
