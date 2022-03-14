import { Injectable } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {transactionInterface} from "./web.service";
import {WebService} from "./web.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class TransactionsDataSource implements DataSource<transactionInterface>{

  constructor(private web: WebService) { }

  private transactionsSubject = new BehaviorSubject<transactionInterface[]>([]);

  loadTransactions() {
    this.web.getTransactions().pipe(
        catchError(() => of([])),
    )
    .subscribe(transactions => this.transactionsSubject.next(transactions));
  }

  connect(collectionViewer: CollectionViewer): Observable<transactionInterface[]> {
    console.log("Connecting data source");
    return this.transactionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.transactionsSubject.complete();
  }

}
