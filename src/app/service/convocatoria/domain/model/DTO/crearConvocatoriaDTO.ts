export class ObtenerDocumentosDTO {
  documentos: DocumentoDTO[] = [];
  constructor() {}
}

export class DocumentoDTO {
  id: number = 0;
  nombre: string = '';

  constructor(id: number, nombre:string){
    this.id = id;
    this.nombre = nombre
  }
}

export class CrearChecklistDTO {
  nombre: string = '';
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
