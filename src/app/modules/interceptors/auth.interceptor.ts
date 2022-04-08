import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { AuthenticationResponse } from '../interfaces/authentication.interface';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private web: AuthService, private localStorageManager: LocalStorageManagerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(Date.now());
    console.log(Number(this.localStorageManager.getAuthenticationInfo()?.tokenExpiration) * 1000);
    if (Date.now() > Number(this.localStorageManager.getAuthenticationInfo()?.tokenExpiration) * 1000 || 0) {
      this.web.refreshToken().subscribe((success: AuthenticationResponse) => {
        this.localStorageManager.refreshToken(success);
      });
    }
    console.log(request);
    console.log(this.localStorageManager.getAuthenticationInfo()?.token);
    if (request.url !== `${environment.serverUrl}${ApiEndpoints.LOGIN}`) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${this.localStorageManager.getAuthenticationInfo()?.token}`)
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
