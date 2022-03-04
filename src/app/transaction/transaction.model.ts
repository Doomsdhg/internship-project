import {amountInterface} from '../web.service';

export class TransactionModule {
  public id!: number
  public externalId!: string
  public amount!: amountInterface
  public comissionAmount!: amountInterface
  public provider!: string
  public username!: string
  public additionalData!: string

  constructor(id: number, externalId: string, amount: amountInterface, comissionAmount: amountInterface,
    provider: string, username: string, additionalData: string){
    this.id = id;
    this.externalId = externalId;
    this.amount = amount;
    this.comissionAmount = comissionAmount;
    this.provider = provider;
    this.username = username;
    this.additionalData = additionalData;
  }

 }
