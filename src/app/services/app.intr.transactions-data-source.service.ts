import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction, TransactionCrudResponseError } from '../modules/interfaces/app.intr.transactions.interface';
import { TransactionApiService } from './web-services/app.intr.transaction-api.service';
import { NotifyService } from './app.intr.notify.service';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from '../constants/main.constants';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../modules/types/Page.type';
import { Router } from '@angular/router';
import { LocalStorageManagerService } from './app.intr.local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource extends
  MatTableDataSource<Transaction> {

  constructor(
    public transactionApiService: TransactionApiService,
    private notifyService: NotifyService,
    private router: Router,
    private localStorageManagerService: LocalStorageManagerService) {
    super();
  }

  public transactionsSubject = new BehaviorSubject<HttpResponse<Page<Transaction>>>(new HttpResponse());

  public lastPage!: number;

  public currentPageNumber = 0;

  public pageSizeOptions = Constants.PAGEABLE_DEFAULTS.pageSizeOptions;

  public selectedPageSize = Constants.PAGEABLE_DEFAULTS.defaultPageSize;

  public sortColumn!: string;

  public sortOrder!: string;

  public query!: string | string[];

  public totalTransactions!: number;

  public displayedTransactions!: string;

  loadTransactions(pageNumber = 0): void {
    this.currentPageNumber = pageNumber;
    this.transactionApiService.getTransactions(this.query, this.currentPageNumber, this.selectedPageSize, this.sortColumn, this.sortOrder)
      .subscribe({
        next: (transactions: HttpResponse<Page<Transaction>>) => {
          this.transactionsSubject.next(transactions);
          this.transactionsSubject.asObservable().subscribe((success: HttpResponse<Page<Transaction>>) => {
            this.data = success.body as unknown as Transaction[];
          });
        },
        error: (error: TransactionCrudResponseError) => {
          this.notifyService.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
          if (error.status === 401) {
            this.localStorageManagerService.deleteLoginValues();
            this.router.navigate([Constants.APP_ROUTES.AUTHENTICATION]);
          }
        }
      });
  }

}
