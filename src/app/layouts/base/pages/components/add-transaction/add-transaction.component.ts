import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/app/constants/constants';
import { CreateTransactionData, TransactionCrudResponseError, TransactionUpdateData } from 'src/app/interfaces/transactions.interface';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { maxIntegerLengthValidator } from 'src/app/validators/integer-length.validator';
import { numbersOnlyValidator } from 'src/app/validators/numbers-only.validator';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { TransactionsTablePageComponent } from '../../transactions-table-page/transactions-table-page.component';
import { Validation } from '../transactions-table/transactions-table.constants';
import { TranslationsEndpoints } from './../../../../../constants/translations-endpoints.constants';
import { ControlName, Row } from './../transactions-table/transactions-table.interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'intr-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTransactionComponent implements OnInit {

  public readonly TRANSACTION_INITIAL_STATUS = 'INITIAL';

  public transactionForm!: FormGroup;

  constructor(
    private transactionsDataSource: TransactionsDataSource,
    private transactionApiService: TransactionApiService,
    private notifyService: NotifyService,
    private matDialogRef: MatDialogRef<TransactionsTablePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public ngOnInit(): void {
    this.initFormGroup(this.data.rowData);
  }

  public uploadTransaction = (): void => {
    if (this.transactionForm.valid) {
      this.transactionApiService.uploadTransaction(this.buildTransactionData())
        .subscribe({
          next: () => {
            this.handleSuccessfulResponse(TranslationsEndpoints.SNACKBAR.TRANSACTION_ADDED);
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.handleError(errorResponse);
          }
        });
    }
  }

  public updateTransaction = (): void => {
    if (this.transactionForm.valid) {
      this.transactionApiService.patchTransaction(this.buildUpdateData()).subscribe({
        next: () => {
          this.handleSuccessfulResponse(TranslationsEndpoints.SNACKBAR.TRANSACTION_UPDATED);
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      });
    }
  }

  public getControl(controlName: ControlName): AbstractControl {
    return this.transactionForm.controls[controlName];
  }

  public get isAddDialog(): boolean {
    return this.data.type === 'addTransaction';
  }

  public get isEditDialog(): boolean {
    return this.data.type === 'editTransaction';
  }

  private initFormGroup = (row?: Row): void => {
    this.transactionForm = new FormGroup({
      provider: new FormControl(row?.provider || Constants.FORMS.DEFAULT_VALUE),
      user: new FormControl(row?.user || Constants.FORMS.DEFAULT_VALUE),
      externalId: new FormControl(row?.externalId || Constants.FORMS.DEFAULT_VALUE),
      amount: new FormControl(row?.amount.amount || Constants.FORMS.DEFAULT_VALUE, [
        maxIntegerLengthValidator(Validation.ALLOWED_INTEGERS_LENGTH),
        numbersOnlyValidator()
      ]),
      currency: new FormControl(row?.amount.currency || Constants.FORMS.DEFAULT_VALUE),
      commissionAmount: new FormControl(row?.commissionAmount.amount || Constants.FORMS.DEFAULT_VALUE, [
        maxIntegerLengthValidator(Validation.ALLOWED_INTEGERS_LENGTH),
        numbersOnlyValidator()
      ]),
      commissionCurrency: new FormControl(row?.commissionAmount.currency || Constants.FORMS.DEFAULT_VALUE),
      additionalData: new FormControl(row?.additionalData || Constants.FORMS.DEFAULT_VALUE)
    });
  }

  private buildTransactionData = (): CreateTransactionData => {
    return {
      externalId: this.transactionForm.value.externalId,
      user: this.transactionForm.value.username,
      status: this.TRANSACTION_INITIAL_STATUS,
      amount: {
        amount: this.transformToFixed(this.transactionForm.value.amount),
        currency: this.transactionForm.value.currency.toUpperCase()
      },
      commissionAmount: {
        amount: this.transformToFixed(this.transactionForm.value.commissionAmount),
        currency: this.transactionForm.value.commissionCurrency.toUpperCase()
      },
      provider: this.transactionForm.value.provider,
      additionalData: this.transactionForm.value.additionalData
    };
  }

  private buildUpdateData(): TransactionUpdateData {
    return {
      id: this.data.rowData.id,
      externalId: this.transactionForm.get('externalId')?.value,
      user: this.transactionForm.get('user')?.value,
      status: this.transactionForm.get('status')?.value,
      amount: {
        amount: this.transformToFixed(this.transactionForm.get('amount')?.value),
        currency: this.transactionForm.get('currency')?.value.toUpperCase()
      },
      commissionAmount: {
        amount: this.transformToFixed(this.transactionForm.get('commissionAmount')?.value),
        currency: this.transactionForm.get('commissionCurrency')?.value.toUpperCase()
      },
      provider: this.transactionForm.get('provider')?.value,
      additionalData: this.transactionForm.get('additionalData')?.value
    };
  }

  private handleSuccessfulResponse = (messageTranslationEndpoint: string): void => {
    this.transactionsDataSource.loadTransactions();
    this.notifyService.showTranslatedMessage(messageTranslationEndpoint, Constants.SNACKBAR.SUCCESS_TYPE);
    this.matDialogRef.close();
  }

  private handleError(error: HttpErrorResponse): void {
    this.notifyService.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
  }

  private transformToFixed(value: string): number {
    return +(+value).toFixed(Validation.ALLOWED_LENGTH_AFTER_POINT);
  }
}
