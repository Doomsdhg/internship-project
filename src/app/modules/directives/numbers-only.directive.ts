import { Directive, HostListener } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { NotifyService } from '../../services/notify.service';
import { El } from './directives.interface';
// This directive allows to type only numeric symbols in input.
@Directive({
  selector: '[intrNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private notifyService: NotifyService) { }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    if (isNaN(+element.value)) {
      element.value = element.value.slice(0, -1);
      this.notifyService.showTranslatedMessage(TranslationsEndpoints.SNACKBAR.NUMBERS_ONLY_ERROR, Constants.SNACKBAR.ERROR_TYPE);
    }
  }
}
