import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { Constants } from 'src/app/constants/constants';
import { AuthenticationResponse, AuthenticationResponseError, LogoutResponse } from 'src/app/modules/interfaces/authentication.interface';
import { LocalStorageManagerService } from '../local-storage-manager.service';
import { NotifyService } from '../notify.service';

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
    return this.httpClient.post<AuthenticationResponse>(ApiEndpoints.AUTH_ENDPOINTS.TOKEN_REFRESHMENT_URL, {
      refreshToken: this.localStorageManagerService.getAuthenticationInfo()?.refreshToken
    });
  }

  private sendLogoutRequest(): Observable<LogoutResponse> {
    return this.httpClient.post<LogoutResponse>(ApiEndpoints.AUTH_ENDPOINTS.LOGOUTTING_URL, {
      username: this.localStorageManagerService.getAuthenticationInfo()?.username
    });
  }

  private sendLoginRequest(username: string, password: string): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(ApiEndpoints.AUTH_ENDPOINTS.LOGINNING_URL, {
      username: username,
      password: password
    });
  }
}
