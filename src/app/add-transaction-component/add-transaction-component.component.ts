import {Component, ViewChild, Input, Output} from '@angular/core';
import {ElementRef, EventEmitter} from '@angular/core';
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
  @Output() refreshTransactions: EventEmitter<any> = new EventEmitter();
  @Input() TransactionsTableComponent!: TransactionsTableComponent;
  constructor(
    private http: HttpClient, private web: WebService
   ) {
     }

   transactionUpdateForm: FormGroup = new FormGroup({
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
  status: boolean = false;

  toggleForm = (): void => {
    this.additionForm?.nativeElement;
    this.status = !this.status
  }

  addTransaction = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    const transactionObj:Object = {
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
    this.refreshTransactions.emit();
  }
}
