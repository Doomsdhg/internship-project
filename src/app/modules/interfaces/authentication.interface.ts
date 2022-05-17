export interface AuthenticationResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
    type: string;
}

export interface AuthenticationData {
    authenticated: string;
    token: string;
    refreshToken: string;
    username: string;
    tokenExpiration: string;
    tokenCreated: string;
}

export interface LogoutResponse {
    message: string;
}

export interface AuthenticationResponseError {
    error: ErrorObject;
    status: number;
}

interface ErrorObject {
    message: string;
}

export interface DecodedToken {
    exp: number;
    iat: number;
}
