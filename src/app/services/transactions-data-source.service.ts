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

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource extends
  MatTableDataSource<Transaction>{

  constructor(private transactionApiService: TransactionApiService, private notify: NotifyService) {
    super();
  }

  public transactionsSubject = new BehaviorSubject<HttpResponse<Page<Transaction>>>(new HttpResponse());

  public lastPage!: number;
  
  public currentPageNumber = 1;

  public pageSizeOptions = PageableDefaults.pageSizeOptions;

  public selectedPageSize = PageableDefaults.defaultPageSize;

  loadTransactions(pageNumber = 1): void {
    this.transactionApiService.getTransactions(pageNumber, this.selectedPageSize)
      .subscribe({
        next: (transactions: HttpResponse<Page<Transaction>>) => {
          this.transactionsSubject.next(transactions);
          this.transactionsSubject.asObservable().subscribe((success: HttpResponse<Page<Transaction>>) => {
            this.data = success.body!.results;
            this.currentPageNumber = success.body!.page;
            this.lastPage = success.body!.totalPages;
          });
        },
        error: (error: TransactionCrudResponseError) => this.notify.showMessage(error.error, Snackbar.ERROR_TYPE)
      });
  }

}
