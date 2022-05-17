import { Directive, HostListener, Input } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { El, NumbersLimitMessage } from './directives.interface';
import { Constants } from 'src/app/constants/general.constants';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';

@Directive({
  selector: '[intrNumericLength]'
})
export class NumericLengthDirective {

  private previousValue!: string;

  constructor(
    private notifyService: NotifyService,
    private translateService: TranslateService) { }

  @Input('intrNumericLength') options!: number[];

  @HostListener('keydown', ['$event.target']) onKeydown(element: El): void {
    this.previousValue = element.value;
  }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    const [symbolsBeforeDecPointAllowed, symbolsAfterDecPointAllowed]: number[] = this.options;
    const numeric: string = (+element.value).toFixed(symbolsAfterDecPointAllowed);
    const max: string = this.getMaxPossibleDecimal(symbolsBeforeDecPointAllowed, symbolsAfterDecPointAllowed);
    const maxLength: number = symbolsBeforeDecPointAllowed + symbolsAfterDecPointAllowed;
    if ((+numeric < -max || +numeric > +max) || (+numeric !== +element.value && element.value.length > maxLength)) {
      element.value = this.previousValue;
      this.translateService.get(TranslationsEndpoints.SNACKBAR.NUMBERS_LIMITED)
      .subscribe((msg: NumbersLimitMessage) => {
        this.notifyService.showMessage(Constants.SNACKBAR.MESSAGES.getNumbersLimitMessage(
          msg,
          symbolsBeforeDecPointAllowed,
          symbolsAfterDecPointAllowed),
        Constants.SNACKBAR.ERROR_TYPE);
      });
    }
  }

  private getMaxPossibleDecimal(symbolsBeforeDecPointAllowed: number, symbolsAfterDecPointAllowed: number): string {
    let greatestInteger = '';
    for (let i = 1; i <= symbolsBeforeDecPointAllowed; i++) {
      greatestInteger = greatestInteger + '9';
    }
    let greatestDecimal = greatestInteger + '.';
    for (let i = 1; i <= symbolsAfterDecPointAllowed; i++) {
      greatestDecimal = greatestDecimal + '9';
    }
    return greatestDecimal;
  }
}
