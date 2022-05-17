import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'intr-guard-dialog-content',
  templateUrl: './guard-dialog-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuardDialogContentComponent {

  constructor(
    public matDialogRef: MatDialogRef<TransactionsTableComponent>
  ) { }

  public closeDialog(decision: boolean): void {
    this.matDialogRef.close(decision);
  }
}
