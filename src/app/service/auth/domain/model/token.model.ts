export interface TokenModel {
    isLoggedIn: boolean;
    access_token: string;
    refresh_token: string;
    nombreCompleto: string;
    tipoUsuario: string;
    authorities: Set<string>;
}