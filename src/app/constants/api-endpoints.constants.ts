import { environment } from 'src/environments/environment';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { Pageable } from '../modules/models/Pageable.model';
import { QueryPredicates } from '../modules/models/QueryPredicates.model';
import { Sortable } from '../modules/models/Sortable.model';

export class ApiEndpoints {

    static readonly BASE_URL = environment.serverUrl;
    static readonly PRODUCTION_BASE_URL = prodEnvironment.serverUrl;
    static readonly TRANSACTIONS = `${this.BASE_URL || this.PRODUCTION_BASE_URL}admin/transactions`;
    static readonly LOGIN = `${this.BASE_URL || this.PRODUCTION_BASE_URL}auth/login`;
    static readonly LOGOUT = `${this.BASE_URL || this.PRODUCTION_BASE_URL}auth/logout`;
    static readonly REFRESH = `${this.BASE_URL || this.PRODUCTION_BASE_URL}auth/refresh`;

    static readonly getConfirmationUrl =
    (externalId: string, provider: string): string => `${this.TRANSACTIONS}?external_id=${externalId}&provider=${provider}`

    static readonly getDeletionUrl = (id: string): string =>  `${ApiEndpoints.TRANSACTIONS}${id}`;

    static readonly getTransactionsPageableUrl = (
        pageNumber: number,
        pageSize: number,
        sortColumn: string,
        sortOrder: string
        ): string => `${this.TRANSACTIONS}${new Pageable(new QueryPredicates(), pageNumber, pageSize, new Sortable(sortColumn, sortOrder)).toString()}`
}
