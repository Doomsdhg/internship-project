import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Transaction, TransactionCrudResponseError } from "../modules/interfaces/transactions.interface";
import { TransactionApiService } from "../services/web-services/transaction-api.service";
import { NotifyService } from './notify.service';
import { MatTableDataSource } from '@angular/material/table';
import { Snackbar } from '../constants/snackbar.constants';
import { HttpResponse } from '@angular/common/http';
import { PageableDefaults } from '../constants/pageable.constants';
import { Page } from '../modules/types/Page.type';
import { Router } from '@angular/router';
import { AppRoutes } from '../constants/app-routes.constants';
import { HeaderComponent } from '../modules/components/header/header.component';
import { LocalStorageManagerService } from './local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource extends
  MatTableDataSource<Transaction>{

  constructor(
    private transactionApiService: TransactionApiService,
    private notify: NotifyService,
    private router: Router,
    private localStorageManager: LocalStorageManagerService) {
    super();
  }

  private header!: HeaderComponent;

  public transactionsSubject = new BehaviorSubject<HttpResponse<Page<Transaction>>>(new HttpResponse());

  public lastPage!: number;

  public currentPageNumber = 0;

  public pageSizeOptions = PageableDefaults.pageSizeOptions;

  public selectedPageSize = PageableDefaults.defaultPageSize;

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
          this.notify.showMessage(error.error, Snackbar.ERROR_TYPE);
          if (error.status === 401) {
            this.localStorageManager.deleteLoginValues();
            this.router.navigate([AppRoutes.AUTHENTICATION]);
          }
        }
      });
  }

}
