import { NumericLengthDirective } from './numeric-length.directive';
import { TestBed } from '@angular/core/testing';
import { NotifyService } from 'src/app/services/notify.service';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateParser,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG,
  USE_STORE,
  USE_EXTEND,
  DEFAULT_LANGUAGE } from '@ngx-translate/core';

describe('NumericLengthDirective', () => {
  let directive: NumericLengthDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifyService,
        NumericLengthDirective,
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
      ],
      imports: [MatSnackBarModule]
    });
    directive = TestBed.inject(NumericLengthDirective);
  });

  it('should be created', () => {
    expect(directive).toBeTruthy();
  });

  it('should return string of maximum possible number with first argument as amount of digits before decimal point and' +
  'second argument as amount of digits after decimal point',
  () => {
    const result = directive.getMaxPossibleDecimal(10, 2);
    expect(result).toBe('9999999999.99');
  });
});
