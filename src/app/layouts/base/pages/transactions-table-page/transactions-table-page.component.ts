import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from 'src/app/layouts/base/pages/components/transactions-table/transactions-table.component';

@Component({
  selector: 'intr-transactions-table-page',
  templateUrl: './transactions-table-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTablePageComponent {

  constructor() { }

  @ViewChild(TransactionsTableComponent) transactionsTableComponent!: TransactionsTableComponent;

  public get inputChanged(): boolean {
    return this.transactionsTableComponent.inputChanged;
  }
}
