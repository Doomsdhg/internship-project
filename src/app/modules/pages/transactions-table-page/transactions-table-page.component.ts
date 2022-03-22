import { Component, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { Transaction } from '../../../models/interfaces/transaction.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-table-page',
  templateUrl: './transactions-table-page.component.html',
  styleUrls: ['./transactions-table-page.component.scss']
})
export class TransactionsTablePageComponent {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;

  transactionsArray!: MatTableDataSource<Transaction[]>;

  public router!: Router;

  public title = 'internship-project';

  language!: string | null;

  displayedColumns: string[] = [];

}
