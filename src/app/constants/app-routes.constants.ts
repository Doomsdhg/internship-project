export class AppRoutes {

    static readonly TRANSACTIONS = 'transactions';
    static readonly AUTHENTICATION = 'auth';
    static readonly ERROR = 'error';
    static readonly UNKNOWN_ROUTE = '**';
    static readonly CODE_PARAM = 'code';

    static readonly getErrorPageRoute = (statusCode: number): string => {
        return `${this.ERROR}?${this.CODE_PARAM}=${statusCode}`;
    }
}
