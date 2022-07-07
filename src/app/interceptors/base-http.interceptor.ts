import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { catchError, finalize, Observable, ObservableInput } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { AuthService } from 'src/app/layouts/auth/services/auth.service';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HttpStatusCode } from '../enums/HttpStatusCode';

@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {

  public excludedUrls: string[] = [
    ApiEndpoints.AUTH_ENDPOINTS.LOGOUT,
    ApiEndpoints.AUTH_ENDPOINTS.REFRESH_TOKEN,
    ApiEndpoints.NOTIFICATIONS.getListUrl(this.localStorageManagerService.getAuthenticationInfo()?.username)
  ];

  constructor(
    private authService: AuthService,
    private localStorageManagerService: LocalStorageManagerService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = this.addAuthHeader(request);

    this.spinnerService.displaySpinner();

    if (this.isExcludedUrl(request.url)) {
      return next.handle(request);
    } else if (this.tokenIsExpired()) {
      this.authService.refreshToken();
    }

    return next.handle(request)
      .pipe(
        catchError((errorResponse: HttpErrorResponse): ObservableInput<any> => {
          switch (errorResponse.status) {
            case HttpStatusCode.UNAUTHORIZED:
              this.authService.executeLogoutProcedures();
              break;
            case HttpStatusCode.NOT_FOUND:
              this.handleError(errorResponse);
              break;
            case HttpStatusCode.INTERNAL_SERVER_ERROR:
              this.handleError(errorResponse);
              break;
            default:
              break;
          }
          return [errorResponse];
        }),
        finalize(() => this.executeFinalProcedures())
      );
  }

  private addAuthHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers.append('Authorization', `Bearer ${this.localStorageManagerService.getAuthenticationInfo()?.token}`)
    });
  }

  private executeFinalProcedures(): void {
    this.spinnerService.hideSpinner();
  }

  private handleError(response: HttpErrorResponse): void {
    this.router.navigateByUrl(AppRoutes.getErrorPageRoute(response.status));
  }

  private isExcludedUrl(url: string): boolean {
    return this.excludedUrls.includes(url);
  }

  private tokenIsExpired(): boolean {
    return moment() > moment(this.localStorageManagerService.getAuthenticationInfo()?.tokenExpiration);
  }
}
