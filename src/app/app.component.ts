import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;
  
  constructor(
    private http: HttpClient,
   ) {
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
