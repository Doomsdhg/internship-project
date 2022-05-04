import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture,  TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { AuthenticationResponse } from '../../interfaces/authentication.interface';
import { AuthFormComponent } from './auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  const authenticationResponseMock: AuthenticationResponse = {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refreshToken: 'string',
    username: 'string',
    type: 'string'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
      providers: [
        TranslateService,
        TranslateStore,
        TranslateLoader
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should login', () => {
    spyOn(component.auth.http, 'post').and.callFake((): any => {
      return new Observable((observer) => {
        observer.next(authenticationResponseMock);
        observer.complete();
      });
    });
    spyOn(component.router, 'navigate').and.callFake((): any => {
      console.log('ok');
    });
    component.authForms = new FormGroup({
      login: new FormControl('admin'),
      password: new FormControl('admin'),
    });
    component.login();
    expect(localStorage.getItem(LocalStorageAcessors.TOKEN)).toBeTruthy();
  });
});