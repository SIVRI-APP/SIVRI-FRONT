export class PrepararAgregarCompromisoDTO {

    productos: ProductoProyectoEntity[];
    integrantesProyecto: ProyectoIntegrantesProyeccion;

    constructor(){
        this.productos = [];
        this.integrantesProyecto = new ProyectoIntegrantesProyeccion();
    }   
}

class ProductoProyectoEntity {
    id: number;
    categoria: string;
    tipo: string;
    descripcion: string;

    constructor(){
        this.id = 0;
        this.categoria = "";
        this.tipo = "";
        this.descripcion = ";"
    }
}

class ProyectoIntegrantesProyeccion {
    integrantes: IntegranteProyectoProyeccion[];

    constructor(){
        this.integrantes = [];
    }
}

class IntegranteProyectoProyeccion {
    id: number;
    usuario: IntegranteUsuarioProyeccion;
    rolProyecto: IntegranteRolProyeccion;

    constructor(){
        this.id = 0;
        this.usuario = new IntegranteUsuarioProyeccion();
        this.rolProyecto = new IntegranteRolProyeccion();
    }
}

class IntegranteUsuarioProyeccion{
    id: number;
    nombre: string;
    apellido: string;

    constructor(){
        this.id = 0;
        this.nombre = "";
        this.apellido = "";
    }
}

class IntegranteRolProyeccion{
    id: number;
    nombre: string;

    constructor(){
        this.id = 0;
        this.nombre = "";
    }
}