import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../constants/main.constants';
import { environment } from 'src/environments/environment';
import { Pageable } from 'src/app/modules/models/app.intr.Pageable.model';
import { Sortable } from 'src/app/modules/models/app.intr.Sortable.model';
import { Page } from 'src/app/modules/types/Page.type';
import { QueryPredicates } from 'src/app/modules/models/app.intr.QueryPredicates.model';
import {
  HttpClient,
  HttpResponse } from '@angular/common/http';
import {
  TransactionUpdateData,
  Transaction,
  ApiTransactionResponse } from 'src/app/modules/interfaces/app.intr.transactions.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor(
    public http: HttpClient
    ) { }

  deleteTransaction(id: string | undefined): Observable<ApiTransactionResponse> {
    return this.http.delete(`${environment.serverUrl}${Constants.API_ENDPOINTS.TRANSACTIONS}${id}`);
  }

  getTransactions(
    query: string[] | string = '',
    pageNumber = 1,
    pageSize = 3,
    sortColumn = 'id',
    sortOrder = 'ASC'): Observable<HttpResponse<Page<Transaction>>> {
    return this.http.get(`${environment.serverUrl}${Constants.API_ENDPOINTS.TRANSACTIONS
    }${new Pageable(new QueryPredicates(query), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString()}`
      , { observe: 'response' }) as Observable<HttpResponse<Page<Transaction>>>;
  }

  patchTransaction(updateObj: TransactionUpdateData): Observable<Transaction> {
    return this.http.put(`${environment.serverUrl}${Constants.API_ENDPOINTS.TRANSACTIONS}`, updateObj) as Observable<Transaction>;
  }

  uploadTransaction(transactionData: TransactionUpdateData): Observable<Transaction> {
    return this.http.post(`${environment.serverUrl}${Constants.API_ENDPOINTS.TRANSACTIONS}`, transactionData) as Observable<Transaction>;
  }

  confirmTransaction(externalId: string | undefined, provider: string | undefined): Observable<Transaction[]> {
    return this.http.post(`${environment.serverUrl}
    ${Constants.API_ENDPOINTS.TRANSACTIONS}?external_id=${externalId}&provider=${provider}`, {}) as Observable<Transaction[]>;
  }
}
