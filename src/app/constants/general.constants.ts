export class Constants {
    static readonly LOCAL_STORAGE_ACCESSORS = {
        LANGUAGE: 'language',
        PAGE_SIZE: 'pageSize',
        THEME: 'theme',
        TOKEN_EXPIRATION_DATE: 'tokenExpiration',
        TOKEN_CREATION_DATE: 'tokenCreated',
        TOKEN: 'jwt',
        REFRESH_TOKEN: 'refreshToken',
        USERNAME: 'username',
        AUTHENTICATED: 'authenticated',
    };
    static readonly PAGEABLE_DEFAULTS = {
        pageNumber: 0,
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        resultsSize: 0,
        sortEvent: { active: '', direction: 'asc' },
    };
    static readonly SNACKBAR = {
        DURATION: 200000,
        ERROR_TYPE: 'error',
        SUCCESS_TYPE: 'success',
        CLASSNAME_POSTFIX: '-snackbar',
    };
}
