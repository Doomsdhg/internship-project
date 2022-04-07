export interface AuthenticationResponse {
    accessToken: string,
    refreshToken: string,
    type: string
}

export interface AuthenticationResponseError {
    error: ErrorObject
}

interface ErrorObject {
    message: string
}