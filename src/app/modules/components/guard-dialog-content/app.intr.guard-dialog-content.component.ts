import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionsTableComponent } from '../transactions-table/app.intr.transactions-table.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-intr-guard-dialog-content',
  templateUrl: './app.intr.guard-dialog-content.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuardDialogContentComponent {

  constructor(
    public dialogRef: MatDialogRef<TransactionsTableComponent>
  ) { }

  close(decision: boolean): void {
    this.dialogRef.close(decision);
  }

}
