import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { Transaction, TransactionUpdateData } from 'src/app/modules/interfaces/transaction.interface';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionCrudResponseError } from 'src/app/modules/interfaces/transaction-crud-response-error.interface';

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
      amount: new FormControl(this.transactionInfo.amount!.amount),
      currency: new FormControl(this.transactionInfo.amount!.currency),
      comissionAmount: new FormControl(this.transactionInfo.comissionAmount!.amount),
      comissionCurrency: new FormControl(this.transactionInfo.comissionAmount!.currency),
      additionalData: new FormControl(this.transactionInfo.additionalData)
    })

  }

  toggleForms = (): void => {
    this.formsToggled = !this.formsToggled;
  }

  saveChanges = (): void => {
    if (!this.getFormValidationErrors()) {
      this.updateTransaction()
      this.toggleForms
    } else {
      this.notify.showMessage('There is 1 or more mistakes about your inputs values.', 'error')
    }
  }

  getFormValidationErrors(): boolean {
    const errors = Object.keys(this.transactionUpdateForm.controls).some(key => {
      return this.transactionUpdateForm.controls[key]!.errors
    })
    return errors;
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
        externalId: success.externalId || 'no id',
        username: success.username || 'no username',
        amount: {
          amount: success.amount.amount || 0,
          currency: success.amount.currency || 'no currency'
        },
        comissionAmount: {
          amount: success.comissionAmount.amount || 0,
          currency: success.comissionAmount.currency || 'no currency'
        },
        provider: success.provider || 'no provider',
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
        "currency": this.transactionUpdateForm.value.currency.toUpperCase()
      },
      "comissionAmount": {
        "amount": this.transactionUpdateForm.value.comissionAmount,
        "currency": this.transactionUpdateForm.value.comissionCurrency.toUpperCase()
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
