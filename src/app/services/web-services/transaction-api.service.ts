import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor(private http: HttpClient) { }

  deleteTransaction(id: string | undefined): Observable<Object> {
    return this.http.delete(`${ApiEndpoints.TRANSACTIONS}${id}`)
  }

  getTransactions(): Observable<any> {
    return this.http.get(ApiEndpoints.TRANSACTIONS)
  }

  getDefiniteTransaction(id: string | null): Observable<any> {
    return this.http.get(`${ApiEndpoints.TRANSACTIONS}/${id}`)
  }

  patchTransaction(id: string | undefined, updateObj: Object): Observable<Object>{
    return this.http.patch(`${ApiEndpoints.TRANSACTIONS}${id}`, updateObj)
  }

  uploadTransaction(transactionData: Object):Observable<Object>{
    return this.http.post(ApiEndpoints.TRANSACTIONS, transactionData)
  }
}
