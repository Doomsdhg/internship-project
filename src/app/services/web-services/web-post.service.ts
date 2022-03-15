import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class WebPostService {

  constructor(private http: HttpClient){}
  
  uploadTransaction(transactionData: Object):Observable<Object>{
    return this.http.post(ApiEndpoints.TRANSACTIONS, transactionData)
  }
}
