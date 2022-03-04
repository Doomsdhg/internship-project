import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { WebService, transactionInterface } from '../web.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit{

  public transactionsArray: any;
  constructor(
    private http: HttpClient, private web: WebService
   ) {
   }

  ngOnInit(): void {
    this.web.getTransactions()
      .subscribe((resp: any)=>{this.transactionsArray = resp})

  }

  refreshTransactions = () => {
    setTimeout(()=>{
      this.web.getTransactions()
      .subscribe((resp:any)=>{this.transactionsArray = resp})
    },100)
  }

  deleteTransaction = (e: any) => {
    const id = e.currentTarget.dataset.id;
    this.web.deleteTransaction(id)
      .subscribe(()=>{console.log('transaction deleted successfully')})
    this.refreshTransactions()
  }

  toggleForms = (element: any) => {
    
    element.displayForms = !element.displayForms;
  }

  updateTransaction = (e: any) => {
    const formValues = [];
    for (let i = 0; i <= 4; i++) {
      if (i === 2 || i === 3) {
        formValues.push(e.currentTarget.parentNode.parentNode.children[i].children[0].children[0].children[0].children[0].children[0].value)
        formValues.push(e.currentTarget.parentNode.parentNode.children[i].children[1].children[0].children[0].children[0].children[0].value)
      } else {
        formValues.push(e.currentTarget.parentNode.parentNode.children[i].children[0].children[0].children[0].children[0].children[0].value);
      }
    }
    const id = e.currentTarget.dataset.id;
    const updateObj = {
      "externalId": formValues[0],
      "username": formValues[1],
      "amount": {
        "amount": formValues[2],
        "currency": formValues[3]
      },
      "comissionAmount": {
        "amount": formValues[4],
        "currency": formValues[5]
      },
      "provider": formValues[6],
      "additionalData": formValues[7]
    }
    this.web.patchTransaction(id, updateObj)
      .subscribe(()=>{console.log('updated successfully')})
    this.refreshTransactions()
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
