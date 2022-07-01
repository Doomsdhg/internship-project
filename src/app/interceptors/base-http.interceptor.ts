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

  constructor(
    private authService: AuthService,
    private localStorageManagerService: LocalStorageManagerService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  private currentRequest!: HttpRequest<any>;

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.optimisticUpdateCaseUrls.includes(request.url)) {
      return this.handleOptimisticUpdateCase(request, next);
    }
    this.spinnerService.displaySpinner();
    this.currentRequest = request;
    const isNotAuthenticated = !this.localStorageManagerService.getAuthenticationInfo()?.authenticated;
    request = this.requestWithAuthHeader;
    if (this.defaultCaseUrls.includes(request.url) || isNotAuthenticated) {
      return this.handleDefaultCase(request, next);
    }
    if (moment() > moment(this.localStorageManagerService.getAuthenticationInfo()?.tokenExpiration)) {
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

  private get requestWithAuthHeader(): HttpRequest<any> {
    return this.currentRequest.clone({
      headers: this.currentRequest.headers.append('Authorization', `Bearer ${this.localStorageManagerService.getAuthenticationInfo()?.token}`)
    });
  }

  private handleDefaultCase(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<void>> {
    return next.handle(request)
      .pipe(
        finalize(() => this.executeFinalProcedures())
      );
  }

  private handleOptimisticUpdateCase(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<void>> {
    return next.handle(request);
  }

  private executeFinalProcedures(): void {
    this.spinnerService.hideSpinner();
  }

  private handleError(response: HttpErrorResponse): void {
    this.router.navigateByUrl(AppRoutes.getErrorPageRoute(response.status));
  }

  private get defaultCaseUrls(): string[] {
    return [
      ApiEndpoints.AUTH_ENDPOINTS.LOGOUT,
      ApiEndpoints.AUTH_ENDPOINTS.REFRESH_TOKEN
    ];
  }

  private get optimisticUpdateCaseUrls(): string[] {
    return [
      ApiEndpoints.NOTIFICATIONS.getListUrl(this.localStorageManagerService.getAuthenticationInfo()?.username)
    ];
  }
}
