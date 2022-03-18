import { Component, OnInit } from '@angular/core';
import { TransactionPageComponent } from '../../pages/transaction-page/transaction-page.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  leavePage: boolean
}

@Component({
  selector: 'app-guard-dialog-content',
  templateUrl: './guard-dialog-content.component.html',
  styleUrls: ['./guard-dialog-content.component.scss']
})
export class GuardDialogContentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TransactionPageComponent>
  ) { }

  close(decision: boolean): void {
    this.dialogRef.close(decision)
  }

  ngOnInit(): void {
  }

}
