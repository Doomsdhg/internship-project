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
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import moment from 'moment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private localStorageManager: LocalStorageManagerService,
    private spinnerService: SpinnerService
    ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinnerService.displaySpinner();
    const isNotAuthenticated = !this.localStorageManager.getAuthenticationInfo()?.authenticated;
    const isLogOutRequest = request.body && request.body.username;
    if (isNotAuthenticated || isLogOutRequest) {
      this.handleDefaultCase(request, next);
    }
    if (moment() > moment(Number(this.localStorageManager.getAuthenticationInfo()?.tokenExpiration))) {
      this.authService.refreshToken();
    }
    if (request.url !== ApiEndpoints.LOGIN) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${this.localStorageManager.getAuthenticationInfo()?.token}`)
      });
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
    const errorText = 'status: ' + response.status + ', error: ' + response.message;
    return throwError(() => new Error(errorText));
  }
}
