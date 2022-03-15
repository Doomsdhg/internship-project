import { Component, ViewChild, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ElementRef, EventEmitter } from '@angular/core';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { WebPostService } from '../../services/web-services/web-post.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionsDataSource } from '../../services/transactions-data-source.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddTransactionComponent{

  constructor(
    private webPost: WebPostService
   ) {}

  @Output() refreshTransactions: EventEmitter<any> = new EventEmitter();

  @Input() TransactionsTableComponent!: TransactionsTableComponent;

  @ViewChild('addition_form', {static: false})

  additionForm: ElementRef | undefined;

  status: boolean = false;

  dataSource!: TransactionsDataSource;

  transactionUpdateForm: FormGroup = new FormGroup({
    provider: new FormControl(''),
    username: new FormControl(''),
    externalId: new FormControl(''),
    amount: new FormControl(''),
    currency: new FormControl(''),
    comissionAmount: new FormControl(''),
    comissionCurrency: new FormControl(''),
    additionalData: new FormControl('')
  });


  toggleForm = (): void => {
    this.additionForm?.nativeElement;
    this.status = !this.status
  }

  addTransaction = (e: MouseEvent): void => {
    e.preventDefault();
    const transactionObj: Object = {
      "externalId": this.transactionUpdateForm.value.externalId,
      "provider": this.transactionUpdateForm.value.provider,
      "amount": {
        "amount": this.transactionUpdateForm.value.amount,
        "currency": this.transactionUpdateForm.value.currency
      },
      "comissionAmount": {
        "amount": this.transactionUpdateForm.value.comissionAmount,
        "currency": this.transactionUpdateForm.value.comissionCurrency
      },
      "username": this.transactionUpdateForm.value.username,
      "additionalData": this.transactionUpdateForm.value.additionalData
    }
    this.webPost.uploadTransaction(transactionObj).subscribe({
      next: ()=>
      this.TransactionsTableComponent.dataSource.loadTransactions(),
      error: (error: Object) => {
        console.log(error)
      }
    })
  }
}
