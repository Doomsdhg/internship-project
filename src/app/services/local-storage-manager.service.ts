import { Injectable } from '@angular/core';
import { LocalStorageAcessors } from '../constants/local-storage-accessors.constants';
import jwtDecode from "jwt-decode";
import { DecodedToken, AuthenticationResponse } from '../modules/interfaces/authentication.interface';

interface AuthenticationData {
  authenticated: string | null,
  token: string | null,
  refreshToken: string | null,
  username: string | null,
  tokenExpiration: string | null,
  tokenCreated: string | null
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  setLoginValues(loginObject: AuthenticationResponse): void {
    const decodedToken: DecodedToken = jwtDecode(loginObject.accessToken);
    localStorage.setItem(LocalStorageAcessors.AUTHENTICATED, 'true');
    localStorage.setItem(LocalStorageAcessors.TOKEN, loginObject.accessToken);
    localStorage.setItem(LocalStorageAcessors.REFRESH_TOKEN, loginObject.refreshToken);
    localStorage.setItem(LocalStorageAcessors.USERNAME, loginObject.username);
    localStorage.setItem(LocalStorageAcessors.TOKEN_EXPIRATION_DATE, String(decodedToken.exp));
    localStorage.setItem(LocalStorageAcessors.TOKEN_CREATION_DATE, String(decodedToken.iat));
  }

  deleteLoginValues(): void {
    localStorage.removeItem(LocalStorageAcessors.AUTHENTICATED);
    localStorage.removeItem(LocalStorageAcessors.TOKEN);
    localStorage.removeItem(LocalStorageAcessors.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageAcessors.USERNAME);
    localStorage.removeItem(LocalStorageAcessors.TOKEN_EXPIRATION_DATE);
    localStorage.removeItem(LocalStorageAcessors.TOKEN_CREATION_DATE);
  }

  getAuthenticationInfo(): AuthenticationData | null {
    return {
      authenticated: localStorage.getItem(LocalStorageAcessors.AUTHENTICATED),
      token: localStorage.getItem(LocalStorageAcessors.TOKEN),
      refreshToken: localStorage.getItem(LocalStorageAcessors.REFRESH_TOKEN),
      username: localStorage.getItem(LocalStorageAcessors.USERNAME),
      tokenExpiration: localStorage.getItem(LocalStorageAcessors.TOKEN_EXPIRATION_DATE),
      tokenCreated: localStorage.getItem(LocalStorageAcessors.TOKEN_CREATION_DATE)
    };
  }

  refreshToken(refreshResponse: AuthenticationResponse): void {
    localStorage.setItem(LocalStorageAcessors.TOKEN, refreshResponse.accessToken);
    localStorage.setItem(LocalStorageAcessors.REFRESH_TOKEN, refreshResponse.refreshToken);
  }
}
