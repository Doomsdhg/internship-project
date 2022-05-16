import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTransactionResponse, TransactionUpdateData } from 'src/app/modules/interfaces/transactions.interface';

@Injectable({
  providedIn: 'root'
})
export class WebService extends HttpClient {

  public superGet<T>(path: string): Observable<T> {
    return this.get<T>(path);
  }

  public superPost<T>(path: string, data: TransactionUpdateData | Object): Observable<T> {
    return this.post<T>(path, data);
  }

  public superPut<T>(path: string, updateData: TransactionUpdateData): Observable<T> {
    return this.put<T>(path, updateData);
  }

  public superDelete<T>(path: string): Observable<ApiTransactionResponse> {
    return this.delete<T>(path);
  }
}
