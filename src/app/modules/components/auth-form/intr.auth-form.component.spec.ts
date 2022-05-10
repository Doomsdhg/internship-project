import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { AuthFormComponent } from './intr.auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

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

  it('should login', (done) => {
    component.authForms = new FormGroup({
      login: new FormControl('admin'),
      password: new FormControl('admin'),
    });
    console.log('jwt ' + localStorage.getItem('jwt'));
    component.login();
    console.log('jwt ' + localStorage.getItem('jwt'));
    expect(localStorage.getItem(LocalStorageAcessors.TOKEN)).toBeTruthy();
    done();
  });
});
