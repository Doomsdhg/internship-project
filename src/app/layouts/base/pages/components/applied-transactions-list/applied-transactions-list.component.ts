import { copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Transaction } from 'src/app/interfaces/transactions.interface';
import { TransactionDto } from '../../../classes/transaction-dto.class';
import { TransactionApiService } from '../../../services/transaction-api.service';
import {
  AppliedTransactionsListResponse,
  HandleDropRequiredData,
} from './applied-transactions-list.interfaces';

@Component({
  selector: 'intr-applied-transactions-list',
  templateUrl: './applied-transactions-list.component.html',
  styleUrls: ['./applied-transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppliedTransactionsListComponent implements OnInit {

  private _appliedTransactionsArray: Transaction[] = [];

  private _pointerIsOverDropList = false;

  constructor(
    private transactionApiService: TransactionApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshTransactionList();
  }

  public handleDrop({
    isPointerOverContainer,
    currentIndex,
    previousIndex,
    container,
    previousContainer,
  }: HandleDropRequiredData): void {
    const isDroppedInSource = previousContainer === container;
    if (!isPointerOverContainer) {
      this.deleteTransaction(previousIndex);
    } else if (isDroppedInSource) {
      moveItemInArray(
        this.appliedTransactionsArray,
        previousIndex,
        currentIndex
      );
    } else if (!isDroppedInSource) {
      copyArrayItem(
        previousContainer.data,
        container.data,
        previousIndex,
        currentIndex
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

  public handleMouseLeave(): void {
    this.pointerIsOverDropList = false;
  }

  public handleMouseEnter(): void {
    this.pointerIsOverDropList = true;
  }

  public identify(index: number, item: Transaction): Transaction {
    return item;
  }

  public get listIsEmpty(): boolean {
    return this.appliedTransactionsArray.length === 0;
  }

  public get appliedTransactionsArray(): Transaction[] {
    return this._appliedTransactionsArray;
  }

  public set appliedTransactionsArray(value: Transaction[]) {
    this._appliedTransactionsArray = value;
  }

  public get pointerIsOverDropList(): boolean {
    return this._pointerIsOverDropList;
  }

  public set pointerIsOverDropList(value: boolean) {
    this._pointerIsOverDropList = value;
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
