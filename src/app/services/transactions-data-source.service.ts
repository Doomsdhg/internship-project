import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction, TransactionCrudResponseError } from '../modules/interfaces/transactions.interface';
import { TransactionApiService } from './web-services/transaction-api.service';
import { NotifyService } from './notify.service';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from '../constants/general.constants';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../modules/types/Page.type';
import { Router } from '@angular/router';
import { LocalStorageManagerService } from './local-storage-manager.service';
import { AppRoutes } from '../constants/app-routes.constants';

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource extends
  MatTableDataSource<Transaction> {

  constructor(
    public transactionApiService: TransactionApiService,
    private notify: NotifyService,
    private router: Router,
    private localStorageManager: LocalStorageManagerService) {
    super();
  }

  private transactionsSubject = new BehaviorSubject<HttpResponse<Page<Transaction>>>(new HttpResponse());

  public lastPage!: number;

  public currentPageNumber = 0;

  public pageSizeOptions = Constants.PAGEABLE_DEFAULTS.pageSizeOptions;

  public selectedPageSize = Constants.PAGEABLE_DEFAULTS.defaultPageSize;

  public sortColumn!: string;

  public sortOrder!: string;

  private query!: string | string[];

  public totalTransactions!: number;

  public displayedTransactions!: string;

  public loadTransactions(pageNumber = 0): void {
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
          this.notify.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
          if (error.status === 401) {
            this.localStorageManager.deleteLoginValues();
            this.router.navigate([AppRoutes.AUTHENTICATION]);
          }
        }
      });
  }
}
