import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AuthService } from './app.intr.auth.service';

describe('AuthService', () => {

  const loginResponseExample = {
    accessToken: '123qwe',
    refreshToken: 'qwe123',
    username: 'test_user',
    type: 'admin'
  };

  const logoutResponseExample = {
    message: 'logged out successfully!'
  };

  let service: AuthService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
  });

  it('should return object with login data', (done) => {
    spyOn(http, 'post').and.callFake((): any => {
      return new Observable((observer) => {
        observer.next(loginResponseExample);
        observer.complete();
      });
    });
    service.login('qwe', 'qwe').subscribe((success) => {
      expect(success).toEqual(loginResponseExample);
      done();
    });
  });

  it('should return object with logout data', (done) => {
    spyOn(http, 'post').and.callFake((): any => {
      return new Observable((observer) => {
        observer.next(logoutResponseExample);
        observer.complete();
      });
    });
    service.logout().subscribe((success) => {
      expect(success).toEqual(logoutResponseExample);
      done();
    });
  });

  it('should return object with login data', (done) => {
    spyOn(http, 'post').and.callFake((): any => {
      return new Observable((observer) => {
        observer.next(loginResponseExample);
        observer.complete();
      });
    });
    service.refreshToken().subscribe((success) => {
      expect(success).toEqual(loginResponseExample);
      done();
    });
  });
});
