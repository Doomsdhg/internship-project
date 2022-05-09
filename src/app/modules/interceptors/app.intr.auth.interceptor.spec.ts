import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionApiService } from 'src/app/services/web-services/app.intr.transaction-api.service';
import { AuthInterceptor } from './app.intr.auth.interceptor';

describe('AuthInterceptor', () => {

  let service: TransactionApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        TransactionApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.get(TransactionApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add authorization header to request', () => {
    service.http.get('').subscribe();
    const httpRequest = httpMock.expectOne('');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
  });
});
