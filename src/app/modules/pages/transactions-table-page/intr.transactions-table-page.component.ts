import { Component, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from '../../components/transactions-table/intr.transactions-table.component';

@Component({
  selector: 'intr-transactions-table-page',
  templateUrl: './intr.transactions-table-page.component.html',
  styleUrls: []
})
export class TransactionsTablePageComponent {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;

}
