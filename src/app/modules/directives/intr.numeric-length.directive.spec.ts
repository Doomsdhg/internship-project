import { NumericLengthDirective } from './numeric-length.directive';
import { TestBed } from '@angular/core/testing';
import { NotifyService } from 'src/app/services/notify.service';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule} from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NumericLengthDirective', () => {

  const twelveNines = '9999999999.99';
  const thirteenNines = '99999999999.99';

  const elementMock = {
    value: thirteenNines
  };

  let directive: NumericLengthDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotifyService,
        NumericLengthDirective,
      ],
      imports: [
        MatSnackBarModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ]
    });
    directive = TestBed.inject(NumericLengthDirective);
  });

  it('should return string of maximum possible number with first argument as amount of digits before decimal point and second argument as amount of digits after decimal point',
  () => {
    directive.previousValue = twelveNines;
    directive.options = [10, 2];
    directive.onInput(elementMock);
    expect(elementMock.value).toBe(twelveNines);
  });
});
