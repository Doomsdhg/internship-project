import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {

  let httpClient: TransactionApiService;
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
    httpClient = TestBed.inject(TransactionApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add authorization header to request', () => {
    httpClient.http.get('').subscribe();
    const httpRequest = httpMock.expectOne('');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
  });

  it('shouldnt add authorization header to request', () => {
    httpClient.http.post('',
      {
        username: 'admin'
      })
      .subscribe();
    const httpRequest = httpMock.expectOne('');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });
});
