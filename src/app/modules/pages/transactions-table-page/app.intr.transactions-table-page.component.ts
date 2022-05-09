import { Component, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from '../../components/transactions-table/app.intr.transactions-table.component';

@Component({
  selector: 'app-intr-transactions-table-page',
  templateUrl: './app.intr.transactions-table-page.component.html',
  styleUrls: []
})
export class TransactionsTablePageComponent {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;

}
