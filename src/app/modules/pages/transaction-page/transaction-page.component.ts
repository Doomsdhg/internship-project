import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionApiService } from 'src/app/services/web-services/transaction-api.service';
import { transactionInterface } from 'src/app/models/interfaces/transaction.interface';
import { Transaction } from 'src/app/models/transactionInfo.model';
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
  initialFormValues!: any;

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

  public leavePage: boolean = false;

  public formsToggled: boolean = false;

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

  // uniqueIdValidator(id: any): AsyncValidatorFn {
  //   return async (control: AbstractControl): Promise<ValidationErrors | null> => {
  //     let unique = true;
  //     const request = this.transactionApiService.getTransactions();
  //     const response = await lastValueFrom(request)
  //     response.map((transaction: transactionInterface)=>{
  //       if (transaction.externalId === id) {
  //         unique = false;
  //       }
  //     })
  //     return unique ?  null : {unique: {value: control.value}};
  //   };
  // }

  toggleForms = (): void => {
    this.formsToggled = !this.formsToggled;
  }

  compareFormValues = (): boolean => {
    let inputsChanged = false;
    for (let key in this.transactionUpdateForm.controls) {
      if (this.transactionUpdateForm.controls[key]!.value !== this.initialFormValues[key]) { 
        inputsChanged = true
      }
    }
    return inputsChanged
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
      this.createFormGroup()
      this.initialFormValues = {
        externalId: success.externalId,
        username: success.username,
        amount: success.amount.amount,
        currency: success.amount.currency,
        comissionAmount: success.comissionAmount.amount,
        comissionCurrency: success.comissionAmount.currency,
        provider: success.provider,
        additionalData: success.additionalData
      } 
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
