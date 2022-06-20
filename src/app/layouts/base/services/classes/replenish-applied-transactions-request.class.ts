import { Transaction } from 'src/app/interfaces/transactions.interface';

export class AppliedTransactionsReplenishRequest {
  public value: Transaction[];

  constructor(value: Transaction[]) {
    this.value = value;
  }
}
