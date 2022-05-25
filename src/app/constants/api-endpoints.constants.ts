import { environment } from 'src/environments/environment';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { Pageable } from '../services/models/Pageable.model';
import { QueryPredicates } from '../services/models/QueryPredicates.model';
import { Sortable } from '../services/models/Sortable.model';

class Base {

    static readonly URL = environment.serverUrl || prodEnvironment.serverUrl;
}

class TransactionsEndpoints {

    static readonly BASE_GETTING_URL = `${Base.URL}admin/transactions`;

    static readonly getConfirmationUrl =
        (externalId: string, provider: string): string => `${this.BASE_GETTING_URL}?external_id=${externalId}&provider=${provider}`

    static readonly getDeletionUrl = (id: string): string => `${this.BASE_GETTING_URL}${id}`;

    static readonly getPageableGettingUrl = (
        pageNumber: number,
        pageSize: number,
        sortColumn: string,
        sortOrder: string
    ): string => `${this.BASE_GETTING_URL}${new Pageable(new QueryPredicates(), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString()}`
}

class AuthEndpoints {
    static readonly BASE = `${Base.URL}auth`;
    static readonly LOGINNING_URL = `${AuthEndpoints.BASE}/login`;
    static readonly LOGOUTTING_URL = `${AuthEndpoints.BASE}/logout`;
    static readonly TOKEN_REFRESHMENT_URL = `${AuthEndpoints.BASE}/refresh`;
}

export class ApiEndpoints {
    static readonly AUTH_ENDPOINTS = AuthEndpoints;
    static readonly TRANSACTIONS = TransactionsEndpoints;
}
