import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class WebGetService {

  constructor(private http: HttpClient){}

  getTransactions(): Observable<any> {
    return this.http.get(ApiEndpoints.TRANSACTIONS)
  }

  getDefiniteTransaction(id: string | null): Observable<any> {
    return this.http.get(`${ApiEndpoints.TRANSACTIONS}/${id}`)
  }
}
