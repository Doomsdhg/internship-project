import { Transaction } from "src/app/interfaces/transactions.interface";
import { Row } from "../pages/components/transactions-table/transactions-table.interfaces";

export class TransactionDto {

    public index?: number;
    public provider: string;
    public user: string;
    public externalId: string;
    public status: string;
    public amount: string;
    public commissionAmount: string;

    constructor (transactionData: Transaction | Row, index?: number) {
        this.index = index;
        this.provider = transactionData.provider;
        this.user = transactionData.user;
        this.externalId = transactionData.externalId;
        this.status = transactionData.status;
        this.amount = transactionData.amount.amount + ' ' + transactionData.amount.currency;
        this.commissionAmount = transactionData.commissionAmount.amount + ' ' + transactionData.commissionAmount.currency;
    }
}