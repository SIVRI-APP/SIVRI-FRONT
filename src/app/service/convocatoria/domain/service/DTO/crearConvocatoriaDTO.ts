export class CrearChecklistDTO {
  documentoId: number = 0;
  etapaDocumento: string = '';
  responsableDocumento: string = '';
  cantidad: number = 0;
  obligatorio: boolean = false;

  constructor() {}
}

export class CrearConvocatoriaDTO {
  nombre: string = '';
  descripcion: string = '';
  objetivos: string = '';
  oferente: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  tipoFinanciacion: string = '';
  checklist: CrearChecklistDTO[] = [];

  constructor() {}
}
