import { Transaction } from "src/app/interfaces/transactions.interface";

export class AppliedTransactionsListResponse {

    public value: Transaction[];

    constructor(value: Transaction[]) {
        this.value = value;
    }
}
