import { environment } from 'src/environments/environment';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { Pageable } from '../modules/models/Pageable.model';
import { QueryPredicates } from '../modules/models/QueryPredicates.model';
import { Sortable } from '../modules/models/Sortable.model';

export class ApiEndpoints {
    static readonly BASE = environment.serverUrl;
    static readonly PRODUCTION_BASE = prodEnvironment.serverUrl;
    static readonly TRANSACTIONS = `${this.BASE || this.PRODUCTION_BASE}admin/transactions`;
    static readonly LOGIN = `${this.BASE || this.PRODUCTION_BASE}auth/login`;
    static readonly LOGOUT = `${this.BASE || this.PRODUCTION_BASE}auth/logout`;
    static readonly REFRESH = `${this.BASE || this.PRODUCTION_BASE}auth/refresh`;
    static readonly getConfirmationPath = (externalId: string, provider: string): string => {
        return `${this.TRANSACTIONS}?external_id=${externalId}&provider=${provider}`;
    }
    static readonly getDeletionPath = (id: string): string => {
        return `${ApiEndpoints.TRANSACTIONS}${id}`;
    }
    static readonly getTransactionsPageablePath = (
        pageNumber: number,
        pageSize: number,
        sortColumn: string,
        sortOrder: string): string => {
        return `${this.TRANSACTIONS}${new Pageable(new QueryPredicates(), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString()}`;
    }
}
