import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';
import { AuthenticationResponse, LogoutResponse } from 'src/app/modules/interfaces/app.intr.authentication.interface';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient
  ) { }

  login(username: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post(`${environment.serverUrl}${ApiEndpoints.LOGIN}`, {
      username: username,
      password: password
    }) as Observable<AuthenticationResponse>;
  }

  logout(): Observable<LogoutResponse> {
    return this.http.post(`${environment.serverUrl}${ApiEndpoints.LOGOUT}`, {
      username: localStorage.getItem(LocalStorageAcessors.USERNAME)
    }) as Observable<LogoutResponse>;
  }

  refreshToken(): Observable<AuthenticationResponse> {
    return this.http.post(`${environment.serverUrl}${ApiEndpoints.REFRESH}`, {
      refreshToken: localStorage.getItem(LocalStorageAcessors.REFRESH_TOKEN)
    }) as Observable<AuthenticationResponse>;
  }
}
