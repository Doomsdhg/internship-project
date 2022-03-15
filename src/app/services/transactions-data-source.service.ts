import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { transactionInterface } from "../models/interfaces/transaction.interface";
import { WebGetService } from "../services/web-services/web-get.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource implements DataSource<transactionInterface>{

  constructor(private webGet: WebGetService) { }

  private transactionsSubject = new BehaviorSubject<transactionInterface[]>([]);

  loadTransactions() {
    this.webGet.getTransactions().pipe(
        catchError(() => of([])),
    )
    .subscribe({
      next: (transactions: transactionInterface[]) => this.transactionsSubject.next(transactions),
      error: (error: Object) => { console.log(error) }
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
