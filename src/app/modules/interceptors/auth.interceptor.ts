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
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private web: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (Date.now() > +(localStorage.getItem(LocalStorageAcessors.TOKEN_EXPIRATION_DATE) || 0)) {
      this.web.refreshToken().subscribe((success: AuthenticationResponse) => {
        localStorage.setItem(LocalStorageAcessors.TOKEN, success.accessToken);
        localStorage.setItem(LocalStorageAcessors.REFRESH_TOKEN, success.refreshToken);
      });
    }
    return next.handle(request);
  }
}
