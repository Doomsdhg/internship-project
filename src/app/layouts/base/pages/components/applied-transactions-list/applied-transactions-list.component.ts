import { CdkDragDrop, CdkDragRelease, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TransactionApiService } from '../../../services/transaction-api.service';
import { Row } from '../transactions-table/transactions-table.interfaces';
import { AppliedTransactionsListResponse } from './applied-transactions-list.interfaces';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'intr-applied-transactions-list',
  templateUrl: './applied-transactions-list.component.html',
  styleUrls: ['./applied-transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppliedTransactionsListComponent implements OnInit {

  public appliedTransactionsArray: Row[] = [];

  @Output() onDropEvent = new EventEmitter<boolean>();

  constructor(
    private transactionApiService: TransactionApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.transactionApiService.getAppliedTransactions()
    .subscribe((appliedTransactionsListResponse: AppliedTransactionsListResponse) => {
      this.appliedTransactionsArray = appliedTransactionsListResponse.value;
      this.changeDetectorRef.detectChanges();
    })
  }

  public handleDrop = (event: CdkDragDrop<Row[]>): void => {
    console.log(event);
    console.log(event.previousContainer === event.container);
    if (!event.isPointerOverContainer) {
      this.appliedTransactionsArray.splice(event.previousIndex, 1);
    }
    if (event.previousContainer === event.container) {
      console.log(this.appliedTransactionsArray);
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      moveItemInArray(this.appliedTransactionsArray, event.previousIndex, event.currentIndex);
      console.log(this.appliedTransactionsArray);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.onDropEvent.emit(true);
    this.transactionApiService.refreshAppliedTransactionsList(this.appliedTransactionsArray)
    .subscribe(() => {
      this.changeDetectorRef.detectChanges()
    });
  }
}
