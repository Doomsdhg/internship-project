import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionUpdateData } from 'src/app/interfaces/transactions.interface';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { TransactionsTablePageComponent } from '../../transactions-table-page/transactions-table-page.component';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddTransactionComponent implements OnInit {

  transactionForm!: FormGroup;

  dataSource!: TransactionsDataSource;

  constructor(
    private transactionsDataSource: TransactionsDataSource,
    private transactionApiService: TransactionApiService,
    private notify: NotifyService,
    private cdr: ChangeDetectorRef,
    private matDialogRef: MatDialogRef<TransactionsTablePageComponent>
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
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
    });
  }

  addTransaction = (): void => {
    if (this.transactionForm.status === 'VALID') {
      const updateData: TransactionUpdateData = {
        'id': this.transactionForm.value.id,
        'status': this.transactionForm.value.status,
        'externalId': this.transactionForm.value.externalId,
        'provider': this.transactionForm.value.provider,
        'amount': {
          'amount': this.transactionForm.value.amount,
          'currency': this.transactionForm.value.currency.toUpperCase()
        },
        'commissionAmount': {
          'amount': this.transactionForm.value.comissionAmount,
          'currency': this.transactionForm.value.comissionCurrency.toUpperCase()
        },
        'user': this.transactionForm.value.username,
        'additionalData': this.transactionForm.value.additionalData
      };
      this.transactionApiService.uploadTransaction(updateData)
        .subscribe({
          next: () => {
            this.notify.showMessage('transaction added successfully', 'success');
            this.transactionsDataSource.loadTransactions();
            this.initFormGroup();
            this.cdr.markForCheck();
            this.matDialogRef.close();
          }
        });
    } else {
      this.notify.showMessage('There is one or more mistake about your inputs values', 'error');
    }
  }
}
