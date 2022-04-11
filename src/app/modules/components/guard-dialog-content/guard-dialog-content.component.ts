import { Component } from '@angular/core';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-guard-dialog-content',
  templateUrl: './guard-dialog-content.component.html',
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
