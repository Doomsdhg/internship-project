import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionCrudResponseError } from '../../../modules/interfaces/transaction-crud-response-error.interface';
import { TransactionUpdateData } from 'src/app/modules/interfaces/transaction.interface';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddTransactionComponent implements OnInit {

  constructor(
    private transactionApiService: TransactionApiService, private notify: NotifyService, private cdr: ChangeDetectorRef
  ) { }

  @Input()
  TransactionsTableComponent!: TransactionsTableComponent;

  @Input()
  displayForms = false;

  @Input()
  transactionForm!: FormGroup;

  dataSource!: TransactionsDataSource;
  
  ngOnInit(): void {
    this.initFormGroup()
  }

  initFormGroup = (): void => {
    this.transactionForm = new FormGroup({
      provider: new FormControl(''),
      username: new FormControl(''),
      externalId: new FormControl(''),
      amount: new FormControl(''),
      currency: new FormControl(''),
      comissionAmount: new FormControl(''),
      comissionCurrency: new FormControl(''),
      additionalData: new FormControl('')
    })
  }

  toggleForm = (): void => {
    this.displayForms = !this.displayForms
  }

  addTransaction = (): void => {
    console.log(this.transactionForm)
    if (this.transactionForm.status === 'VALID') {
      const transactionObj: TransactionUpdateData = {
        "externalId": this.transactionForm.value.externalId,
        "provider": this.transactionForm.value.provider,
        "amount": {
          "amount": this.transactionForm.value.amount,
          "currency": this.transactionForm.value.currency.toUpperCase()
        },
        "comissionAmount": {
          "amount": this.transactionForm.value.comissionAmount,
          "currency": this.transactionForm.value.comissionCurrency.toUpperCase()
        },
        "username": this.transactionForm.value.username,
        "additionalData": this.transactionForm.value.additionalData
      }
      this.transactionApiService.uploadTransaction(transactionObj).subscribe({
        next: () => {
          this.notify.showMessage('transaction added successfully', 'success')
          this.TransactionsTableComponent.dataSource.loadTransactions()
          this.initFormGroup()
          this.cdr.markForCheck()
        },
        error: (error: TransactionCrudResponseError) => {
          this.notify.showMessage('server error:' + error.status + '' + error.error, 'error')
        }
      })
    } else {
      this.notify.showMessage('There is one or more mistake about your inputs values', 'error')
    }
  }
}
