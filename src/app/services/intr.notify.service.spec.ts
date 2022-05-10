import { TestBed } from '@angular/core/testing';
import { Snackbar } from '../constants/snackbar.constants';
import { TransactionsTableComponent } from '../modules/components/transactions-table/intr.transactions-table.component';
import { NotifyService } from './intr.notify.service';
import {  MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import {
  TranslateModule,
  DEFAULT_LANGUAGE,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateParser,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  USE_STORE
} from '@ngx-translate/core';


describe('NotifyService', () => {
  let service: NotifyService;
  let snackBar: MatSnackBar;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsTableComponent],
      imports: [
        TranslateModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        NotifyService,
        TranslateService,
        TranslateStore,
        TranslateLoader,
        TranslateCompiler,
        TranslateParser,
        MissingTranslationHandler,
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
      ]
    });
    service = TestBed.inject(NotifyService);
    snackBar = TestBed.inject(MatSnackBar);
    translate = TestBed.inject(TranslateService);
  });

  it('should call snackbar opening function', () => {
    spyOn(snackBar, 'open').and.callThrough();
    service.showMessage('ok', Snackbar.SUCCESS_TYPE);
    expect(snackBar.open).toHaveBeenCalled();
  });

  it('should call snackbar opening function (translated)', () => {
    spyOn(snackBar, 'open').and.callThrough();
    spyOn(translate, 'get').and.callFake(() => {
      return new Observable((observer) => {
        observer.complete();
      });
    });
    spyOn(service, 'showMessage').and.callFake(() => {
      console.log('ok');
    });
    service.showTranslatedMessage('ok', Snackbar.SUCCESS_TYPE);
    setTimeout(() => {
      expect(service.showMessage).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalled();
    }, 1000);
  });
});
