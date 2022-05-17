import { HttpClient, HttpStatusCode } from '@angular/common/http';
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
    private httpClient: HttpClient,
    private localStorageManagerService: LocalStorageManagerService,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  public login(username: string, password: string): void {
    this.sendLoginRequest(username, password).subscribe({
      next: (success: AuthenticationResponse) => {
        this.localStorageManagerService.setLoginValues(success);
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

  private sendRefreshTokenRequest(): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(ApiEndpoints.REFRESH, {
      refreshToken: this.localStorageManagerService.getAuthenticationInfo()?.refreshToken});
  }

  private sendLogoutRequest(): Observable<LogoutResponse> {
    return this.httpClient.post<LogoutResponse>(ApiEndpoints.LOGOUT, {
      username: this.localStorageManagerService.getAuthenticationInfo()?.username});
  }

  private sendLoginRequest(username: string, password: string): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(ApiEndpoints.LOGIN, {
      username: username,
      password: password
    });
  }
}
