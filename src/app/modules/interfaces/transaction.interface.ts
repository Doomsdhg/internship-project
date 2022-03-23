export interface Amount {
  amount: number,
  currency: string
}

export interface Transaction {
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