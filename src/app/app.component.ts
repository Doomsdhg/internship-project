import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import transactions from './transactions.json';
import { DataSource } from '@angular/cdk/table';

const transactionsData = transactions;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'internship-project';
  displayedColumns: string[] = ['externalId', 'username', 'amount', 'comissionAmount', 'provider'];
  transactionsArray =  transactionsData;
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
    }];
}
