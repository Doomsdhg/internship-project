import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { transactionInterface } from "../models/interfaces/transaction.interface";
import { WebGetService } from "../services/web-services/web-get.service";
import { catchError } from "rxjs/operators";
import { TransactionCrudResponseError } from '../models/interfaces/transaction-crud-response-error.interface';
import { NotifyService } from './notify.service';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource implements DataSource<transactionInterface>{

  public length!: number;
  public paginator! : MatPaginator;

  constructor(private webGet: WebGetService, private notify: NotifyService) {
   }

  private transactionsSubject = new BehaviorSubject<transactionInterface[]>([]);

  loadTransactions() {
    this.webGet.getTransactions().pipe(
        catchError(() => of([])),
    )
    .subscribe({
      next: (transactions: transactionInterface[]) => {
        this.length = transactions.length;
        this.transactionsSubject.next(transactions)
        console.log(this.transactionsSubject)
      },
      error: (error: TransactionCrudResponseError) => this.notify.showMessage(error.error, true)
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<transactionInterface[]> {
    console.log("Connecting data source");
    return this.transactionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.transactionsSubject.complete();
  }

}
