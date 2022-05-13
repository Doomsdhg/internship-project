import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/modules/types/Page.type';
import {
  HttpClient,
  HttpResponse } from '@angular/common/http';
import {
  TransactionUpdateData,
  Transaction,
  ApiTransactionResponse } from 'src/app/modules/interfaces/transactions.interface';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor(
    public http: HttpClient,
    public web: WebService
    ) { }

  public deleteTransaction(id: string): Observable<ApiTransactionResponse> {
    return this.http.delete(ApiEndpoints.getDeletionPath(id));
  }

  public getTransactions(
    query: string[] | string = '',
    pageNumber = 1,
    pageSize = 3,
    sortColumn = 'id',
    sortOrder = 'ASC'): Observable<HttpResponse<Page<Transaction>>> {
    return this.web.fetchTransactions(ApiEndpoints.getTransactionsPageablePath(query, pageNumber, pageSize, sortColumn, sortOrder));
  }

  public patchTransaction(updateObj: TransactionUpdateData): Observable<Transaction> {
    return this.http.put(ApiEndpoints.TRANSACTIONS, updateObj) as Observable<Transaction>;
  }

  public uploadTransaction(transactionData: TransactionUpdateData): Observable<Transaction> {
    return this.http.post(ApiEndpoints.TRANSACTIONS, transactionData) as Observable<Transaction>;
  }

  public confirmTransaction(externalId: string, provider: string): Observable<Transaction[]> {
    return this.http.post(ApiEndpoints.getConfirmationPath(externalId, provider),
       {}) as Observable<Transaction[]>;
  }
}
