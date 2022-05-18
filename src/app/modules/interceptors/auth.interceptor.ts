import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { finalize, map, Observable, throwError } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { HttpStatusCode } from '../../enums/HttpStatusCode';

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
    if (isAuthenticated && moment() > moment(Number(this.localStorageManagerService.getAuthenticationInfo()?.tokenExpiration))) {
      this.authService.refreshToken();
    }
    return next.handle(request)
      .pipe(
        map((response: HttpEvent<any>): HttpEvent<any> | Observable<Error> | void => {
          if (response instanceof HttpErrorResponse) {
            if (response.status === HttpStatusCode.UNAUTHORIZED) {
              this.authService.executeLogoutProcedures();
            }
            return this.handleError(response);
          } else if (response instanceof HttpResponse && response.status === HttpStatusCode.OK) {
            return response;
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
