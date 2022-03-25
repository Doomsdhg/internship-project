import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from "rxjs";
import { Transaction, TransactionCrudResponseError } from "../modules/interfaces/transactions.interface";
import { TransactionApiService } from "../services/web-services/transaction-api.service";
import { catchError } from "rxjs/operators";
import { NotifyService } from './notify.service';
import { MatTableDataSource } from '@angular/material/table';
import { Snackbar } from '../constants/snackbar.constants';

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource extends
  MatTableDataSource<Transaction>{

  constructor(private transactionApiService: TransactionApiService, private notify: NotifyService) {
    super()
  }

  public transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  loadTransactions(): void {
    this.transactionApiService.getTransactions().pipe(
      catchError(() => of([])),
    )
      .subscribe({
        next: (transactions: Transaction[]) => {
          this.transactionsSubject.next(transactions)
          this.transactionsSubject.asObservable().subscribe((success: Transaction[]) => this.data = success)
        },
        error: (error: TransactionCrudResponseError) => this.notify.showMessage(error.error, Snackbar.ERROR_TYPE)
      });
  }

}
