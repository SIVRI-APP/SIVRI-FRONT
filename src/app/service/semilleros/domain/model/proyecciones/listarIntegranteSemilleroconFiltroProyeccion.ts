import { IntegranteSemilleroEstado } from "../enum/integranteSemilleroEstado";

export interface ListarTodosIntegranteSemilleroconFiltroProyeccion{
  numeroDocumento: string;
  nombres: string;
  semilleroId:number;
  nombreSemillero:string;
  rolSemillero:string;
  estado:IntegranteSemilleroEstado;
  //nombrePrograma: string;
 // nombreFacultad: string;
}
