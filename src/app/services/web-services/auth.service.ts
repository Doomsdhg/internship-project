import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse, AuthenticationResponseError, LogoutResponse } from 'src/app/modules/interfaces/authentication.interface';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { LocalStorageManagerService } from '../local-storage-manager.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { NotifyService } from '../notify.service';
import { Constants } from 'src/app/constants/general.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorageManager: LocalStorageManagerService,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  public login(username: string, password: string): void {
    this.sendLoginRequest(username, password).subscribe({
      next: (success: AuthenticationResponse) => {
        this.localStorageManager.setLoginValues(success);
        this.router.navigate([AppRoutes.TRANSACTIONS]);
      },
      error: (error: AuthenticationResponseError) => {
        this.notifyService.showMessage(error.error.message, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  public refreshToken(): void {
    this.sendRefreshTokenRequest().subscribe({
      next: (success: AuthenticationResponse) => {
      this.localStorageManager.refreshToken(success);
      },
      error: (error: AuthenticationResponseError) => {
        this.notifyService.showMessage(error.error.message, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  public logout(): void {
    this.sendLogoutRequest().subscribe({
      next: () => {
      this.executeLogoutProcedures();
      },
      error: (error: AuthenticationResponseError) => {
        this.notifyService.showMessage(error.error.message, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  public executeLogoutProcedures(): void {
    this.localStorageManager.deleteLoginValues();
    this.router.navigate([AppRoutes.AUTHENTICATION]);
  }

  private sendRefreshTokenRequest(): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(ApiEndpoints.REFRESH, {
      refreshToken: this.localStorageManager.getAuthenticationInfo()?.refreshToken});
  }

  private sendLogoutRequest(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(ApiEndpoints.LOGOUT, {
      username: this.localStorageManager.getAuthenticationInfo()?.username});
  }

  private sendLoginRequest(username: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(ApiEndpoints.LOGIN, {
      username: username,
      password: password
    });
  }
}
