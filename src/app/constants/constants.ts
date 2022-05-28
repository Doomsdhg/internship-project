import { Sort } from '@angular/material/sort';

class LocalStorageAccessors {

    static readonly LANGUAGE = 'language';
    static readonly PAGE_SIZE = 'pageSize';
    static readonly THEME = 'theme';
    static readonly TOKEN_EXPIRATION_DATE = 'tokenExpiration';
    static readonly TOKEN_CREATION_DATE = 'tokenCreated';
    static readonly TOKEN = 'jwt';
    static readonly REFRESH_TOKEN = 'refreshToken';
    static readonly USERNAME = 'username';
    static readonly AUTHENTICATED = 'authenticated';
    static readonly ERROR = 'error';
}

class LocalStorage {

    static readonly ACCESSORS = LocalStorageAccessors;
    static readonly DEFAULT_VALUE = '';
}

class PageableDefaults {

    static readonly PAGE_NUMBER = 0;
    static readonly PAGE_SIZE = 10;
    static readonly PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
    static readonly SORT_EVENT: Sort = {
        active: 'id',
        direction: 'asc'
    };
}

class SnackbarMessages {

    static readonly getErrorResponseMessage = (
        status: number,
        message: string) => 'status: ' + status + ', error: ' + message
}

class Snackbar {

    static readonly DURATION = 200000;
    static readonly ERROR_TYPE = 'error';
    static readonly SUCCESS_TYPE = 'success';
    static readonly CLASSNAME_POSTFIX = '-snackbar';
    static readonly MESSAGES = SnackbarMessages;
}

export class Constants {

    static readonly LOCAL_STORAGE = LocalStorage;
    static readonly PAGEABLE_DEFAULTS = PageableDefaults;
    static readonly SNACKBAR = Snackbar;
}
