import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from "rxjs";
import { Transaction, TransactionCrudResponseError } from "../modules/interfaces/transactions.interface";
import { TransactionApiService } from "../services/web-services/transaction-api.service";
import { catchError } from "rxjs/operators";
import { NotifyService } from './notify.service';
import { MatTableDataSource } from '@angular/material/table';
import { Snackbar } from '../constants/snackbar.constants';
import { HttpResponse } from '@angular/common/http';
import { PageableDefaults } from '../constants/pageable.constants';

interface headers {
  link: string
}

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource extends
  MatTableDataSource<Transaction>{

  constructor(private transactionApiService: TransactionApiService, private notify: NotifyService) {
    super();
  }

  public pagesLinks!: string[];

  public lastPage!: number;

  public transactionsSubject = new BehaviorSubject<HttpResponse<Transaction[]>>(new HttpResponse());

  public currentPageNumber = 1;

  public pageSizeOptions = PageableDefaults.pageSizeOptions;

  public selectedPageSize = 10;

  loadTransactions(pageNumber = 1): void {
    this.transactionApiService.getTransactions(pageNumber, this.selectedPageSize)
      .subscribe({
        next: (transactions: HttpResponse<Transaction[]>) => {
          this.transactionsSubject.next(transactions);
          this.transactionsSubject.asObservable().subscribe((success: HttpResponse<Transaction[]>) => {
            this.data = success.body as Transaction[];
            this.currentPageNumber = pageNumber;
            const totalAmount = Number(success.headers.get('X-total-count'));
            this.lastPage = totalAmount % this.selectedPageSize ? totalAmount / 10 + 1 : totalAmount / 10;
          });
        },
        error: (error: TransactionCrudResponseError) => this.notify.showMessage(error.error, Snackbar.ERROR_TYPE)
      });
  }

}
