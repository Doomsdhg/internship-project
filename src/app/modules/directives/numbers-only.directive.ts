import { Directive, HostListener } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { El } from '../../modules/interfaces/browser-event.interface';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private notify: NotifyService, private translateService: TranslateService) { }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    if (isNaN(+element.value)) {
      element.value = element.value.slice(0, -1)
      this.translateService.get(TranslationsEndpoints.SNACKBAR_NUMBERS_ONLY_ERROR).subscribe(msg=>{
        this.notify.showMessage(msg, Snackbar.ERROR_TYPE)
      })
      
    }
  }

}
