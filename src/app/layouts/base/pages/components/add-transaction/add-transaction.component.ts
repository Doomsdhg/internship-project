import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/app/constants/constants';
import { TransactionUpdateData } from 'src/app/interfaces/transactions.interface';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { integerLengthValidator } from 'src/app/validators/integer-length.directive';
import { numbersOnlyValidator } from 'src/app/validators/numbers-only.directive';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { TransactionsTablePageComponent } from '../../transactions-table-page/transactions-table-page.component';
import { Validation } from '../transactions-table/transactions-table.constants';
import { TranslationsEndpoints } from './../../../../../constants/translations-endpoints.constants';

class TransactionConstants {

  static readonly TRANSACTION_INITIAL_STATUS = 'INITIAL';
}

@Component({
  selector: 'intr-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTransactionComponent implements OnInit {

  public transactionForm!: FormGroup;

  constructor(
    private transactionsDataSource: TransactionsDataSource,
    private transactionApiService: TransactionApiService,
    private notify: NotifyService,
    private matDialogRef: MatDialogRef<TransactionsTablePageComponent>
  ) { }

  public ngOnInit(): void {
    this.initFormGroup();
  }

  public addTransaction = (): void => {
    console.log(this.transactionForm);
    if (this.transactionForm.valid) {
      this.transactionApiService.uploadTransaction(this.buildTransactionData())
        .subscribe({
          complete: () => {
            this.transactionsDataSource.loadTransactions();
            this.matDialogRef.close();
            this.notify.showTranslatedMessage(TranslationsEndpoints.SNACKBAR.TRANSACTION_ADDED, Constants.SNACKBAR.SUCCESS_TYPE);
          }
        });
    }
  }

  private initFormGroup = (): void => {
    this.transactionForm = new FormGroup({
      provider: new FormControl(Constants.FORMS.DEFAULT_VALUE),
      username: new FormControl(Constants.FORMS.DEFAULT_VALUE),
      externalId: new FormControl(Constants.FORMS.DEFAULT_VALUE),
      amount: new FormControl(Constants.FORMS.DEFAULT_VALUE, [
        integerLengthValidator(Validation.ALLOWED_INTEGERS_LENGTH),
        numbersOnlyValidator()
      ]),
      currency: new FormControl(Constants.FORMS.DEFAULT_VALUE),
      commissionAmount: new FormControl(Constants.FORMS.DEFAULT_VALUE, [
        integerLengthValidator(Validation.ALLOWED_INTEGERS_LENGTH),
        numbersOnlyValidator()
      ]),
      commissionCurrency: new FormControl(Constants.FORMS.DEFAULT_VALUE),
      additionalData: new FormControl(Constants.FORMS.DEFAULT_VALUE)
    });
  }

  private buildTransactionData = (): TransactionUpdateData => {
    return {
      status: TransactionConstants.TRANSACTION_INITIAL_STATUS,
      externalId: this.transactionForm.value.externalId,
      provider: this.transactionForm.value.provider,
      amount: {
        amount: this.transformToFixed(this.transactionForm.value.amount),
        currency: this.transactionForm.value.currency.toUpperCase()
      },
      commissionAmount: {
        amount: this.transformToFixed(this.transactionForm.value.commissionAmount),
        currency: this.transactionForm.value.commissionCurrency.toUpperCase()
      },
      user: this.transactionForm.value.username,
      additionalData: this.transactionForm.value.additionalData
    };
  }

  private transformToFixed(value: string): number {
    return +(+value).toFixed(Validation.ALLOWED_LENGTH_AFTER_POINT);
  }
}
