import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';
import { TransactionUpdateData, Transaction, ApiTransactionResponse } from 'src/app/modules/interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor(private http: HttpClient) { }

  deleteTransaction(id: string | undefined): Observable<ApiTransactionResponse> {
    return this.http.delete(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}${id}`)
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}`) as Observable<Transaction[]>
  }

  getDefiniteTransaction(id: string | null): Observable<Transaction> {
    return this.http.get(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}/${id}`) as Observable<Transaction> 
  }

  patchTransaction(id: string | undefined, updateObj: TransactionUpdateData): Observable<Transaction>{
    return this.http.patch(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}${id}`, updateObj) as Observable<Transaction> 
  }

  uploadTransaction(transactionData: TransactionUpdateData):Observable<Transaction>{
    return this.http.post(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}`, transactionData) as Observable<Transaction> 
  }

  searchTransactions(name: string, value: string | number): Observable<Transaction[]> {
    return this.http.get(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}?${name}=${value}`) as Observable<Transaction[]>
  }
}
