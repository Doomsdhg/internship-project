import { Component, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';

@Component({
  selector: 'intr-transactions-table-page',
  templateUrl: './transactions-table-page.component.html'
})
export class TransactionsTablePageComponent {

  @ViewChild(TransactionsTableComponent) transactionsTableComponent!: TransactionsTableComponent;
  public get inputChanged(): boolean {
    return this.transactionsTableComponent.inputChanged;
  }
}
