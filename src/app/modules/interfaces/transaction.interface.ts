export interface Amount {
  amount: number,
  currency: string
}

export interface Transaction extends Object {
  id: string,
  externalId: string,
  provider: string,
  amount: Amount,
  comissionAmount: Amount,
  username: string,
  additionalData?: string
}

export interface TransactionUpdateData {
  externalId: string,
  provider: string,
  amount: Amount,
  comissionAmount: Amount,
  username: string,
  additionalData?: string
}

export interface ApiTransactionResponse extends Object {
  error?: string
}