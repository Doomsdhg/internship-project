import { Component, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { transactionInterface } from '../../../models/interfaces/transaction.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-table-page',
  templateUrl: './transactions-table-page.component.html',
  styleUrls: ['./transactions-table-page.component.scss']
})
export class TransactionsTablePageComponent {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;

  transactionsArray!: MatTableDataSource<transactionInterface[]>;

  public router!: Router;

  public title: string = 'internship-project';

  language!: string | null;

  displayedColumns: string[] = [];

  constructor() {}


}
