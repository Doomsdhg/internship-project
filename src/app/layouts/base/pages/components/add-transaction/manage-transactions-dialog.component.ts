import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from 'src/app/constants/constants';
import { TransactionCreationData, TransactionUpdateData } from 'src/app/interfaces/transactions.interface';
import { TransactionsTableComponent } from 'src/app/layouts/base/pages/components/transactions-table/transactions-table.component';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { maxIntegerLengthValidator } from 'src/app/validators/integer-length.validator';
import { numbersOnlyValidator } from 'src/app/validators/numbers-only.validator';
import { TranslationsEndpoints } from '../../../../../constants/translations-endpoints.constants';
import { Validation } from '../transactions-table/transactions-table.constants';
import { ControlName, Row, TransactionOperation } from '../transactions-table/transactions-table.interfaces';
import { TransactionOperationTypes } from './../transactions-table/transactions-table.constants';

@Component({
  selector: 'intr-manage-transaction',
  templateUrl: './manage-transactions-dialog.component.html',
  styleUrls: ['./manage-transactions-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageTransactionsDialogComponent implements OnInit {

  public readonly TRANSACTION_INITIAL_STATUS = 'INITIAL';

  public transactionForm!: FormGroup;

  public operationType!: TransactionOperation;

  constructor(
    private transactionApiService: TransactionApiService,
    private notifyService: NotifyService,
    private matDialogRef: MatDialogRef<TransactionsTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit(): void {
    this.operationType = this.data.operationType;
    this.initFormGroup(this.data.rowData);
  }

  public uploadTransaction = (): void => {
    this.transactionApiService.uploadTransaction(this.buildCreationData())
      .subscribe({
        next: () => {
          this.handleSuccessfulResponse(TranslationsEndpoints.SNACKBAR.TRANSACTION_ADDED);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.handleError(errorResponse);
        }
      });
  }

  public patchTransaction = (): void => {
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

  public cancelChanges = (): void => {
    this.initFormGroup(this.data.rowData);
  }

  public clearForms(): void {
    this.initFormGroup();
  }

  public getControl(controlName: ControlName): AbstractControl {
    return this.transactionForm.controls[controlName];
  }

  public get isCreateDialog(): boolean {
    return this.operationType === TransactionOperationTypes.CREATE;
  }

  public get isEditDialog(): boolean {
    return this.operationType === TransactionOperationTypes.EDIT;
  }

  public get formIsValid(): boolean {
    return this.transactionForm.valid;
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

  private buildCreationData = (): TransactionCreationData => {
    return {
      externalId: this.transactionForm.value.externalId,
      user: this.transactionForm.value.user,
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
      externalId: this.transactionForm.value.externalId,
      user: this.transactionForm.value.user,
      status: this.transactionForm.value.status,
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

  private handleSuccessfulResponse = (messageTranslationEndpoint: string): void => {
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
