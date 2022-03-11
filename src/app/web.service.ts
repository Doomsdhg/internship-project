import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom, firstValueFrom } from 'rxjs';

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

  async getTransactionsObservable(): Promise<any> {
    const response =  this.http.get(`http://localhost:3000/transactions`, {observe: 'body', responseType: 'json'})
    const output = await lastValueFrom(response)
    return output
  }

  async deleteTransaction(id: string | undefined): Promise<void> {
    const response =  this.http.delete(`http://localhost:3000/transactions/${id}`)
    await lastValueFrom(response)
  }

  async patchTransaction(id: string | undefined, updateObj: Object): Promise<void>{
    const response =  this.http.patch(`http://localhost:3000/transactions/${id}`, updateObj, this.httpOptions)
    await lastValueFrom(response)
  }

  async uploadTransaction(transactionData: Object):Promise<void>{
    const response = this.http.post('http://localhost:3000/transactions', transactionData, this.httpOptions)
    await lastValueFrom(response);
  }
}
