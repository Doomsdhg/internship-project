import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError, map, finalize } from 'rxjs';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HttpStatusCode } from '../../enums/HttpStatusCode';
import moment from 'moment';
import { Constants } from 'src/app/constants/general.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private localStorageManagerService: LocalStorageManagerService,
    private spinnerService: SpinnerService
    ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinnerService.displaySpinner();
    const isAuthenticated = this.localStorageManagerService.getAuthenticationInfo()?.authenticated;
    const isLogOutRequest = request.body && request.body.username;
    if (!isAuthenticated || isLogOutRequest) {
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
      finalize(() => this.spinnerService.hideSpinner())
    );
  }

  private handleDefaultCase(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<void>> {
    return next.handle(request)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner())
      );
  }

  private handleError(response: HttpErrorResponse): Observable<Error> {
    const errorText = Constants.SNACKBAR.MESSAGES.GET_ERROR_RESPONSE_MESSAGE(response.status, response.message);
    return throwError(() => new Error(errorText));
  }
}
