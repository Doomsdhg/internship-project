import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { finalize, Observable, tap, throwError } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { AuthService } from 'src/app/layouts/auth/services/auth.service';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HttpStatusCode } from '../../../enums/HttpStatusCode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private localStorageManagerService: LocalStorageManagerService,
    private spinnerService: SpinnerService
  ) { }

  private currentRequest!: HttpRequest<any>;

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinnerService.displaySpinner();
    this.currentRequest = request;
    const isAuthenticated = this.localStorageManagerService.getAuthenticationInfo()?.authenticated;
    const isLogOutRequest = request.body && request.body.username;
    const isRefreshRequest = request.body && request.body.refreshToken;
    request = this.requestWithAuthHeader;
    if (!isAuthenticated || isLogOutRequest || isRefreshRequest) {
      return this.handleDefaultCase(request, next);
    }
    if (isAuthenticated && moment() > moment(this.localStorageManagerService.getAuthenticationInfo()?.tokenExpiration)) {
      this.authService.refreshToken();
    }
    return next.handle(request)
      .pipe(tap({
        next: (response: any): HttpResponse<any> => {
          return response;
        },
        error: (response: any): Observable<Error> => {
          if (response.status === HttpStatusCode.UNAUTHORIZED) {
            this.authService.executeLogoutProcedures();
          }
          return this.handleError(response);
        }
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

  private executeFinalProcedures(): void {
    this.spinnerService.hideSpinner();
  }

  private handleError(response: HttpErrorResponse): Observable<Error> {
    const errorText = Constants.SNACKBAR.MESSAGES.getErrorResponseMessage(response.status, response.message);
    return throwError(() => new Error(errorText));
  }
}
