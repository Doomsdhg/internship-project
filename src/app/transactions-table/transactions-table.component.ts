import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import {MatIconModule} from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {

  transactionsArray: any;
  
  constructor(
    private http: HttpClient,
   ) {
     }

  ngOnInit() {
    this.getTransactions()
  }

  getTransactions = () => {
    this.http.get(`http://localhost:3000/transactions`, {observe: 'body', responseType: 'json'})
      .subscribe((response)=>{
        this.transactionsArray = response});
    this.transactionsArray = this.http.get(`http://localhost:3000/transactions`, {observe: 'body', responseType: 'json'})
  }

  showTransactions = (e: any,) => {
    console.log(this.transactionsArray)
  }

  addTransaction = (e: any) => {
    console.log(e.currentTarget)
    this.http.post(`http://localhost:3000/transactions`, {})
      .subscribe(() => console.log('Transaction added successfuly'));
    setTimeout(()=>{
      this.getTransactions()
    }, 100)
  }

  deleteTransaction = (e: any, elem: any) => {
    this.http.delete(`http://localhost:3000/transactions/${e.currentTarget.dataset.id}`)
      .subscribe(() => console.log('Transaction deleted successfuly'));
    setTimeout(()=>{
      this.getTransactions()
    }, 100)
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
    console.log(formValues);
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    this.http.patch(`http://localhost:3000/transactions/${e.currentTarget.dataset.id}`, updateObj, httpOptions)
      .subscribe((resp)=>{console.log(resp)});
    setTimeout(()=>{
      this.getTransactions()
    }, 100)
    
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
