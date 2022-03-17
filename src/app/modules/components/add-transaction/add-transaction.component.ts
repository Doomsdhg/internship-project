import { Component, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { ElementRef } from '@angular/core';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionCrudResponseError } from '../../../models/interfaces/transaction-crud-response-error.interface';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddTransactionComponent{

  constructor(
    private transactionApiService: TransactionApiService, private notify: NotifyService
   ) {}

  @Input() 
  TransactionsTableComponent!: TransactionsTableComponent;

  @ViewChild('addition_form', {static: false})
  additionForm: ElementRef | undefined;

  status: boolean = false;

  dataSource!: TransactionsDataSource;

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

  toggleForm = (): void => {
    this.additionForm?.nativeElement;
    this.status = !this.status
  }

  addTransaction = (e: MouseEvent): void => {
    e.preventDefault();
    const transactionObj: Object = {
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
    this.transactionApiService.uploadTransaction(transactionObj).subscribe({
      next: ()=>{
        this.notify.showMessage('transaction added successfully', false)
        this.TransactionsTableComponent.dataSource.loadTransactions()},
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.status + '' + error.error, true)
      }
    })
  }
}