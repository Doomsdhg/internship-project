import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { Constants } from 'src/app/constants/constants';
import { AuthenticationResponse, AuthenticationResponseError, LogoutResponse } from 'src/app/interfaces/authentication.interface';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { NotifyService } from 'src/app/services/notify.service';
import { LoginRequestBody, LogoutRequestBody, RefreshTokenRequestBody } from './auth.service.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private localStorageManagerService: LocalStorageManagerService,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  public login(username: string, password: string): void {
    this.sendLoginRequest(username, password).subscribe({
      next: (response: AuthenticationResponse) => {
        this.executeLoginProcedures(response);
      },
      error: (error: AuthenticationResponseError) => {
        this.notifyService.showMessage(error.error.message, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  public refreshToken(): void {
    this.sendRefreshTokenRequest().subscribe({
      next: (success: AuthenticationResponse) => {
        this.localStorageManagerService.refreshToken(success);
      },
      error: (error: AuthenticationResponseError) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.executeLogoutProcedures();
        }
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
    this.localStorageManagerService.deleteLoginValues();
    this.router.navigate([AppRoutes.AUTHENTICATION]);
  }

  private executeLoginProcedures(response: AuthenticationResponse): void {
    this.localStorageManagerService.setLoginValues(response);
    this.router.navigate([AppRoutes.TRANSACTIONS]);
  }

  private sendRefreshTokenRequest(): Observable<AuthenticationResponse> {
    const refreshToken = this.localStorageManagerService.getAuthenticationInfo()?.refreshToken;
    const refreshTokenRequestBody: RefreshTokenRequestBody = { refreshToken };
    return this.httpClient.post<AuthenticationResponse>(ApiEndpoints.AUTH_ENDPOINTS.TOKEN_REFRESHMENT_URL, refreshTokenRequestBody);
  }

  private sendLogoutRequest(): Observable<LogoutResponse> {
    const username = this.localStorageManagerService.getAuthenticationInfo()?.username;
    const logoutRequestBody: LogoutRequestBody = { username };
    return this.httpClient.post<LogoutResponse>(ApiEndpoints.AUTH_ENDPOINTS.LOGOUTTING_URL, logoutRequestBody);
  }

  private sendLoginRequest(username: string, password: string): Observable<AuthenticationResponse> {
    const loginRequestBody: LoginRequestBody = { username, password };
    return this.httpClient.post<AuthenticationResponse>(ApiEndpoints.AUTH_ENDPOINTS.LOGINNING_URL, loginRequestBody);
  }
}
