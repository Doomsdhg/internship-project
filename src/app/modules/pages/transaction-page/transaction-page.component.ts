import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { transactionInterface } from 'src/app/models/interfaces/transaction.interface';
import { Transaction } from 'src/app/models/transactionInfo.model';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionCrudResponseError } from 'src/app/models/interfaces/transaction-crud-response-error.interface';
import { Validators } from '@angular/forms';

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
  transactionInfo: transactionInterface = 
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

  public formsToggled: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private transactionApiService: TransactionApiService, 
    private cdr: ChangeDetectorRef, 
    private notify: NotifyService) { }

  ngOnInit(): void {
    this.getTransactionInfo()
    this.createFormGroup()
    
  }

  createFormGroup(): void {
    this.transactionUpdateForm = new FormGroup({
      provider: new FormControl(this.transactionInfo.provider, Validators.required),
      username: new FormControl(this.transactionInfo.username, Validators.required),
      externalId: new FormControl(this.transactionInfo.externalId, [Validators.pattern(/^\d+$/), Validators.required]),
      amount: new FormControl(this.transactionInfo.amount.amount, [Validators.pattern(/^\d+$/), Validators.required]),
      currency: new FormControl(this.transactionInfo.amount.currency, Validators.required),
      comissionAmount: new FormControl(this.transactionInfo.comissionAmount.amount, Validators.pattern(/^\d+$/)),
      comissionCurrency: new FormControl(this.transactionInfo.comissionAmount.currency, Validators.required),
      additionalData: new FormControl(this.transactionInfo.additionalData)
    })
  }

  toggleForms = (): void => {
    this.formsToggled = !this.formsToggled;
  }

  saveChanges = (): void => {
    if (this.getFormValidationErrors()) {
      console.log(this.transactionUpdateForm.controls['provider'].errors)
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
         this.notify.showMessage('Error: ' + key + ' ' + keyError, true);
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

  getTransactionInfo(): void{
    this.id = this.route.snapshot.paramMap.get('id')
    this.transactionApiService.getDefiniteTransaction(this.id).subscribe((success: transactionInterface)=>{
      this.transactionInfo = new Transaction(success);
      this.cdr.detectChanges()
    })
  }

  updateTransaction = (): void => {
    const updateObj: Object = {
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
      next: ()=>{
        this.toggleForms()
        this.getTransactionInfo()
        this.notify.showMessage('transaction data updated succesfully', false)
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, true)
      }
    })
  }

}
