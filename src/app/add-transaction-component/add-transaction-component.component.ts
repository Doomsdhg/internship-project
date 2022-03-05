import {Component, ViewChild, Input} from '@angular/core';
import {ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransactionsTableComponent} from '../transactions-table/transactions-table.component';
import {WebService} from '../web.service';
import { FormGroup, FormControl } from '@angular/forms';

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

   transactionUpdateForm = new FormGroup({
    provider: new FormControl(''),
    username: new FormControl(''),
    externalId: new FormControl(''),
    amount: new FormControl(''),
    currency: new FormControl(''),
    comissionAmount: new FormControl(''),
    comissionCurrency: new FormControl(''),
    additionalData: new FormControl('')
  });

  @ViewChild('addition_form', {static: false})
  additionForm: ElementRef | undefined;
  status = false;

  toggleForm =  () => {
    this.additionForm?.nativeElement;
    this.status = !this.status
  }

  addTransaction = (e: any) => {
    e.preventDefault();
    const transactionObj = {
      "externalId": this.transactionUpdateForm.value.externalId,
      "provider": this.transactionUpdateForm.value.provider,
      "amount": {
        "amount": this.transactionUpdateForm.value.amount,
        "currency": this.transactionUpdateForm.value.currency
      },
      "comissionAmount": {
        "amount": this.transactionUpdateForm.value.comissionAmount,
        "currency": this.transactionUpdateForm.value.comissionCurrency
      },
      "username": this.transactionUpdateForm.value.username,
      "additionalData": this.transactionUpdateForm.value.additionalData
    }
    this.web.uploadTransaction(transactionObj);
    this.TransactionsTableComponent.refreshTransactions();
  }
}
