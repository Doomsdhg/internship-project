import {
  HttpErrorResponse,
  HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { HttpStatusCode } from 'src/app/enums/HttpStatusCode';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request)
      .pipe(tap({
        next: (response: any) => {
          return response;
        },
        error: (error: HttpErrorResponse) => {
          switch (error.status) {
            case HttpStatusCode.NOT_FOUND:
              this.router.navigate([AppRoutes.PAGE_NOT_FOUND]);
              break;
            case HttpStatusCode.INTERNAL_SERVER_ERROR:
              this.router.navigate([AppRoutes.INTERNAL_SERVER_ERROR]);
              break;
            default:
              break;
          }
        }
      }));
  }
}
