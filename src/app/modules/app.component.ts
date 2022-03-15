import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { transactionInterface } from '../models/interfaces/transaction.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

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

  public title: string = 'internship-project';

  language!: string | null;

  displayedColumns: string[] = [];

  constructor(
    private translateService: TranslateService
   ) {
     this.translateService.use(localStorage.getItem('language') || 'en');
     }

  async ngOnInit(): Promise<void> {
    this.language = localStorage.getItem('language') || environment.defaultLocale;
  }

  changeLanguage(e: Event): void {
    const target = e.target as HTMLButtonElement;
    localStorage.setItem('language', target.value)
    window.location.reload()
  }

}
