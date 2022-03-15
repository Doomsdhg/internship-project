export interface amountInterface {
    amount: number,
    currency: string
  }
  
  export interface transactionInterface {
    id: string,
    externalId: number,
    provider: string,
    amount: amountInterface,
    currencyAmount: amountInterface,
    username: string,
    additionalData?: string
  }