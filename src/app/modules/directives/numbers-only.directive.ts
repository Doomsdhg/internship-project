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

  private previousValue!: string;

  constructor(private notifyService: NotifyService) { }

  @HostListener('keydown', ['$event.target']) onKeydown(element: El): void {
    this.previousValue = element.value;
  }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    const inputValueIsNumeric = !(isNaN(+element.value));
    if (!inputValueIsNumeric) {
      element.value = this.previousValue;
      this.notifyService.showTranslatedMessage(TranslationsEndpoints.SNACKBAR.NUMBERS_ONLY_ERROR, Constants.SNACKBAR.ERROR_TYPE);
    }
  }
}
