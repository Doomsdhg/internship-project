export interface amountInterface {
    amount: number,
    currency: string
  }
  
  export interface transactionInterface {
    id: string,
    externalId: string,
    provider: string,
    amount: amountInterface,
    comissionAmount: amountInterface,
    username: string,
    additionalData?: string
  }