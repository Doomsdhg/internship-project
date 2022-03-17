import { transactionInterface, amountInterface } from "./interfaces/transaction.interface";

export class Transaction {

    public id: string;
    public externalId: string;
    public provider: string;
    public amount: amountInterface;
    public comissionAmount: amountInterface;
    public username: string;
    public additionalData: string;

    constructor (response: transactionInterface) {
        this.id = response.id
        this.externalId = response.externalId
        this.provider = response.provider
        this.amount = response.amount
        this.comissionAmount = response.comissionAmount
        this.username = response.username
        this.additionalData = response.additionalData || ''
    }

    
}