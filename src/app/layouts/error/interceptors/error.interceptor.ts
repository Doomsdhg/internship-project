import {
  HttpErrorResponse,
  HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { HttpStatusCode } from 'src/app/enums/HttpStatusCode';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private localStorageManagerService: LocalStorageManagerService) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request)
      .pipe(tap({
        next: (response: any) => {
          this.localStorageManagerService.error = HttpStatusCode.INTERNAL_SERVER_ERROR;
          this.router.navigate([AppRoutes.ERROR]);
        },
        error: (error: HttpErrorResponse) => {
          this.localStorageManagerService.error = error.status;
          this.router.navigate([AppRoutes.ERROR]);
        }
      }));
  }
}
