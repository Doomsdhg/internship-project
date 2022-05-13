import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants/general.constants';
import { AuthenticationResponse, LogoutResponse } from 'src/app/modules/interfaces/authentication.interface';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient
  ) { }

  public login(username: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post(ApiEndpoints.LOGIN, {
      username: username,
      password: password
    }) as Observable<AuthenticationResponse>;
  }

  public logout(): Observable<LogoutResponse> {
    return this.http.post(ApiEndpoints.LOGOUT, {
      username: localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.USERNAME)
    }) as Observable<LogoutResponse>;
  }

  public refreshToken(): Observable<AuthenticationResponse> {
    return this.http.post(ApiEndpoints.REFRESH, {
      refreshToken: localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.REFRESH_TOKEN)
    }) as Observable<AuthenticationResponse>;
  }
}
