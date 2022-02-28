import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import transactions from './transactions.json';
import { DataSource } from '@angular/cdk/table';
import {MatIconModule} from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  
  constructor(
    private http: HttpClient,
   ) {
      this.transactionsArray = [];
     }

  async ngOnInit() {
    this.transactionsArray = await this.http.get(`api/transactions`)
  }

  showTransactions = (e: any) => {
    console.log(this.transactionsArray)
  }

  deleteTransaction = function (e: any) {
    console.log(e.currentTarget.dataset.id)
  }

  editTransaction = function (e: any) {
    console.log(e.currentTarget.dataset.id)
  }

  title = 'internship-project';
  transactionsArray: any;
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
