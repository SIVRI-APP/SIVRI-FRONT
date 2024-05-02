export class Respuesta<T> {
    status: number;
    userMessage: string;
    developerMessage: string;
    data: T;

    constructor(status: number = 0, userMessage: string = '', developerMessage: string = '', data: T = null as any) {
        this.status = status;
        this.userMessage = userMessage;
        this.developerMessage = developerMessage;
        this.data = data;
    }
}