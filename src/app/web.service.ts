import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

const transactionsEndpoint = "http://localhost:3000/transactions";

@Injectable({
  providedIn: 'root'
})

export class WebService {

  constructor(private http: HttpClient){}

  httpOptions : Object = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  getTransactions(): Observable<any> {
    return this.http.get(transactionsEndpoint, {observe: 'body', responseType: 'json'})
  }

  deleteTransaction(id: string | undefined): Observable<Object> {
    return this.http.delete(`${transactionsEndpoint}/${id}`)
  }

  patchTransaction(id: string | undefined, updateObj: Object): Observable<Object>{
    return this.http.patch(`${transactionsEndpoint}/${id}`, updateObj, this.httpOptions)
  }

  uploadTransaction(transactionData: Object):Observable<Object>{
    return this.http.post(transactionsEndpoint, transactionData, this.httpOptions)
  }
}
