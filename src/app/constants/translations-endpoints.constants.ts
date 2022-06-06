class Snackbar {

    static readonly SNACKBAR_TRANSLATIONS_CONTAINER = 'snackbar';
    static readonly TRANSACTION_UPDATED = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.transactionUpdated`;
    static readonly INPUT_ISSUES = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.inputIssues`;
    static readonly SERVER_ERROR = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.serverError`;
    static readonly TRANSACTION_ADDED = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.transactionAdded`;
    static readonly TRANSACTION_DELETED = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.transactionDeleted`;
    static readonly NUMBERS_ONLY_ERROR = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.numbersOnlyError`;
    static readonly NUMBERS_LIMITED = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.numbersLimited`;
    static readonly UNIQUE = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.unique`;
    static readonly TRANSACTION_COMPLETED = `${this.SNACKBAR_TRANSLATIONS_CONTAINER}.transactionCompleted`;
}

class ErrorPage {

    static readonly ERRORS_TRANSLATIONS_CONTAINER = 'errors';
    static readonly TITLE = 'title';
    static readonly MESSAGE = 'message';

    static readonly getErrorHeadlineEndpoint = (errorCode: number): string => {
        return `${this.ERRORS_TRANSLATIONS_CONTAINER}.${errorCode}.${this.TITLE}`;
    }

    static readonly getErrorMessageEndpoint = (errorCode: number): string => {
        return `${this.ERRORS_TRANSLATIONS_CONTAINER}.${errorCode}.${this.MESSAGE}`;
    }
}

export class TranslationsEndpoints {

    static readonly SNACKBAR = Snackbar;
    static readonly ERROR_PAGE = ErrorPage;
}
