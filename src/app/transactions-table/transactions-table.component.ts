import {Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { WebService, transactionInterface, amountInterface } from '../web.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import _ from "lodash";

// interface currentTarget {
//   dataset: dataset
// }

// interface dataset {
//   id: string
// }

// interface mouseClick extends MouseEvent {
//   currentTarget: currentTarget
// }

interface column extends Object {
  id: string,
  value: string
}

interface element extends Object {
  displayForms: boolean,
  provider: string,
  username: string,
  externalId: string,
  amount: amountInterface,
  comissionAmount: amountInterface,
  additionalData: string,
  id: string
}


@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsTableComponent implements OnInit{

  @Input() transactionsArray!: MatTableDataSource<transactionInterface[]>;
  @Output() getRefreshedTransactions: EventEmitter<any> = new EventEmitter();

  formsToggled: boolean = false;
  public cdr!: ChangeDetectorRef;

  // public transactionsArray: any = this.web.getTransactionsPromise();
  constructor(
    public web: WebService, cdr: ChangeDetectorRef
   ) {

   }

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

  ngOnInit(): void {
    console.log(localStorage.getItem('language'))
    // this.web.getTransactions().subscribe((resp:transactionInterface[])=>{this.transactionsArray = new MatTableDataSource(resp)})
    this.getRefreshedTransactions.emit()
    
  }

  refreshTransactions = (): void => {
    // this.getRefreshedTransactions.emit()
    // setTimeout(async ()=>{
      const transactions: any = this.web.getTransactionsPromise();
      transactions.subscribe();
      this.transactionsArray = new MatTableDataSource(transactions);
      this.cdr.detectChanges()
      // this.getRefreshedTransactions.emit()
    // },100)
    
    
    // this.transactionsArray = this.web.getTransactions();
    // setTimeout(async()=>{
    //   this.web.getTransactions()
    //   .subscribe((resp:transactionInterface[])=>{
    //     this.transactionsArray = new MatTableDataSource(resp);
        // if (_.isEqual(this.transactionsArray.data,resp)) {
        //   this.refreshTransactions();
        //   return null
        // }
        // this.transactionsArray = new MatTableDataSource(resp)
        // return null
      // })
      // if (this.compareArrays(this.transactionsArray.data, this.oldTransactionsArray.data)) {
      //   this.refreshTransactions()
      // } else {
      //   this.oldTransactionsArray.data = this.transactionsArray.data;
      // }
    // },100)
  }

  // compareArrays = (firstArray:any, secondArray:any) => {
  //   return _.isEqual(firstArray, secondArray)
  // }

  deleteTransaction = (e: any): void => {
    const id: string = e.currentTarget.dataset.id;
    this.web.deleteTransaction(id)
      .subscribe(()=>{console.log('transaction deleted successfully')})
    this.refreshTransactions()
  }

  toggleForms = (element: element): void => {
    this.transactionUpdateForm = new FormGroup({
      provider: new FormControl(element.provider),
      username: new FormControl(element.username),
      externalId: new FormControl(element.externalId),
      amount: new FormControl(element.amount.amount),
      currency: new FormControl(element.amount.currency),
      comissionAmount: new FormControl(element.comissionAmount.amount),
      comissionCurrency: new FormControl(element.comissionAmount.currency),
      additionalData: new FormControl(element.additionalData)
    })
    this.formsToggled = !this.formsToggled;
    element.displayForms = !element.displayForms;
    this.cdr.detectChanges()
  }

  updateTransaction = (e: any, element: element): void => {
    const id: string = e.currentTarget.dataset.id;
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
    this.web.patchTransaction(id, updateObj)
      .subscribe(()=>{console.log('updated successfully')})
    this.toggleForms(element)
    this.refreshTransactions()
    
  }
  
  displayEditForms: boolean = false;
  title: string = 'internship-project';
  displayedColumns: string[] = ['externalId', 'username', 'amount', 'comissionAmount', 'provider', 'actions'];
  columnNames : column[] = [{
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
