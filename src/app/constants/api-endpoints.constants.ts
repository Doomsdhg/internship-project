import { environment } from 'src/environments/environment';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { Pageable } from '../modules/models/Pageable.model';
import { QueryPredicates } from '../modules/models/QueryPredicates.model';
import { Sortable } from '../modules/models/Sortable.model';

export class ApiEndpoints {
    static readonly TRANSACTIONS = `${environment.serverUrl || prodEnvironment.serverUrl}admin/transactions`;
    static readonly LOGIN = `${environment.serverUrl || prodEnvironment.serverUrl}auth/login`;
    static readonly LOGOUT = `${environment.serverUrl || prodEnvironment.serverUrl}auth/logout`;
    static readonly REFRESH = `${environment.serverUrl || prodEnvironment.serverUrl}auth/refresh`;
    static readonly getConfirmationPath = (externalId: string, provider: string): string => {
        return `${this.TRANSACTIONS}?external_id=${externalId}&provider=${provider}`;
    }
    static readonly getDeletionPath = (id: string): string => {
        return `${ApiEndpoints.TRANSACTIONS}${id}`;
    }
    static readonly getTransactionsPageablePath = (
        query: string | string[],
        pageNumber: number,
        pageSize: number,
        sortColumn: string,
        sortOrder: string): string => {
        return `${this.TRANSACTIONS}${new Pageable(new QueryPredicates(query), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString()}`;
    }
}
