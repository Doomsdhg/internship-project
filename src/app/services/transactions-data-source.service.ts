import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from "rxjs";
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
// DataSource<transactionInterface>, 
MatTableDataSource<transactionInterface[]>{

  public length!: number;
  // public paginator! : MatPaginator;

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
        // transactions.splice(this.paginator.pageSize)
        this.transactionsSubject.next(transactions)
        this.transactionsSubject.asObservable().subscribe((success: any) => this.data = success)
        console.log(transactions)
        console.log(this.transactionsSubject)
      },
      error: (error: TransactionCrudResponseError) => this.notify.showMessage(error.error, true)
    });
  }

  // connect(collectionViewer: CollectionViewer): Observable<transactionInterface[]> {
  //   console.log("Connecting data source");
  //   console.log(this.transactionsSubject.value)
  //   return this.transactionsSubject.asObservable();
  // }

  // disconnect(collectionViewer: CollectionViewer): void {
  //   this.transactionsSubject.complete();
  // }

}
