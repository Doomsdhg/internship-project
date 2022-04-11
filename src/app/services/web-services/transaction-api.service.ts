import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';
import { TransactionUpdateData, Transaction, ApiTransactionResponse } from 'src/app/modules/interfaces/transactions.interface';
import { Pageable } from 'src/app/modules/models/Pageable.model';
import { Sortable } from 'src/app/modules/models/Sortable.model';
import { Page } from 'src/app/modules/types/Page.type';
import { QueryPredicates } from 'src/app/modules/models/QueryPredicates.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor(private http: HttpClient) { }

  deleteTransaction(id: string | undefined): Observable<ApiTransactionResponse> {
    return this.http.delete(`${environment.serverUrl}${ApiEndpoints.TRANSACTIONS}${id}`);
  }

  getTransactions(query: string[] | string, pageNumber: number, pageSize: number, sortColumn: string, sortOrder: string): Observable<HttpResponse<Page<Transaction>>> {
    console.log(new Pageable(new QueryPredicates(query), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString());
    return this.http.get(`${environment.serverUrl}${ApiEndpoints.TRANSACTIONS}${new Pageable(new QueryPredicates(query), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString()}`
      , { observe: 'response'}) as Observable<HttpResponse<Page<Transaction>>>;
  }

  getDefiniteTransaction(id: string | null): Observable<Transaction> {
    return this.http.get(`${environment.serverUrl}${ApiEndpoints.TRANSACTIONS}/${id}`) as Observable<Transaction>;
  }

  patchTransaction(id: string | undefined, updateObj: TransactionUpdateData): Observable<Transaction> {
    return this.http.patch(`${environment.serverUrl}${ApiEndpoints.TRANSACTIONS}${id}`, updateObj) as Observable<Transaction>;
  }

  uploadTransaction(transactionData: TransactionUpdateData): Observable<Transaction> {
    return this.http.post(`${environment.serverUrl}${ApiEndpoints.TRANSACTIONS}`, transactionData) as Observable<Transaction>;
  }

  searchTransactions(name: string, value: string | number): Observable<Transaction[]> {
    return this.http.get(`${environment.serverUrl}${ApiEndpoints.TRANSACTIONS}?${name}=${value}`) as Observable<Transaction[]>;
  }

  confirmTransaction(externalId: string | undefined, provider: string | undefined): Observable<Transaction[]> {
    return this.http.post(`${environment.serverUrl}${ApiEndpoints.TRANSACTIONS}?external_id=${externalId}&provider=${provider}`, {}) as Observable<Transaction[]>;
  }
}
