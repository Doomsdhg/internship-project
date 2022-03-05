import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { WebService, transactionInterface } from '../web.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTableComponent implements OnInit{

  formsToggled: boolean = false;

  public transactionsArray!: any;
  constructor(
    private web: WebService
   ) {
   }

  transactionUpdateForm = new FormGroup({
    provider: new FormControl(''),
    username: new FormControl(''),
    externalId: new FormControl(''),
    amount: new FormControl(''),
    currency: new FormControl(''),
    comissionAmount: new FormControl(''),
    comissionCurrency: new FormControl(''),
    additionalData: new FormControl('')
  });

  ngOnInit(): void {
    this.web.getTransactions()
        .subscribe((resp: any)=>{this.transactionsArray = resp;console.log(this.transactionsArray)})
  }

  refreshTransactions = async () => {
    // setTimeout(()=>{
      this.web.getTransactions()
        .subscribe((resp: any)=>{this.transactionsArray = resp})
    // },100)
  }

  deleteTransaction = (e: any) => {
    const id = e.currentTarget.dataset.id;
    this.web.deleteTransaction(id)
      .subscribe(()=>{console.log('transaction deleted successfully')})
    this.refreshTransactions()
  }

  toggleForms = (element: any) => {
    this.formsToggled = !this.formsToggled;
    element.displayForms = !element.displayForms;
  }

  updateTransaction = (e: any, element: any) => {
    const id = e.currentTarget.dataset.id;
    const updateObj = {
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
    this.web.patchTransaction(id, updateObj)
      .subscribe(()=>{console.log('updated successfully')})
    this.refreshTransactions()
    this.toggleForms(element)
  }
  
  displayEditForms = false;
  title = 'internship-project';
  displayedColumns: string[] = ['externalId', 'username', 'amount', 'comissionAmount', 'provider', 'actions'];
  columnNames = [{
      id: 'externalId',
      value: 'No.',
    }, 
    {
      id: 'username',
      value: 'Username',
    },
    {
      id: 'amount',
      value: 'Amount',
    },
    {
      id: 'comissionAmount',
      value: 'Comission amount',
    },
    {
      id: 'provider',
      value: 'Provider',
    },
    {
      id: 'actions',
      value: 'Actions'
    }];
}
