import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class WebDeleteService {

  constructor(private http: HttpClient){}
  
  deleteTransaction(id: string | undefined): Observable<Object> {
    return this.http.delete(`${ApiEndpoints.TRANSACTIONS}${id}`)
  }
}
