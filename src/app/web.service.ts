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

  getTransactionsObservable(): Observable<Object> {
    const response =  this.http.get(`http://localhost:3000/transactions`, {observe: 'body', responseType: 'json'})
    return response
  }

  deleteTransaction(id: string | undefined): Observable<Object> {
    return this.http.delete(`http://localhost:3000/transactions/${id}`)
  }

  patchTransaction(id: string | undefined, updateObj: Object): Observable<Object>{
    return this.http.patch(`http://localhost:3000/transactions/${id}`, updateObj, this.httpOptions)
  }

  uploadTransaction(transactionData: Object):void{
    this.http.post('http://localhost:3000/transactions', transactionData, this.httpOptions)
      .subscribe();
  }
}
