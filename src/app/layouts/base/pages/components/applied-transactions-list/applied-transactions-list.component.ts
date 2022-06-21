import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Transaction } from 'src/app/interfaces/transactions.interface';
import { TransactionDto } from '../../../classes/transaction-dto.class';
import { TransactionApiService } from '../../../services/transaction-api.service';
import { AppliedTransactionsListResponse } from './applied-transactions-list.class';

@Component({
  selector: 'intr-applied-transactions-list',
  templateUrl: './applied-transactions-list.component.html',
  styleUrls: ['./applied-transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppliedTransactionsListComponent implements OnInit {
  
  public appliedTransactionsArray: Transaction[] = [];

  public pointerIsOverDropList: boolean = false;

  constructor(
    private transactionApiService: TransactionApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshTransactionList();
  }

  public handleDrop = (event: CdkDragDrop<Transaction[]>): void => {
    const { isPointerOverContainer, previousContainer, container } = event;
    const isDroppedInSource = previousContainer === container;
    if (!isPointerOverContainer) {
      this.deleteTransaction(event.previousIndex);
    } else if (isDroppedInSource) {
      moveItemInArray(
        this.appliedTransactionsArray,
        event.previousIndex,
        event.currentIndex
      );
    } else if (!isDroppedInSource) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.refreshAppliedTransactions();
  }

  public handleCardDeletion(index: number): void {
    this.deleteTransaction(index);
    this.refreshAppliedTransactions();
  }

  public buildTransactionDto(
    transaction: Transaction,
    index: number
  ): TransactionDto {
    return new TransactionDto(transaction, index);
  }

  public handleRelease(event: any): void {
    if (!this.pointerIsOverDropList) {
      console.log(event);
    }
  }

  public handleMouseLeave (): void {
    this.pointerIsOverDropList = false;
  }

  public handleMouseEnter (): void {
    this.pointerIsOverDropList = true;
  }

  public identify(index: number, item: Transaction): Transaction {
    return item;
  }

  public get listIsEmpty(): boolean {
    return this.appliedTransactionsArray.length === 0;
  }

  private deleteTransaction(index: number): void {
    this.appliedTransactionsArray.splice(index, 1);
  }

  private refreshTransactionList(): void {
    this.transactionApiService
      .getAppliedTransactions()
      .subscribe(
        (appliedTransactionsListResponse: AppliedTransactionsListResponse) => {
          this.appliedTransactionsArray = appliedTransactionsListResponse.value;
          this.changeDetectorRef.detectChanges();
        }
      );
  }

  private refreshAppliedTransactions(): void {
    this.transactionApiService
      .replenishServerData(this.appliedTransactionsArray)
      .subscribe(() => {
        this.refreshTransactionList();
      });
  }
}
