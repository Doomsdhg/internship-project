import { Directive, HostListener } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { El } from '../interfaces/browser-event.interface';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';

@Directive({
  selector: '[intrNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private notify: NotifyService) { }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    if (isNaN(+element.value)) {
      element.value = element.value.slice(0, -1);
      this.notify.showTranslatedMessage(TranslationsEndpoints.SNACKBAR_NUMBERS_ONLY_ERROR, Snackbar.ERROR_TYPE);
    }
  }
}
