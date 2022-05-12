import { environment } from 'src/environments/environment';

export class ApiEndpoints {
    static readonly TRANSACTIONS = `${environment.serverUrl}admin/transactions`;
    static readonly LOGIN = `${environment.serverUrl}auth/login`;
    static readonly LOGOUT = `${environment.serverUrl}auth/logout`;
    static readonly REFRESH = `${environment.serverUrl}auth/refresh`;
}
