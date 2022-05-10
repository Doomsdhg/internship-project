import { Directive, HostListener, Input } from '@angular/core';
import { NotifyService } from '../../services/app.intr.notify.service';
import { El } from '../interfaces/app.intr.browser-event.interface';
import { Constants } from 'src/app/constants/main.constants';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appIntrNumericLength]'
})
export class NumericLengthDirective {

  private previousValue!: string;

  constructor(private notifyService: NotifyService, private translateService: TranslateService) { }

  @Input('appIntrNumericLength') options!: number[];

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
      this.translateService.get(Constants.TRANSLATION_ENDPOINTS.SNACKBAR_NUMBERS_LIMITED).subscribe((msg) => {
        this.notifyService.showMessage(msg.start +
          digitsBeforeDecPoint + ' ' + msg.middle + ' ' +
          digitsAfterDecPoint + ' ' + msg.end, Constants.SNACKBAR.ERROR_TYPE);
      });
    }
  }

  getMaxPossibleDecimal(int: number, dec: number): string {
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
