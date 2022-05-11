import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'intr-guard-dialog-content',
  templateUrl: './guard-dialog-content.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuardDialogContentComponent {

  constructor(
    public dialogRef: MatDialogRef<TransactionsTableComponent>
  ) { }

  public close(decision: boolean): void {
    this.dialogRef.close(decision);
  }
}
