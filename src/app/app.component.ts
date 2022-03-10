import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { transactionInterface, WebService } from './web.service';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class AppComponent implements OnInit {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;
  transactionsArray!: MatTableDataSource<transactionInterface[]>;
  public router!: Router;
  language!: string | null;

  constructor(
    private translateService: TranslateService,
    public http: HttpClient,
    public web: WebService,
    public cdr: ChangeDetectorRef
   ) {
     this.translateService.setDefaultLang('en');
     this.translateService.use(localStorage.getItem('language') || 'en')
     }

  ngOnInit(): void {
    this.language = localStorage.getItem('language') || 'en';
    
    const transactions: any = this.web.getTransactionsPromise();
    transactions.subscribe();
    this.transactionsArray = new MatTableDataSource(transactions);
    this.cdr.detectChanges()
  }

  changeLanguage(e: any): void {
    console.log(e.target.value);
    localStorage.setItem('language', e.target.value)
    window.location.reload()
  }

  refreshTransactions(): void {
    const transactions: any = this.web.getTransactionsPromise();
    transactions.subscribe();
    this.transactionsArray = new MatTableDataSource(transactions);
    this.cdr.detectChanges()
  }

  title: string = 'internship-project';
  columns: string[] = ['externalId', 'username', 'amount', 'comissionAmount', 'provider', 'actions'];
  displayedColumns: string[] = ['externalId','username','amount','comissionAmount','provider', 'actions'];
  localeList: any[] = [
    { code: 'en', label: 'English'},
    { code: 'ru', label: 'Русский'},
    { code: 'ua', label: 'Український'},
    { code: 'by', label: 'Білоруська'}
  ];
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
