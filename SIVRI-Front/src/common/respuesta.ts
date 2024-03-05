
export interface Respuesta<T> {
    status: number;
    userMessage: string;
    developerMessage: string;
    data: T;
}