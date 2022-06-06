import { environment } from 'src/environments/environment';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { Pageable } from '../services/models/Pageable.model';
import { QueryPredicates } from '../services/models/QueryPredicates.model';
import { Sortable } from '../services/models/Sortable.model';

class Base {

    static readonly URL = environment.serverUrl || prodEnvironment.serverUrl;
}

class Transactions {

    static readonly BASE = Base.URL;
    static readonly TRANSACTIONS_ADMIN = `${this.BASE}admin/transactions`;
    static readonly TRANSACTIONS_CORE = `${this.BASE}transactions`;

    static readonly getConfirmationUrl =
        (externalId: string, provider: string): string => `${this.TRANSACTIONS_ADMIN}?external_id=${externalId}&provider=${provider}`

    static readonly getDeletionUrl = (id: string): string => `${this.TRANSACTIONS_ADMIN}${id}`;

    static readonly getPageableGettingUrl = (
        pageNumber: number,
        pageSize: number,
        sortColumn: string,
        sortOrder: string
    ): string => `${this.TRANSACTIONS_ADMIN}${new Pageable(new QueryPredicates(), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString()}`
}

class AuthEndpoints {

    static readonly BASE = `${Base.URL}auth`;
    static readonly LOGIN = `${AuthEndpoints.BASE}/login`;
    static readonly LOGOUT = `${AuthEndpoints.BASE}/logout`;
    static readonly REFRESH_TOKEN = `${AuthEndpoints.BASE}/refresh`;
}

export class ApiEndpoints {
    static readonly AUTH_ENDPOINTS = AuthEndpoints;
    static readonly TRANSACTIONS = Transactions;
}
