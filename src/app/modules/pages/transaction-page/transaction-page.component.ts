import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { Transaction, TransactionUpdateData, TransactionCrudResponseError } from 'src/app/modules/interfaces/transactions.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifyService } from 'src/app/services/notify.service';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['transaction-page.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionPageComponent implements OnInit {

  @Input()
  transactionUpdateForm!: FormGroup;

  @Input()
  initialFormValues!: TransactionUpdateData;

  @Input()
  transactionInfo!: Transaction;

  public formsToggled = false;

  constructor(
    private route: ActivatedRoute,
    private transactionApiService: TransactionApiService,
    private cdr: ChangeDetectorRef,
    private notify: NotifyService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.getTransactionInfo();
  }

  createFormGroup(): void {
    this.transactionUpdateForm = new FormGroup({
      provider: new FormControl(this.transactionInfo.provider),
      username: new FormControl(this.transactionInfo.username),
      externalId: new FormControl(this.transactionInfo.externalId),
      amount: new FormControl(this.transactionInfo.amount.amount),
      currency: new FormControl(this.transactionInfo.amount.currency),
      comissionAmount: new FormControl(this.transactionInfo.comissionAmount.amount),
      comissionCurrency: new FormControl(this.transactionInfo.comissionAmount.currency),
      additionalData: new FormControl(this.transactionInfo.additionalData)
    });
  }

  toggleForms = (): void => {
    this.formsToggled = !this.formsToggled;
  };

  saveChanges = (): void => {
    if (!this.getFormValidationErrors()) {
      this.updateTransaction();
      this.toggleForms;
    } else {
      this.translateService.get(TranslationsEndpoints.SNACKBAR_INPUT_ISSUES).subscribe((msg) => {
        this.notify.showMessage(msg, Snackbar.ERROR_TYPE);
      });
    }
  };

  getFormValidationErrors(): boolean {
    const errors = Object.keys(this.transactionUpdateForm.controls).some((key) => {
      return this.transactionUpdateForm.controls[key].errors;
    });
    return errors;
  }

  cancelChanges = (): void => {
    this.toggleForms();
    this.createFormGroup();
  };

  getTransactionInfo(): void {
    const transactionId = this.route.snapshot.paramMap.get('id');
    this.transactionApiService.getDefiniteTransaction(transactionId).subscribe((success: Transaction) => {
      this.transactionInfo = success;
      this.createFormGroup();
      this.initialFormValues = {
        externalId: success.externalId,
        username: success.username,
        amount: {
          amount: success.amount.amount,
          currency: success.amount.currency
        },
        comissionAmount: {
          amount: success.comissionAmount.amount,
          currency: success.comissionAmount.currency
        },
        provider: success.provider,
        additionalData: success.additionalData
      };
      this.cdr.detectChanges();
    });
  }

  checkIfInputsChanged = (): boolean => {
    return !this.transactionUpdateForm.dirty;
  };

  updateTransaction = (): void => {
    const updateObj: TransactionUpdateData = {
      "externalId": this.transactionUpdateForm.value.externalId,
      "username": this.transactionUpdateForm.value.username,
      "amount": {
        "amount": this.transactionUpdateForm.value.amount,
        "currency": this.transactionUpdateForm.value.currency.toUpperCase()
      },
      "comissionAmount": {
        "amount": this.transactionUpdateForm.value.comissionAmount,
        "currency": this.transactionUpdateForm.value.comissionCurrency.toUpperCase()
      },
      "provider": this.transactionUpdateForm.value.provider,
      "additionalData": this.transactionUpdateForm.value.additionalData
    };
    this.transactionApiService.patchTransaction(this.transactionInfo.id, updateObj).subscribe({
      next: () => {
        this.toggleForms();
        this.getTransactionInfo();
        this.translateService.get(TranslationsEndpoints.SNACKBAR_TRANSACTION_UPDATED).subscribe((msg) => {
          this.notify.showMessage(msg, Snackbar.SUCCESS_TYPE);
        });
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Snackbar.ERROR_TYPE);
      }
    });
  };

}
