import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    public webService: WebService
    ) { }

  public deleteTransaction(id: string): Observable<ApiTransactionResponse> {
    return this.webService.superDelete<ApiTransactionResponse>(ApiEndpoints.getDeletionPath(id));
  }

  public getTransactions(
    pageNumber = 1,
    pageSize = 3,
    sortColumn = 'id',
    sortOrder = 'ASC'): Observable<Transaction[]> {
    return this.webService.superGet<Transaction[]>(ApiEndpoints.getTransactionsPageablePath(
      pageNumber,
      pageSize,
      sortColumn,
      sortOrder));
  }

  public patchTransaction(updateObj: TransactionUpdateData): Observable<Transaction> {
    return this.webService.superPut<Transaction>(ApiEndpoints.TRANSACTIONS, updateObj);
  }

  public confirmTransaction(externalId: string, provider: string): Observable<Transaction> {
    return this.webService.superPost<Transaction>(ApiEndpoints.getConfirmationPath(externalId, provider), {});
  }
}
