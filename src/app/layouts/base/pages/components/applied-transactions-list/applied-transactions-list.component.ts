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
    if (!event.isPointerOverContainer) {
      this.appliedTransactionsArray.splice(event.previousIndex, 1);
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(this.appliedTransactionsArray, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.onDropEvent.emit(true);
    this.refreshAppliedTransactions();
  }

  public deleteTransaction(index: number): void {
    this.appliedTransactionsArray.splice(index, 1);
    this.refreshAppliedTransactions();
  }

  public handleDragRelease(event: CdkDragRelease<Row>): void {
    console.log(event.source.element.nativeElement);
    console.log(document.querySelector('.cdk-drag-animating'));
    setTimeout(() => {
      
    // event.source.element.nativeElement.remove();
    // event.source.getRootElement().remove();
    // document.querySelector('.cdk-drag-animating')?.remove();
    console.log(document.querySelector('.cdk-drag-animating'));
    event.source.element.nativeElement.style.transitionDuration = '0ms';
    event.source.getRootElement().style.transitionDuration = '0ms';
    event.source.getRootElement().style.transition = 'transform 10ms cubic-bezier(0, 0, 0.2, 1) !important';
      console.log(event);
    }, 50)
  }

  public get listIsEmpty(): boolean {
    return this.appliedTransactionsArray.length === 0;
  }

  private refreshAppliedTransactions(): void {
    this.transactionApiService.refreshAppliedTransactionsList(this.appliedTransactionsArray).subscribe();
  }
}
