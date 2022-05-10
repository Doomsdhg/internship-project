import { NumbersOnlyDirective } from './numbers-only.directive';
import { TestBed } from '@angular/core/testing';
import { NotifyService } from 'src/app/services/notify.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NumericLengthDirective', () => {

  const elementMock = {
    value: '123q'
  };

  let directive: NumbersOnlyDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotifyService,
        NumbersOnlyDirective
      ],
      imports: [
        MatSnackBarModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ]
    });
    directive = TestBed.inject(NumbersOnlyDirective);
  });

  it('should delete last symbol and call `showtTranslatedMessage`',
  () => {
    spyOn(directive.notify, 'showTranslatedMessage').and.callThrough();
    directive.onInput(elementMock);
    expect(directive.notify.showTranslatedMessage).toHaveBeenCalled();
    expect(elementMock.value).toBe('123');
  });
});
