export class ErrorData {
    [error: string]: string;

    constructor(initialData?: {[error: string]: string}) {
        if (initialData) {
            // Copiar las propiedades iniciales si se proporcionan
            Object.assign(this, initialData);
        }
    }
}