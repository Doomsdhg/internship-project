import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { DecodedToken, AuthenticationResponse } from '../modules/interfaces/authentication.interface';
import { Constants } from '../constants/general.constants';
import { AuthenticationData } from 'src/app/modules/interfaces/authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  public setLoginValues(loginObject: AuthenticationResponse): void {
    const decodedToken: DecodedToken = jwtDecode(loginObject.accessToken);
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.AUTHENTICATED, 'true');
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN, loginObject.accessToken);
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.REFRESH_TOKEN, loginObject.refreshToken);
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.USERNAME, loginObject.username);
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN_EXPIRATION_DATE, String((decodedToken.exp - 10800) * 1000));
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN_CREATION_DATE, String((decodedToken.iat - 10800) * 1000));
  }

  public setPageSize(pageSize: string): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.PAGE_SIZE, pageSize || String(Constants.PAGEABLE_DEFAULTS.defaultPageSize));
  }

  public deleteLoginValues(): void {
    localStorage.removeItem(Constants.LOCAL_STORAGE_ACCESSORS.AUTHENTICATED);
    localStorage.removeItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN);
    localStorage.removeItem(Constants.LOCAL_STORAGE_ACCESSORS.REFRESH_TOKEN);
    localStorage.removeItem(Constants.LOCAL_STORAGE_ACCESSORS.USERNAME);
    localStorage.removeItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN_EXPIRATION_DATE);
    localStorage.removeItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN_CREATION_DATE);
  }

  public getAuthenticationInfo(): AuthenticationData | null {
    return {
      authenticated: localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.AUTHENTICATED),
      token: localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN),
      refreshToken: localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.REFRESH_TOKEN),
      username: localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.USERNAME),
      tokenExpiration: localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN_EXPIRATION_DATE),
      tokenCreated: localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN_CREATION_DATE)
    };
  }

  public refreshToken(refreshResponse: AuthenticationResponse): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.TOKEN, refreshResponse.accessToken);
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.REFRESH_TOKEN, refreshResponse.refreshToken);
  }
}
