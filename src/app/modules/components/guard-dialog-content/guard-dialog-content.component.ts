import { Component } from '@angular/core';
import { TransactionPageComponent } from '../../pages/transaction-page/transaction-page.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-guard-dialog-content',
  templateUrl: './guard-dialog-content.component.html',
  styleUrls: []
})
export class GuardDialogContentComponent {

  constructor(
    public dialogRef: MatDialogRef<TransactionPageComponent>
  ) { }

  close(decision: boolean): void {
    this.dialogRef.close(decision);
  }

}
