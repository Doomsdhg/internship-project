import { Component, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';

//TODO: change your app prefix
// and where realisation?
@Component({
  selector: 'app-transactions-table-page',
  templateUrl: './transactions-table-page.component.html',
  styleUrls: []
})
export class TransactionsTablePageComponent {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;

}
