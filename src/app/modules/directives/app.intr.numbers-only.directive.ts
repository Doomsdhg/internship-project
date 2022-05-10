import { Directive, HostListener } from '@angular/core';
import { NotifyService } from '../../services/app.intr.notify.service';
import { El } from '../interfaces/app.intr.browser-event.interface';
import { Constants } from 'src/app/constants/main.constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';

@Directive({
  selector: '[appIntrNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private notifyService: NotifyService) { }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    if (isNaN(+element.value)) {
      element.value = element.value.slice(0, -1);
      this.notifyService.showTranslatedMessage(TranslationsEndpoints.SNACKBAR_NUMBERS_ONLY_ERROR, Constants.SNACKBAR.ERROR_TYPE);
    }
  }

}
