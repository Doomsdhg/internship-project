import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { Transaction, TransactionCrudResponseError } from 'src/app/interfaces/transactions.interface';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsDataSource extends
  MatTableDataSource<Transaction> {

  emptyTransaction!: Transaction;

  constructor(
    private transactionApiService: TransactionApiService,
    private notifyService: NotifyService) {
    super();
  }

  public currentPageNumber = 0;

  public pageSizeOptions = Constants.PAGEABLE_DEFAULTS.PAGE_SIZE_OPTIONS;

  public selectedPageSize = Constants.PAGEABLE_DEFAULTS.PAGE_SIZE;

  public sortColumn: string = Constants.PAGEABLE_DEFAULTS.SORT_EVENT.active;

  public sortOrder: 'asc' | 'desc' | '' = Constants.PAGEABLE_DEFAULTS.SORT_EVENT.direction;

  private transactionsSubject = new BehaviorSubject<Transaction[]>([this.emptyTransaction]);

  public loadTransactions(pageNumber = this.currentPageNumber): void {
    this.currentPageNumber = pageNumber;
    this.transactionApiService.getTransactions(this.currentPageNumber, this.selectedPageSize, this.sortColumn, this.sortOrder)
      .subscribe({
        next: (transactions: Transaction[]) => {
          this.transactionsSubject.next(transactions);
          this.transactionsSubject.asObservable().subscribe((success: Transaction[]) => {
            this.data = success;
          });
        },
        error: (error: TransactionCrudResponseError) => {
          this.notifyService.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
        }
      });
  }
}
