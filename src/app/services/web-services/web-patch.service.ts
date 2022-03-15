import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class WebPatchService {

  constructor(private http: HttpClient){}
  
  patchTransaction(id: string | undefined, updateObj: Object): Observable<Object>{
    return this.http.patch(`${ApiEndpoints.TRANSACTIONS}${id}`, updateObj)
  }
}
