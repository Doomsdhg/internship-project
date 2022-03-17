import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from "rxjs";
import { transactionInterface } from "../models/interfaces/transaction.interface";
import { WebGetService } from "../services/web-services/web-get.service";
import { catchError } from "rxjs/operators";
import { TransactionCrudResponseError } from '../models/interfaces/transaction-crud-response-error.interface';
import { NotifyService } from './notify.service';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource extends 
MatTableDataSource<transactionInterface[]>{

  public length!: number;

  constructor(private webGet: WebGetService, private notify: NotifyService) {
    super()
   }

  public transactionsSubject = new BehaviorSubject<transactionInterface[]>([]);

  loadTransactions() {
    this.webGet.getTransactions().pipe(
        catchError(() => of([])),
    )
    .subscribe({
      next: (transactions: transactionInterface[]) => {
        this.length = transactions.length;
        this.transactionsSubject.next(transactions)
        this.transactionsSubject.asObservable().subscribe((success: any) => this.data = success)
        console.log(transactions)
        console.log(this.transactionsSubject)
      },
      error: (error: TransactionCrudResponseError) => this.notify.showMessage(error.error, true)
    });
  }

}
