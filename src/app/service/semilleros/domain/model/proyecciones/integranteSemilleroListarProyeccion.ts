import { IntegranteSemilleroEstado } from "../enum/integranteSemilleroEstado";

export interface IntegranteSemilleroListar{
  idIntegranteSemillero:number;
  numeroDocumento:string;
  nombreCompleto:string;
  rolSemillero:string;
  estado:IntegranteSemilleroEstado;
  fechaIngreso:Date;
}
