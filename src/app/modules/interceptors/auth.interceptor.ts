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
    const isLogOutRequest = request.body && request.body.username;
    if (isLogOutRequest) {
      return next.handle(request);
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
    return next.handle(request);
  }
}
