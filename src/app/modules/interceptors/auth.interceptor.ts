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
import { AuthenticationResponse } from '../interfaces/authentication.interface';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HttpStatusCode } from '../../enums/HttpStatusCode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public web: AuthService,
    public localStorageManager: LocalStorageManagerService,
    public router: Router,
    public spinnerService: SpinnerService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinnerService.displaySpinner();
    const isLogOutRequest = request.body && request.body.username;
    if (isLogOutRequest) {
      return next.handle(request).pipe(
        finalize((): void => {
          this.spinnerService.hideSpinner();
        })
      );
    }
    if (Date.now() > Number(this.localStorageManager.getAuthenticationInfo()?.tokenExpiration)) {
      this.web.refreshToken().subscribe((success: AuthenticationResponse) => {
        this.localStorageManager.refreshToken(success);
      });
    }
    if (request.url !== `${environment.serverUrl}${ApiEndpoints.LOGIN}`) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${this.localStorageManager.getAuthenticationInfo()?.token}`)
      });
    }
    return next.handle(request).pipe(
      map((response: HttpEvent<any>): HttpEvent<any> | Observable<Error> => {
        console.log(response);
        console.log(response instanceof HttpErrorResponse);
        if (response instanceof HttpErrorResponse) {
          if (response.status === HttpStatusCode.UNAUTHORIZED) {
            this.logout();
          }
          return this.handleError(response);
        } else {
          console.log('return response');
          return response;
        }
      }),
      finalize((): void => {
        this.spinnerService.hideSpinner();
      })
    );
  }

  private logout(): void {
    this.localStorageManager.deleteLoginValues();
    this.router.navigate([AppRoutes.AUTHENTICATION]);
  }

  private handleError(response: HttpErrorResponse): Observable<Error> {
    const errorText = 'status: ' + response.status + ', error: ' + response.message;
    return throwError(() => new Error(errorText));
  }
}
