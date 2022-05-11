import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { AuthenticationResponse } from '../interfaces/authentication.interface';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/app/constants/main.constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public web: AuthService,
    public localStorageManager: LocalStorageManagerService,
    public router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLogOutRequest = request.body && request.body.username;
    if (isLogOutRequest) {
      return next.handle(request);
    }
    if (Date.now() > Number(this.localStorageManager.getAuthenticationInfo()?.tokenExpiration)) {
      this.web.refreshToken().subscribe((success: AuthenticationResponse) => {
        this.localStorageManager.refreshToken(success);
      });
    }
    if (request.url !== `${environment.serverUrl}${Constants.API_ENDPOINTS.LOGIN}`) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${this.localStorageManager.getAuthenticationInfo()?.token}`)
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const unauthorized = error.status === 401;
        if (unauthorized) {
          this.localStorageManager.deleteLoginValues();
          this.router.navigate([Constants.APP_ROUTES.AUTHENTICATION]);
        }
        return throwError(() => new Error(error.message));
    })
    );
  }
}
