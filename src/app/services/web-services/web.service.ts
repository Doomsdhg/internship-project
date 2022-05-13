import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/modules/interfaces/transactions.interface';
import { Page } from 'src/app/modules/types/Page.type';

@Injectable({
  providedIn: 'root'
})
export class WebService extends HttpClient {

  public fetchTransactions(path: string): Observable<HttpResponse<Page<Transaction>>> {
    return this.get(path) as Observable<HttpResponse<Page<Transaction>>>;
  }
}
