import { UsuarioInformaciónDetalladaProyección } from "../../../../solicitudUsuarios/domain/model/proyecciones/usuarioInformaciónDetalladaProyección";
import { IntegranteSemilleroEstado } from "../enum/integranteSemilleroEstado";
import { RolIntegranteSemillero } from "./rolIntegranteSemillero";
import { SemilleroProyeccion } from "./semilleroProyeccion";

export interface IntegranteSemillero {
  id: number;
  estado: IntegranteSemilleroEstado;
  fechaIngreso: Date;
  fechaRetiro: Date;
  semillero:SemilleroProyeccion;
  usuario: UsuarioInformaciónDetalladaProyección;
  rolSemillero:RolIntegranteSemillero;
}
