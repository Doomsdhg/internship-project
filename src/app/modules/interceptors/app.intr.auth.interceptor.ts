import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/web-services/app.intr.auth.service';
import { AuthenticationResponse } from '../interfaces/app.intr.authentication.interface';
import { LocalStorageManagerService } from 'src/app/services/app.intr.local-storage-manager.service';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/app/constants/main.constants';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/app.intr.spinner.service';
import { map } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService,
    public localStorageManagerService: LocalStorageManagerService,
    public router: Router,
    public spinnerService: SpinnerService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinnerService.displaySpinner();
    const isLogOutRequest = request.body && request.body.username;
    if (isLogOutRequest) {
      return next.handle(request);
    }
    if (Date.now() > Number(this.localStorageManagerService.getAuthenticationInfo()?.tokenExpiration)) {
      this.authService.refreshToken().subscribe((success: AuthenticationResponse) => {
        this.localStorageManagerService.refreshToken(success);
      });
    }
    if (request.url !== `${environment.serverUrl}${Constants.API_ENDPOINTS.LOGIN}`) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${this.localStorageManagerService.getAuthenticationInfo()?.token}`)
      });
    }

    return next.handle(request).pipe(
      map((response: any) => {
        const noError = response.status === 200;
        const unauthorized = response.status === 401;
        if (unauthorized) {
          this.localStorageManagerService.deleteLoginValues();
          this.router.navigate([Constants.APP_ROUTES.AUTHENTICATION]);
        }
          this.spinnerService.hideSpinner();
        if (noError) {
          return response;
        }
        return throwError(() => new Error(response.message));
      })
    );
  }
}
