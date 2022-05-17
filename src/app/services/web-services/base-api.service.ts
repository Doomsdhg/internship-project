import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiTransactionResponse, TransactionUpdateData } from 'src/app/modules/interfaces/transactions.interface';
import { LocalStorageManagerService } from '../local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {

  private headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.localStorageManagerService.getAuthenticationInfo()?.token}`});

  constructor(
    private httpClient: HttpClient,
    private localStorageManagerService: LocalStorageManagerService
  ) {}

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(
      url,
      {headers: this.headers})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  public post<T>(url: string, data: TransactionUpdateData | Object): Observable<T> {
    return this.httpClient.post<T>(
      url,
      data,
      {headers: this.headers})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  public put<T>(url: string, updateData: TransactionUpdateData): Observable<T> {
    return this.httpClient.put<T>(
      url,
      updateData,
      {headers: this.headers})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  public delete<T>(url: string): Observable<ApiTransactionResponse> {
    return this.httpClient.delete<T>(
      url,
      {headers: this.headers})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }
}
