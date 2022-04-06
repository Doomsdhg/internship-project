import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient
  ) { }

  login(): Observable<object> {
    return this.http.post(`${environment.serverUrl}${ApiEndpoints.LOGIN}`, {
      username: 'admin',
      password: 'admin'
    });
  }
}
