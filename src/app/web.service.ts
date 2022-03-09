import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TransactionsTableComponent} from './transactions-table/transactions-table.component';
import { take, first, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

export interface amountInterface {
  amount: number,
  currency: string
}

export interface transactionInterface {
  id: string,
  externalId: number,
  provider: string,
  amount: amountInterface,
  currencyAmount: amountInterface,
  username: string,
  additionalData?: string
}

@Injectable({
  providedIn: 'root'
})

export class WebService {

  constructor(private http: HttpClient){}
  
  transactionsArray!: Observable<Object>;

  getTransactions(): Observable<Object> {
    const transactions: Observable<Object> = this.getTransactionsPromise();
    this.transactionsArray = transactions;
    return transactions
  }

  getTransactionsPromise(): Observable<Object> {
    const response =  this.http.get(`http://localhost:3000/transactions`, {observe: 'body', responseType: 'json'})
    // .toPromise()
    // .subscribe((resp: any)=>{
    //   console.log(resp)
    //   return new MatTableDataSource(resp); 
    // })
    // .map((transactions)=>{return transactions})
    console.log(response)
    return response
  }

  deleteTransaction(id: string): Observable<Object> {
    return this.http.delete(`http://localhost:3000/transactions/${id}`)
  }

  patchTransaction(id: string, updateObj: Object): Observable<Object>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.patch(`http://localhost:3000/transactions/${id}`, updateObj, httpOptions)
  }

  uploadTransaction(transactionData: Object):void{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    this.http.post('http://localhost:3000/transactions', transactionData, httpOptions)
      .subscribe();
  }
}
