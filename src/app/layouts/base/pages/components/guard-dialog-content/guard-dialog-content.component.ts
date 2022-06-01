import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';

@Component({
  selector: 'intr-guard-dialog-content',
  templateUrl: './guard-dialog-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuardDialogContentComponent {

  constructor(private matDialogRef: MatDialogRef<TransactionsTableComponent>) { }

  public leaveCurrentPage(): void {
    this.matDialogRef.close(true);
  }

  public stayOnCurrentPage(): void {
    this.matDialogRef.close(false);
  }
}
