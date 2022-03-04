import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TransactionsTableComponent} from './transactions-table/transactions-table.component';

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
  
  transactionsArray!: transactionInterface[];

  getTransactions(): any {
    return this.http.get(`http://localhost:3000/transactions`, {observe: 'body', responseType: 'json'})
  }

  deleteTransaction(id: string): any {
    return this.http.delete(`http://localhost:3000/transactions/${id}`)
  }

  patchTransaction(id: string, updateObj: Record<string, unknown>): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.patch(`http://localhost:3000/transactions/${id}`, updateObj, httpOptions)
  }

  uploadTransaction(transactionData: Record<string, unknown>):void{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    this.http.post('http://localhost:3000/transactions', transactionData, httpOptions)
      .subscribe();
  }
}
