import { NumbersLimitMessage } from '../modules/directives/directives.interface';

export class Constants {

    static readonly LOCAL_STORAGE = {
        ACCESSORS: {
            LANGUAGE: 'language',
            PAGE_SIZE: 'pageSize',
            THEME: 'theme',
            TOKEN_EXPIRATION_DATE: 'tokenExpiration',
            TOKEN_CREATION_DATE: 'tokenCreated',
            TOKEN: 'jwt',
            REFRESH_TOKEN: 'refreshToken',
            USERNAME: 'username',
            AUTHENTICATED: 'authenticated'
        },
        DEFAULT_VALUE: ''
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
        MESSAGES: {
            GET_NUMBERS_LIMIT_MESSAGE: (
                translatedMessage: NumbersLimitMessage,
                digitsBeforeDecPoint: number,
                digitsAfterDecPoint: number) => {
                return translatedMessage.start +
                digitsBeforeDecPoint +
                ' ' +
                translatedMessage.middle +
                ' ' +
                digitsAfterDecPoint +
                ' ' +
                translatedMessage.end;
            },
            GET_ERROR_RESPONSE_MESSAGE: (
                status: number,
                message: string) => {
                    return 'status: ' + status + ', error: ' + message;
            }
        }
    };
}
