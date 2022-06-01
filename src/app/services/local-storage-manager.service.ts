import { HttpStatusCode } from './../enums/HttpStatusCode';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { AuthenticationData } from 'src/app/interfaces/authentication.interface';
import { Constants } from '../constants/constants';
import { AuthenticationResponse, DecodedToken } from '../interfaces/authentication.interface';
import { HeaderConstants } from 'src/app/components/header/header.constants';
import { TimeFormatDifference } from './local-storage-manager.service.constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  public setLoginValues(loginObject: AuthenticationResponse): void {
    const decodedToken: DecodedToken = jwtDecode(loginObject.accessToken);
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.AUTHENTICATED, 'true');
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN, loginObject.accessToken);
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.REFRESH_TOKEN, loginObject.refreshToken);
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.USERNAME, loginObject.username);
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN_EXPIRATION_DATE, this.convertDateToLocalFormat(decodedToken.exp));
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN_CREATION_DATE, this.convertDateToLocalFormat(decodedToken.iat));
  }

  public setPageSize(pageSize: string = String(Constants.PAGEABLE_DEFAULTS.PAGE_SIZE)): void {
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.PAGE_SIZE, pageSize);
  }

  public deleteLoginValues(): void {
    localStorage.removeItem(Constants.LOCAL_STORAGE.ACCESSORS.AUTHENTICATED);
    localStorage.removeItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN);
    localStorage.removeItem(Constants.LOCAL_STORAGE.ACCESSORS.REFRESH_TOKEN);
    localStorage.removeItem(Constants.LOCAL_STORAGE.ACCESSORS.USERNAME);
    localStorage.removeItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN_EXPIRATION_DATE);
    localStorage.removeItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN_CREATION_DATE);
  }

  public getAuthenticationInfo(): AuthenticationData {
    return {
      authenticated: localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.AUTHENTICATED) || Constants.LOCAL_STORAGE.DEFAULT_VALUE,
      token: localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN) || Constants.LOCAL_STORAGE.DEFAULT_VALUE,
      refreshToken: localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.REFRESH_TOKEN) || Constants.LOCAL_STORAGE.DEFAULT_VALUE,
      username: localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.USERNAME) || Constants.LOCAL_STORAGE.DEFAULT_VALUE,
      tokenExpiration: localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN_EXPIRATION_DATE)
        || Constants.LOCAL_STORAGE.DEFAULT_VALUE,
      tokenCreated: localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN_CREATION_DATE) || Constants.LOCAL_STORAGE.DEFAULT_VALUE
    };
  }

  public refreshToken(refreshResponse: AuthenticationResponse): void {
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.TOKEN, refreshResponse.accessToken);
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.REFRESH_TOKEN, refreshResponse.refreshToken);
  }

  public setNewTheme(newTheme: string): void {
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.THEME, newTheme);
  }

  public get chosenTheme(): string {
    return localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.THEME) || HeaderConstants.AVAILABLE_THEMES.LIGHT.name;
  }

  public get pageSize(): number {
    return Number(localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.PAGE_SIZE)) || Constants.PAGEABLE_DEFAULTS.PAGE_SIZE;
  }

  private convertDateToLocalFormat(date: number): string {
    return moment(((date + TimeFormatDifference.GMT_DIFFERENCE)) * TimeFormatDifference.MULTIPLIER).toString();
  }
}
