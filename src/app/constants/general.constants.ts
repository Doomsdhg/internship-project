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
        PAGE_NUMBER: 0,
        PAGE_SIZE: 10,
        PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
        SORT_EVENT: {
            active: '',
            direction: 'asc' },
    };

    static readonly SNACKBAR = {
        DURATION: 200000,
        ERROR_TYPE: 'error',
        SUCCESS_TYPE: 'success',
        CLASSNAME_POSTFIX: '-snackbar',
        MESSAGES: {
            getNumbersLimitMessage: (
                translatedMessage: NumbersLimitMessage,
                digitsBeforeDecPoint: number,
                digitsAfterDecPoint: number) =>
                translatedMessage.start +
                digitsBeforeDecPoint +
                ' ' +
                translatedMessage.middle +
                ' ' +
                digitsAfterDecPoint +
                ' ' +
                translatedMessage.end
            ,
            getErrorResponseMessage: (
                status: number,
                message: string) =>  'status: ' + status + ', error: ' + message
        }
    };
}
