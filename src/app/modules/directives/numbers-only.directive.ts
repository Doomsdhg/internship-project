import { Directive, HostListener } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { El } from '../interfaces/browser-event.interface';
import { Constants } from 'src/app/constants/main.constants';

@Directive({
  selector: '[intrNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private notify: NotifyService) { }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    if (isNaN(+element.value)) {
      element.value = element.value.slice(0, -1);
      this.notify.showTranslatedMessage(Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_NUMBERS_ONLY_ERROR, Constants.SNACKBAR.ERROR_TYPE);
    }
  }
}
