import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { El } from '../../modules/interfaces/browser-event.interface';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { Transaction } from 'src/app/modules/interfaces/transactions.interface';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { Styles } from 'src/app/constants/styles.constants';

@Directive({
  selector: '[appUniqueValue]'
})
export class UniqueValueDirective {

  @Input('appUniqueValue') key!: string;

  constructor(private el: ElementRef, private transactionService: TransactionApiService, private translateService: TranslateService) { }

  @HostListener('input', ['$event.target']) OnInput(element: El): void {
    this.transactionService.searchTransactions(this.key, element.value).subscribe({
      next: (success: Transaction[]) => {
        this.translateService.get(TranslationsEndpoints.SNACKBAR_UNIQUE).subscribe(messages=>{
          const message = success.length === 0 ? messages.unique : messages.notUnique;
          const color = success.length === 0 ? Styles.SUCCESS : Styles.ERROR;
          const includesSpan = this.el.nativeElement.innerHTML.includes('<span style')
          if (includesSpan) {
            const span = this.el.nativeElement.firstChild
            this.el.nativeElement.removeChild(span)
          }
          this.el.nativeElement.insertAdjacentHTML("afterbegin", `<span style='color: ${color}'>${message}</span>`)
        })
        
      }
    })
  }

}
