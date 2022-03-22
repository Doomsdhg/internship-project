import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from "rxjs";
import { Transaction } from "../models/interfaces/transaction.interface";
import { TransactionApiService } from "../services/web-services/transaction-api.service";
import { catchError } from "rxjs/operators";
import { TransactionCrudResponseError } from '../models/interfaces/transaction-crud-response-error.interface';
import { NotifyService } from './notify.service';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource extends
  MatTableDataSource<Transaction[]>{

  public length!: number;

  constructor(private transactionApiService: TransactionApiService, private notify: NotifyService) {
    super()
  }

  public transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  loadTransactions() {
    this.transactionApiService.getTransactions().pipe(
      catchError(() => of([])),
    )
      .subscribe({
        next: (transactions: Transaction[]) => {
          this.length = transactions.length;
          this.transactionsSubject.next(transactions)
          this.transactionsSubject.asObservable().subscribe((success: any) => this.data = success)
        },
        error: (error: TransactionCrudResponseError) => this.notify.showMessage(error.error, 'error')
      });
  }

}
