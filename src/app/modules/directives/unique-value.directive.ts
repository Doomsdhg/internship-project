import { Directive, HostListener, ElementRef } from '@angular/core';
import { El } from '../../models/interfaces/browser-event.interface';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { Transaction } from 'src/app/models/interfaces/transaction.interface';

@Directive({
  selector: '[appUniqueValue]'
})
export class UniqueValueDirective {

  constructor(private el : ElementRef, private transactionService: TransactionApiService) { }

  @HostListener('input', ['$event.target']) OnInput(element: El) {
    this.transactionService.searchTransactions('externalId', element.value).subscribe({
      next: (success: Transaction[])=>{
        let message;
        let color;
        if (success.length === 0) {
          message = 'value is unique';
          color = 'green';
        } else {
          message = 'value is not unique'
          color = 'red';
        }
        const indexOfSpan = this.el.nativeElement.innerHTML.toString().indexOf('<span style')
        if (indexOfSpan !== -1) {
          const span = this.el.nativeElement.firstChild
          this.el.nativeElement.removeChild(span)
        }
        this.el.nativeElement.insertAdjacentHTML("afterbegin", `<span style='color: ${color}'>${message}</span>`)
      }
    })
  }

}
