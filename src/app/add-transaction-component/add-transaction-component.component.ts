import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {TransactionsTableComponent} from '../transactions-table/transactions-table.component';


@Component({
  selector: 'app-add-transaction-component',
  templateUrl: './add-transaction-component.component.html',
  styleUrls: ['./add-transaction-component.component.scss']
})
export class AddTransactionComponentComponent implements OnInit {
  @Input() TransactionTableComponent: any = '';
  constructor(
    private http: HttpClient,
   ) {
     }

  @ViewChild('addition_form', {static: false})
  additionForm: ElementRef | undefined;
  @ViewChild('externalId', {static: false})
  externalId: ElementRef | undefined;
  @ViewChild('provider', {static: false})
  provider: ElementRef | undefined;
  @ViewChild('amount', {static: false})
  amount: ElementRef | undefined;
  @ViewChild('currency', {static: false})
  currency: ElementRef | undefined;
  @ViewChild('comissionAmount', {static: false})
  comissionAmount: ElementRef | undefined;
  @ViewChild('comissionCurrency', {static: false})
  comissionCurrency: ElementRef | undefined;
  @ViewChild('username', {static: false})
  username: ElementRef | undefined;
  @ViewChild('additionalData', {static: false})
  additionalData: ElementRef | undefined;
  status: boolean = false;

  ngOnInit(): void {
  }

  toggleForm =  () => {
    this.additionForm?.nativeElement;
    this.status = !this.status
  }

  addTransaction = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.parentNode.children[0]);
    console.log(e.currentTarget.parentNode)
    const formValues = [];
    for (let i = 0; i <= 7; i++) {
      console.log(e.currentTarget.parentNode.children[0][i].value);
      formValues.push(e.currentTarget.parentNode.children[0][i].value);
    }
    const transactionObj = {
      "externalId": this.externalId!.nativeElement.value,
      "provider": this.provider!.nativeElement.value,
      "amount": {
        "amount": this.amount!.nativeElement.value,
        "currency": this.currency!.nativeElement.value
      },
      "comissionAmount": {
        "amount": this.comissionAmount!.nativeElement.value,
        "currency": this.comissionCurrency!.nativeElement.value
      },
      "username": this.username!.nativeElement.value,
      "additionalData": this.additionalData!.nativeElement.value
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    this.http.post('http://localhost:3000/transactions', transactionObj, httpOptions)
      .subscribe((resp)=>{
        this.TransactionTableComponent.getTransactions();
      });
  }
}
