import { Component } from '@angular/core';
import { TransactionsTableComponent } from '../transactions-table/intr.transactions-table.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'intr-guard-dialog-content',
  templateUrl: './intr.guard-dialog-content.component.html',
  styleUrls: []
})
export class GuardDialogContentComponent {

  constructor(
    public dialogRef: MatDialogRef<TransactionsTableComponent>
  ) { }

  close(decision: boolean): void {
    this.dialogRef.close(decision);
  }

}
