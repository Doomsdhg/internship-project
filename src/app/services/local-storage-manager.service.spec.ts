import { TestBed } from '@angular/core/testing';
import { LocalStorageAcessors } from '../constants/local-storage-accessors.constants';
import { AuthenticationResponse } from '../interfaces/authentication.interface';
import { LocalStorageManagerService } from './local-storage-manager.service';

describe('LocalStorageManagerService', () => {

  const loginObject: AuthenticationResponse = {
    username: 'test',
    type: 'test',
    refreshToken: 'qwe',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  };

  const comparableAuthenticationData = {
    authenticated: 'true',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refreshToken: 'qwe',
    username: 'test',
    tokenExpiration: 'NaN',
    tokenCreated: '1516228222000'
  };

  const refreshTokenObject: AuthenticationResponse = {
    username: '',
    type: '',
    refreshToken: '123',
    accessToken: '1234'
  };

  let service: LocalStorageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageManagerService);
  });

  it('should update local storage authentication data', () => {
    service.setLoginValues(loginObject);
    expect(localStorage.getItem(LocalStorageAcessors.AUTHENTICATED)).toBe(comparableAuthenticationData.authenticated);
    expect(localStorage.getItem(LocalStorageAcessors.TOKEN)).toBe(comparableAuthenticationData.token);
    expect(localStorage.getItem(LocalStorageAcessors.REFRESH_TOKEN)).toBe(comparableAuthenticationData.refreshToken);
    expect(localStorage.getItem(LocalStorageAcessors.USERNAME)).toBe(comparableAuthenticationData.username);
    expect(localStorage.getItem(LocalStorageAcessors.TOKEN_EXPIRATION_DATE)).toBe(comparableAuthenticationData.tokenExpiration);
    expect(localStorage.getItem(LocalStorageAcessors.TOKEN_CREATION_DATE)).toBe(comparableAuthenticationData.tokenCreated);
  });

  it('should set page size in local storage', () => {
    service.setPageSize('7');
    expect(localStorage.getItem(LocalStorageAcessors.PAGE_SIZE)).toBe('7');
  });

  it('should delete local storage authentication data', () => {
    service.deleteLoginValues();
    expect(localStorage.getItem(LocalStorageAcessors.AUTHENTICATED)).toBeFalsy();
    expect(localStorage.getItem(LocalStorageAcessors.TOKEN)).toBeFalsy();
    expect(localStorage.getItem(LocalStorageAcessors.REFRESH_TOKEN)).toBeFalsy();
    expect(localStorage.getItem(LocalStorageAcessors.USERNAME)).toBeFalsy();
    expect(localStorage.getItem(LocalStorageAcessors.TOKEN_EXPIRATION_DATE)).toBeFalsy();
    expect(localStorage.getItem(LocalStorageAcessors.TOKEN_CREATION_DATE)).toBeFalsy();
  });

  it('should return object with authentication info', () => {
    service.setLoginValues(loginObject);
    const result = service.getAuthenticationInfo();
    expect(result).toEqual(comparableAuthenticationData);
  });

  it('should refresh token info in local storage', () => {
    service.refreshToken(refreshTokenObject);
    const result = service.getAuthenticationInfo();
    expect(result?.refreshToken).toEqual(refreshTokenObject.refreshToken);
    expect(result?.token).toEqual(refreshTokenObject.accessToken);
  });
});
