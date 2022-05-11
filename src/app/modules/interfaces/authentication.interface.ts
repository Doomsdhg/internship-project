export interface AuthenticationResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
    type: string;
}

export interface AuthenticationData {
    authenticated: string | null;
    token: string | null;
    refreshToken: string | null;
    username: string | null;
    tokenExpiration: string | null;
    tokenCreated: string | null;
}

export interface LogoutResponse {
    message: string;
}

export interface AuthenticationResponseError {
    error: ErrorObject;
}

interface ErrorObject {
    message: string;
}

export interface DecodedToken {
    exp: number;
    iat: number;
}
