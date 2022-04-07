export interface Amount {
  amount: number,
  currency: string
}

export interface Transaction extends Object {
  id: string,
  externalId: string,
  provider: string,
  amount: Amount,
  commissionAmount: Amount,
  user: string,
  additionalData?: string
}

export interface TransactionUpdateData {
  externalId: string,
  provider: string,
  amount: Amount,
  commissionAmount: Amount,
  user: string,
  additionalData?: string
}

export interface ApiTransactionResponse extends Object {
  error?: string
}

export interface TransactionCrudResponseError {
  timestamp: number,
  status: number,
  error: string
}