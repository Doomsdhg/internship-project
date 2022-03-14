import {Component, ViewChild, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {ElementRef, EventEmitter} from '@angular/core';
import {TransactionsTableComponent} from '../transactions-table/transactions-table.component';
import {WebService} from '../web.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TransactionsDataSource } from '../transactions-data-source.service';

@Component({
  selector: 'app-add-transaction-component',
  templateUrl: './add-transaction-component.component.html',
  styleUrls: ['./add-transaction-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddTransactionComponentComponent{

  constructor(
    private web: WebService
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
    this.web.uploadTransaction(transactionObj).subscribe(()=>
      this.TransactionsTableComponent.dataSource.loadTransactions()
    )
  }
}
