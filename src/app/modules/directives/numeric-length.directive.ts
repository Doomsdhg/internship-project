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

  private previousValue!: string;

  constructor(private notify: NotifyService, private translateService: TranslateService) { }

  @Input('appNumericLength') options!: number[];

  @HostListener('keydown', ['$event.target']) onKeydown(element: El): void {
    this.previousValue = element.value
  }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    const numeric = (+element.value).toFixed(this.options[1]);
    const max = this.getMax(this.options[0], this.options[1]);
    const maxLength = this.options[0] + this.options[1];
    if ((+numeric < -max || +numeric > +max) || (+numeric !== +element.value && element.value.length > maxLength)) {
      element.value = this.previousValue
      this.translateService.get(TranslationsEndpoints.SNACKBAR_NUMBERS_LIMITED).subscribe(msg=>{
        this.notify.showMessage( msg.start + this.options[0] + " " + msg.middle + " " + this.options[1] + " " + msg.end , Snackbar.ERROR_TYPE)
      })
    }
  }

  getMax(int: number, dec: number): string {
    let max = '';
    for (let i = 1; i <= int; i++) {
      max = max + '9'
    }
    max = max + '.';
    for (let i = 1; i <= dec; i++) {
      max = max + '9'
    }
    return max
  }

}
