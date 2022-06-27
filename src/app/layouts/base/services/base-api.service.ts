import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {
  ApiTransactionResponse,
  TransactionCreationData,
  TransactionUpdateData,
} from 'src/app/interfaces/transactions.interface';
import { AppliedTransactionsListResponse } from '../pages/components/applied-transactions-list/applied-transactions-list.interfaces';
import { NotificationDto } from '../pages/components/notifications-dialog/notifications-dialog.interfaces';
import { ReplenishNotViewedAmountRequest } from './classes/replenish-notifications-amount.class';
import { NotificationsReplenishRequest } from './classes/replenish-notifications.class';

export abstract class BaseApiService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(
    url: string,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    return this.httpClient
      .get<T>(url, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  public post<T>(
    url: string,
    data: TransactionUpdateData | TransactionCreationData | {},
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    return this.httpClient
      .post<T>(url, data, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  public put<T>(
    url: string,
    updateData: TransactionUpdateData | AppliedTransactionsListResponse | NotificationsReplenishRequest,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    return this.httpClient
      .put<T>(url, updateData, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  public patch<T>(
    url: string,
    updateData: ReplenishNotViewedAmountRequest,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    return this.httpClient
      .patch<T>(url, updateData, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  public delete<T>(
    url: string,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<ApiTransactionResponse> {
    return this.httpClient
      .delete<T>(url, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message));
  }
}
