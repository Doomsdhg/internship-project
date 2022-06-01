import { Amount } from 'src/app/interfaces/transactions.interface';

export interface Column {
    id: string;
    value: string;
}

export interface Row {
    displayForms: boolean;
    provider: string;
    user: string;
    externalId: string;
    status: string;
    amount: Amount;
    commissionAmount: Amount;
    additionalData: string;
    id: string;
}

export interface Sorted {
    externalId?: boolean;
    provider?: boolean;
    status?: boolean;
    amount?: boolean;
    commissionAmount?: boolean;
    user?: boolean;
    default?: boolean;
}

export interface Translations {
    'displayedColumns.externalId': string;
    'displayedColumns.provider': string;
    'displayedColumns.status': string;
    'displayedColumns.amount': string;
    'displayedColumns.commissionAmount': string;
    'displayedColumns.user': string;
    'displayedColumns.actions': string;
}
