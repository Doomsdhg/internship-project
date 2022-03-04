import {Component, ViewChild, Input} from '@angular/core';
import {ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransactionsTableComponent} from '../transactions-table/transactions-table.component';
import {WebService} from '../web.service';


@Component({
  selector: 'app-add-transaction-component',
  templateUrl: './add-transaction-component.component.html',
  styleUrls: ['./add-transaction-component.component.scss']
})
export class AddTransactionComponentComponent{
  @Input() TransactionsTableComponent!: TransactionsTableComponent;
  constructor(
    private http: HttpClient, private web: WebService
   ) {
     }

  @ViewChild('addition_form', {static: false})
  additionForm: ElementRef | undefined;
  @ViewChild('externalId', {static: false})
  externalId: ElementRef | undefined;
  @ViewChild('provider', {static: false})
  provider: ElementRef | undefined;
  @ViewChild('amount', {static: false})
  amount: ElementRef | undefined;
  @ViewChild('currency', {static: false})
  currency: ElementRef | undefined;
  @ViewChild('comissionAmount', {static: false})
  comissionAmount: ElementRef | undefined;
  @ViewChild('comissionCurrency', {static: false})
  comissionCurrency: ElementRef | undefined;
  @ViewChild('username', {static: false})
  username: ElementRef | undefined;
  @ViewChild('additionalData', {static: false})
  additionalData: ElementRef | undefined;
  status = false;

  toggleForm =  () => {
    this.additionForm?.nativeElement;
    this.status = !this.status
  }

  addTransaction = (e: any) => {
    e.preventDefault();
    const transactionObj = {
      "externalId": this.externalId!.nativeElement.value,
      "provider": this.provider!.nativeElement.value,
      "amount": {
        "amount": this.amount!.nativeElement.value,
        "currency": this.currency!.nativeElement.value
      },
      "comissionAmount": {
        "amount": this.comissionAmount!.nativeElement.value,
        "currency": this.comissionCurrency!.nativeElement.value
      },
      "username": this.username!.nativeElement.value,
      "additionalData": this.additionalData!.nativeElement.value
    }
    this.web.uploadTransaction(transactionObj);
    this.TransactionsTableComponent.refreshTransactions();
  }
}
