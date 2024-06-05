export interface TokenModel {
    isLoggedIn: boolean;
    access_token: string;
    nombreCompleto: string;
    tipoUsuario: string;
    authorities: string[];
}