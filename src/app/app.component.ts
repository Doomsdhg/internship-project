import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { transactionInterface, WebService } from './web.service';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class AppComponent implements OnInit {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;
  transactionsArray!: MatTableDataSource<transactionInterface[]>;

  constructor(
    public http: HttpClient,
    public web: WebService,
    public cdr: ChangeDetectorRef
   ) {
     }

  ngOnInit(): void {
    const transactions: any = this.web.getTransactionsPromise();
    transactions.subscribe();
    this.transactionsArray = new MatTableDataSource(transactions);
    this.cdr.detectChanges()
  }

  refreshTransactions(): void {
    const transactions: any = this.web.getTransactionsPromise();
    transactions.subscribe();
    this.transactionsArray = new MatTableDataSource(transactions);
    this.cdr.detectChanges()
  }

  title: string = 'internship-project';
  displayedColumns: string[] = ['externalId', 'username', 'amount', 'comissionAmount', 'provider', 'actions'];
  columnNames: Object[] = [{
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
