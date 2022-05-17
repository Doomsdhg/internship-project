import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  TransactionUpdateData,
  Transaction,
  ApiTransactionResponse } from 'src/app/modules/interfaces/transactions.interface';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { BaseApiService } from './base-api.service';
import { LocalStorageManagerService } from '../local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService extends BaseApiService {

  constructor(
    public http: HttpClient,
    public localStorageManager: LocalStorageManagerService
    ) {
      super(http, localStorageManager);
     }

  public deleteTransaction(id: string): Observable<ApiTransactionResponse> {
    return this.delete<ApiTransactionResponse>(ApiEndpoints.getDeletionPath(id));
  }

  public getTransactions(
    pageNumber = 1,
    pageSize = 3,
    sortColumn = 'id',
    sortOrder = 'ASC'): Observable<Transaction[]> {
    return this.get<Transaction[]>(ApiEndpoints.getTransactionsPageableUrl(
      pageNumber,
      pageSize,
      sortColumn,
      sortOrder));
  }

  public patchTransaction(updateObj: TransactionUpdateData): Observable<Transaction> {
    return this.put<Transaction>(ApiEndpoints.TRANSACTIONS, updateObj);
  }

  public confirmTransaction(externalId: string, provider: string): Observable<Transaction> {
    return this.post<Transaction>(ApiEndpoints.getConfirmationPath(externalId, provider), {});
  }
}
