import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionCrudResponseError, TransactionUpdateData } from 'src/app/modules/interfaces/transactions.interface';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddTransactionComponent implements OnInit {

  constructor(
    private transactionApiService: TransactionApiService, 
    private notify: NotifyService, 
    private translateService: TranslateService
  ) { }

  @Input()
  TransactionsTableComponent!: TransactionsTableComponent;

  @Input()
  displayForms = false;

  @Input()
  transactionForm!: FormGroup;

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup = (): void => {
    this.transactionForm = new FormGroup({
      provider: new FormControl(),
      user: new FormControl(),
      externalId: new FormControl(),
      status: new FormControl(),
      amount: new FormControl(),
      currency: new FormControl(),
      commissionAmount: new FormControl(),
      comissionCurrency: new FormControl(),
      additionalData: new FormControl()
    });
  };

  toggleForm = (): void => {
    this.displayForms = !this.displayForms;
  };

  addTransaction = (): void => {
    if (this.transactionForm.status === 'VALID') {
      const transactionObj: TransactionUpdateData = {
        "externalId": this.transactionForm.value.externalId,
        "provider": this.transactionForm.value.provider,
        "status": this.transactionForm.value.status,
        "amount": {
          "amount": Number(this.transactionForm.value.amount),
          "currency": this.transactionForm.value.currency.toUpperCase()
        },
        "commissionAmount": {
          "amount": Number(this.transactionForm.value.commissionAmount),
          "currency": this.transactionForm.value.comissionCurrency.toUpperCase()
        },
        "user": this.transactionForm.value.user,
        "additionalData": this.transactionForm.value.additionalData
      };
      this.transactionApiService.uploadTransaction(transactionObj).subscribe({
        next: () => {
          this.translateService.get(TranslationsEndpoints.SNACKBAR_TRANSACTION_ADDED).subscribe((msg) => {
            this.notify.showMessage(msg, Snackbar.SUCCESS_TYPE);
          });
          this.TransactionsTableComponent.dataSource.loadTransactions();
          this.initFormGroup();
        },
        error: (error: TransactionCrudResponseError) => {
          this.translateService.get;
          this.translateService.get(TranslationsEndpoints.SNACKBAR_SERVER_ERROR).subscribe((msg) => {
            this.notify.showMessage(msg + error.status + error.error, Snackbar.ERROR_TYPE);
          });
        }
      });
    } else {
      this.translateService.get(TranslationsEndpoints.SNACKBAR_INPUT_ISSUES).subscribe((msg) => {
        this.notify.showMessage(msg, Snackbar.ERROR_TYPE);
      });
    }
  };
}
