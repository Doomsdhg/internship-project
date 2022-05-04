import { Directive, HostListener, Input } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { El } from '../../modules/interfaces/browser-event.interface';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';

@Directive({
  selector: '[appNumericLength]'
})
export class NumericLengthDirective {

  public previousValue!: string;

  constructor(private notify: NotifyService, private translateService: TranslateService) { }

  @Input('appNumericLength') options!: number[];

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
        this.notify.showMessage(msg.start + digitsBeforeDecPoint + " " + msg.middle + " " + digitsAfterDecPoint + " " + msg.end, Snackbar.ERROR_TYPE);
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
