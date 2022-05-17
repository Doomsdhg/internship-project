import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction, TransactionCrudResponseError } from '../modules/interfaces/transactions.interface';
import { TransactionApiService } from './web-services/transaction-api.service';
import { NotifyService } from './notify.service';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from '../constants/general.constants';

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

  public pageSizeOptions = Constants.PAGEABLE_DEFAULTS.pageSizeOptions;

  public selectedPageSize = Constants.PAGEABLE_DEFAULTS.defaultPageSize;

  public sortColumn!: string;

  public sortOrder!: string;

  private transactionsSubject = new BehaviorSubject<Transaction[]>([this.emptyTransaction]);

  public loadTransactions(pageNumber = 0): void {
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
