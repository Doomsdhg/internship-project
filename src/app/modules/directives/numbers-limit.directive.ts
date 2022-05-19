import { Directive, HostListener, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/constants/constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { NotifyService } from '../../services/notify.service';
import { El, NumbersLimitMessage } from './directives.interface';

// This directive limits the size of number you can type in input.
// It receives an array containing 2 numbers:
// first is a maximal allowed number of numeric symbols before decimal point
// second is a maximal allowed number of numeric symbols after decimal point.

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
    const originalInput: string = element.value;
    const fixedInputValue: string = (+originalInput).toFixed(symbolsAfterDecPointAllowed);
    const maxPossibleDecimal: number = +this.getMaxPossibleDecimal(symbolsBeforeDecPointAllowed, symbolsAfterDecPointAllowed);
    const leastPossibleDecimal: number = -this.getMaxPossibleDecimal(symbolsBeforeDecPointAllowed, symbolsAfterDecPointAllowed);
    const maxLength: number = symbolsBeforeDecPointAllowed + symbolsAfterDecPointAllowed;
    const lessThanMinimumPossibleNumber = +fixedInputValue < leastPossibleDecimal;
    const greaterThanMaximumPossibleNumber = +fixedInputValue > maxPossibleDecimal;
    const fixedValueDifferentFromOriginal = fixedInputValue !== originalInput && originalInput.length > maxLength;
    if (( greaterThanMaximumPossibleNumber || lessThanMinimumPossibleNumber)
      || (fixedValueDifferentFromOriginal)) {
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
