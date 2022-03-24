import { Directive, HostListener, ElementRef } from '@angular/core';
import { El } from '../../modules/interfaces/browser-event.interface';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { Transaction } from 'src/app/modules/interfaces/transaction.interface';

@Directive({
  selector: '[appUniqueValue]'
})
export class UniqueValueDirective {

  constructor(private el: ElementRef, private transactionService: TransactionApiService) { }

  @HostListener('input', ['$event.target']) OnInput(element: El) {
    this.transactionService.searchTransactions('externalId', element.value).subscribe({
      next: (success: Transaction[]) => {
        const message = success.length === 0 ? 'value is unique' : 'value is not unique';
        const color = success.length === 0 ? 'green' : 'red';
        const includesSpan = this.el.nativeElement.innerHTML.includes('<span style')
        if (includesSpan) {
          const span = this.el.nativeElement.firstChild
          this.el.nativeElement.removeChild(span)
        }
        this.el.nativeElement.insertAdjacentHTML("afterbegin", `<span style='color: ${color}'>${message}</span>`)
      }
    })
  }

}
