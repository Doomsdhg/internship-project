import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { transactionInterface, WebService } from './web.service';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

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

  displayedColumns: string[] = [];

  constructor(
    private translateService: TranslateService,
    public http: HttpClient,
    public web: WebService,
    public cdr: ChangeDetectorRef
   ) {
     this.translateService.use(localStorage.getItem('language') || 'en');
     }

  async ngOnInit(): Promise<void> {
    this.language = localStorage.getItem('language') || environment.defaultLocale;
    const transactions: any = await this.web.getTransactions();
    console.log(transactions)
    this.transactionsArray = new MatTableDataSource(transactions);
  }

  changeLanguage(e: Event): void {
    const target = e.target as HTMLButtonElement;
    localStorage.setItem('language', target.value)
    window.location.reload()
  }

  refreshTransactions(): void {
    // const transactions: any = await this.web.getTransactions();
    // this.transactionsArray = new MatTableDataSource(transactions);
    this.TransactionsTableComponent.refreshTransactions()
  }
}
