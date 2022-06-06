import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionsTableComponent } from 'src/app/layouts/base/pages/components/transactions-table/transactions-table.component';
import { AddTransactionComponent } from './../components/add-transaction/add-transaction.component';

@Component({
  selector: 'intr-transactions-table-page',
  templateUrl: './transactions-table-page.component.html',
  styleUrls: ['./transactions-table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTablePageComponent {

  constructor(private matDialog: MatDialog) { }

  @ViewChild(TransactionsTableComponent) transactionsTableComponent!: TransactionsTableComponent;

  public get inputChanged(): boolean {
    return this.transactionsTableComponent.inputChanged;
  }

  public openAddingWindow(): void {
    this.matDialog.open(AddTransactionComponent);
  }
}
