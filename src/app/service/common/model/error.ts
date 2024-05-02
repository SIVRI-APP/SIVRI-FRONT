export interface ErrorData {
    status: number;
    userMessage: string;
    developerMessage: string;
    data: {
        error: string;
    };
}