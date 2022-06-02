import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/app/constants/constants';
import { TransactionUpdateData } from 'src/app/interfaces/transactions.interface';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { TransactionsTablePageComponent } from '../../transactions-table-page/transactions-table-page.component';
import {
  getAmountErrors,
  getCommissionAmountErrors,
  getValidationErrors,
  integerLengthValidator,
  isForbiddenLength,
  isForbiddenNan,
  numbersOnlyValidator,
  transformToFixed
} from '../transactions-table/transactions-table.component';
import { TranslationsEndpoints } from './../../../../../constants/translations-endpoints.constants';

class TransactionConstants {

  static readonly TRANSACTION_INITIAL_STATUS = 'INITIAL';
}

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTransactionComponent implements OnInit {

  public transactionForm!: FormGroup;

  public isForbiddenNan = isForbiddenNan;

  public isForbiddenLength = isForbiddenLength;

  public getAmountErrors = getAmountErrors;

  public getCommissionAmountErrors = getCommissionAmountErrors;

  private validationErrors: ValidationErrors[] = [];

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
    this.validationErrors = getValidationErrors(this.transactionForm);
    if (this.validationErrors.length === 0) {
      const updateData = this.formTransactionData();
      this.transactionApiService.uploadTransaction(updateData)
        .subscribe({
          next: () => {
            this.notify.showTranslatedMessage(TranslationsEndpoints.SNACKBAR.TRANSACTION_ADDED, Constants.SNACKBAR.SUCCESS_TYPE);
            this.transactionsDataSource.loadTransactions();
            this.initFormGroup();
            this.matDialogRef.close();
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
        integerLengthValidator(),
        numbersOnlyValidator()
      ]),
      currency: new FormControl(Constants.FORMS.DEFAULT_VALUE),
      commissionAmount: new FormControl(Constants.FORMS.DEFAULT_VALUE, [
        integerLengthValidator(),
        numbersOnlyValidator()
      ]),
      commissionCurrency: new FormControl(Constants.FORMS.DEFAULT_VALUE),
      additionalData: new FormControl(Constants.FORMS.DEFAULT_VALUE)
    });
  }

  private formTransactionData = (): TransactionUpdateData => {
    return {
      status: TransactionConstants.TRANSACTION_INITIAL_STATUS,
      externalId: this.transactionForm.value.externalId,
      provider: this.transactionForm.value.provider,
      amount: {
        amount: transformToFixed(this.transactionForm.value.amount),
        currency: this.transactionForm.value.currency.toUpperCase()
      },
      commissionAmount: {
        amount: transformToFixed(this.transactionForm.value.commissionAmount),
        currency: this.transactionForm.value.commissionCurrency.toUpperCase()
      },
      user: this.transactionForm.value.username,
      additionalData: this.transactionForm.value.additionalData
    };
  }
}
