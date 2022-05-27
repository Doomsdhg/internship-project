import {
  HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { HttpStatusCode } from 'src/app/enums/HttpStatusCode';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request)
    .pipe(map((response: any) => {
      console.log(response);
      switch (response.status) {
        case HttpStatusCode.NOT_FOUND:
          this.router.navigate([AppRoutes.PAGE_NOT_FOUND]);
          break;
        case HttpStatusCode.INTERNAL_SERVER_ERROR:
          this.router.navigate([AppRoutes.INTERNAL_SERVER_ERROR]);
          break;
        default:
          break;
      }
      return response;
    }));
  }
}
