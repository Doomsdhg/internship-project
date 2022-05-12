import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../constants/main.constants';
import { environment } from 'src/environments/environment';
import { Pageable } from 'src/app/modules/models/Pageable.model';
import { Sortable } from 'src/app/modules/models/Sortable.model';
import { Page } from 'src/app/modules/types/Page.type';
import { QueryPredicates } from 'src/app/modules/models/QueryPredicates.model';
import {
  HttpClient,
  HttpResponse } from '@angular/common/http';
import {
  TransactionUpdateData,
  Transaction,
  ApiTransactionResponse } from 'src/app/modules/interfaces/transactions.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor(
    public http: HttpClient
    ) { }

  public deleteTransaction(id: string | undefined): Observable<ApiTransactionResponse> {
    return this.http.delete(`${Constants.API_ENDPOINTS.TRANSACTIONS}${id}`);
  }

  public getTransactions(
    query: string[] | string = '',
    pageNumber = 1,
    pageSize = 3,
    sortColumn = 'id',
    sortOrder = 'ASC'): Observable<HttpResponse<Page<Transaction>>> {
    return this.http.get(`${Constants.API_ENDPOINTS.TRANSACTIONS
    }${new Pageable(new QueryPredicates(query), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString()}`
      , { observe: 'response' }) as Observable<HttpResponse<Page<Transaction>>>;
  }

  public patchTransaction(updateObj: TransactionUpdateData): Observable<Transaction> {
    return this.http.put(Constants.API_ENDPOINTS.TRANSACTIONS, updateObj) as Observable<Transaction>;
  }

  public uploadTransaction(transactionData: TransactionUpdateData): Observable<Transaction> {
    return this.http.post(Constants.API_ENDPOINTS.TRANSACTIONS, transactionData) as Observable<Transaction>;
  }

  public confirmTransaction(externalId: string | undefined, provider: string | undefined): Observable<Transaction[]> {
    return this.http.post(`${Constants.API_ENDPOINTS.TRANSACTIONS}?external_id=${externalId}&provider=${provider}`,
       {}) as Observable<Transaction[]>;
  }
}
