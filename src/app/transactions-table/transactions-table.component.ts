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
    this.http.get(`http://localhost:3000/transactions`, {observe: 'body', responseType: 'json'})
      .subscribe((response)=>{
        console.log(response);
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
  }

  deleteTransaction = (e: any, elem: any) => {
    this.http.delete(`http://localhost:3000/transactions/${e.currentTarget.dataset.id}`)
      .subscribe(() => console.log('Transaction deleted successfuly'));
  }

  editTransaction = function (e: any) {
    console.log(e.currentTarget.dataset.id)
  }

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
