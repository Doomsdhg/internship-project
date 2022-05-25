export interface RefreshTokenRequestBody {
    refreshToken: string;
}

export interface LogoutRequestBody {
    username: string;
}

export interface LoginRequestBody {
    username: string;
    password: string;
}
