import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { Constants } from 'src/app/constants/constants';
import {
  ApiTransactionResponse, Transaction, TransactionUpdateData
} from 'src/app/interfaces/transactions.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService extends BaseApiService {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  public deleteTransaction(id: string): Observable<ApiTransactionResponse> {
    return this.delete<ApiTransactionResponse>(ApiEndpoints.TRANSACTIONS.getDeletionUrl(id));
  }

  public getTransactions(
    pageNumber = Constants.PAGEABLE_DEFAULTS.PAGE_NUMBER,
    pageSize = Constants.PAGEABLE_DEFAULTS.PAGE_SIZE,
    sortColumn = Constants.PAGEABLE_DEFAULTS.SORT_EVENT.active,
    sortOrder = Constants.PAGEABLE_DEFAULTS.SORT_EVENT.direction
  ): Observable<Transaction[]> {
    return this.get<Transaction[]>(ApiEndpoints.TRANSACTIONS.getPageableGettingUrl(pageNumber, pageSize, sortColumn, sortOrder));
  }

  public patchTransaction(updateObj: TransactionUpdateData): Observable<Transaction> {
    return this.put<Transaction>(ApiEndpoints.TRANSACTIONS.BASE_GETTING_URL, updateObj);
  }

  public confirmTransaction(externalId: string, provider: string): Observable<Transaction> {
    return this.post<Transaction>(ApiEndpoints.TRANSACTIONS.getConfirmationUrl(externalId, provider), {});
  }

  public uploadTransaction(updateData: TransactionUpdateData): Observable<Transaction> {
    return this.post<Transaction>('http://localhost:8081/transactions?trace=true', {
      id: 12345,
      externalId: 'string',
      provider: 'string',
      status: 'INITIAL',
      amount: {
        amount: 10,
        currency: 'string'
      },
      commissionAmount: {
        amount: 1,
        currency: 'string'
      },
      user: 'string',
      additionalData: 'string'
    });
  }
}
