import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';
import { TransactionUpdateData } from 'src/app/modules/interfaces/transaction.interface';

interface ApiTransactionResponse extends Object, Response {
  error?: string
}

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor(private http: HttpClient) { }

  deleteTransaction(id: string | undefined): Observable<object> {
    return this.http.delete(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}${id}`)
  }

  getTransactions(): Observable<any> {
    return this.http.get(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}`)
  }

  getDefiniteTransaction(id: string | null): Observable<any> {
    return this.http.get(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}/${id}`)
  }

  patchTransaction(id: string | undefined, updateObj: TransactionUpdateData): Observable<any>{
    return this.http.patch(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}${id}`, updateObj)
  }

  uploadTransaction(transactionData: TransactionUpdateData):Observable<any>{
    return this.http.post(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}`, transactionData)
  }

  searchTransactions(name: string, value: string | number): Observable<any> {
    return this.http.get(`${environment.appUrl}${ApiEndpoints.TRANSACTIONS}?${name}=${value}`)
  }
}
