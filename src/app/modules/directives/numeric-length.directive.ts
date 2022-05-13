import { Directive, HostListener, Input } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { El } from './element.interface';
import { Constants } from 'src/app/constants/general.constants';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';

@Directive({
  selector: '[intrNumericLength]'
})
export class NumericLengthDirective {

  private previousValue!: string;

  constructor(private notify: NotifyService, private translateService: TranslateService) { }

  @Input('intrNumericLength') options!: number[];

  @HostListener('keydown', ['$event.target']) onKeydown(element: El): void {
    this.previousValue = element.value;
  }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    const [digitsBeforeDecPoint, digitsAfterDecPoint] = this.options;
    const numeric = (+element.value).toFixed(digitsAfterDecPoint);
    const max = this.getMaxPossibleDecimal(digitsBeforeDecPoint, digitsAfterDecPoint);
    const maxLength = digitsBeforeDecPoint + digitsAfterDecPoint;
    if ((+numeric < -max || +numeric > +max) || (+numeric !== +element.value && element.value.length > maxLength)) {
      element.value = this.previousValue;
      this.translateService.get(TranslationsEndpoints.SNACKBAR_NUMBERS_LIMITED).subscribe((msg) => {
        this.notify.showMessage(msg.start +
          digitsBeforeDecPoint + ' ' + msg.middle + ' ' +
          digitsAfterDecPoint + ' ' + msg.end, Constants.SNACKBAR.ERROR_TYPE);
      });
    }
  }

  private getMaxPossibleDecimal(int: number, dec: number): string {
    let maxInt = '';
    for (let i = 1; i <= int; i++) {
      maxInt = maxInt + '9';
    }
    let maxDec = maxInt + '.';
    for (let i = 1; i <= dec; i++) {
      maxDec = maxDec + '9';
    }
    return maxDec;
  }
}
