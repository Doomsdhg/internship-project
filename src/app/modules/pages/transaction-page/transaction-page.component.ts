import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { Transaction, TransactionUpdateData } from 'src/app/models/interfaces/transaction.interface';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionCrudResponseError } from 'src/app/models/interfaces/transaction-crud-response-error.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionPageComponent implements OnInit {

  @Input()
  transactionUpdateForm!: FormGroup;

  @Input()
  initialFormValues!: TransactionUpdateData;

  @Input()
  transactionInfo: Transaction =
    {
      id: '',
      externalId: '',
      provider: '',
      amount: {
        amount: 0,
        currency: ''
      },
      comissionAmount: {
        amount: 0,
        currency: ''
      },
      username: '',
      additionalData: ''
    };

  private id!: string | null;

  public leavePage = false;

  public formsToggled = false;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private transactionApiService: TransactionApiService,
    private cdr: ChangeDetectorRef,
    private notify: NotifyService) { }

  ngOnInit(): void {
    this.getTransactionInfo()
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
    })

  }

  toggleForms = (): void => {
    this.formsToggled = !this.formsToggled;
  }

  saveChanges = (): void => {
    if (this.getFormValidationErrors()) {
      this.updateTransaction()
      this.toggleForms
    }
  }

  getFormValidationErrors(): boolean {
    let noErrors = true;
    Object.keys(this.transactionUpdateForm.controls).forEach(key => {
      const controlErrors = this.transactionUpdateForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.notify.showMessage('Error: ' + key + ' ' + keyError, 'error');
          noErrors = false;
        });
      }
    });
    return noErrors;
  }

  cancelChanges = (): void => {
    this.toggleForms()
    this.createFormGroup()
  }

  getTransactionInfo(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.transactionApiService.getDefiniteTransaction(this.id).subscribe((success: Transaction) => {
      this.transactionInfo = success;
      this.createFormGroup()
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
      }
      this.cdr.detectChanges()
    })
  }

  checkIfInputsChanged = (): boolean => {
    return !this.transactionUpdateForm.dirty
  }

  updateTransaction = (): void => {
    const updateObj: TransactionUpdateData = {
      "externalId": this.transactionUpdateForm.value.externalId,
      "username": this.transactionUpdateForm.value.username,
      "amount": {
        "amount": this.transactionUpdateForm.value.amount,
        "currency": this.transactionUpdateForm.value.currency
      },
      "comissionAmount": {
        "amount": this.transactionUpdateForm.value.comissionAmount,
        "currency": this.transactionUpdateForm.value.comissionCurrency
      },
      "provider": this.transactionUpdateForm.value.provider,
      "additionalData": this.transactionUpdateForm.value.additionalData
    }
    this.transactionApiService.patchTransaction(this.transactionInfo.id, updateObj).subscribe({
      next: () => {
        this.toggleForms()
        this.getTransactionInfo()
        this.notify.showMessage('transaction data updated succesfully', 'success')
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, 'error')
      }
    })
  }

}
