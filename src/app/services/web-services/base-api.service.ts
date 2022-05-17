import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiTransactionResponse, TransactionUpdateData } from 'src/app/modules/interfaces/transactions.interface';

export abstract class BaseApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public get<T>(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(url, {headers, params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  public post<T>(url: string, data: TransactionUpdateData | Object, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    return this.httpClient.post<T>(url, data, {headers, params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  public put<T>(url: string, updateData: TransactionUpdateData, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    return this.httpClient.put<T>(url, updateData, {headers, params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  public delete<T>(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<ApiTransactionResponse> {
    return this.httpClient.delete<T>(url, {headers, params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message));
  }
}
