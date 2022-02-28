import { InMemoryDbService } from 'angular-in-memory-web-api';
import transactions,* as transactionsData from './transactions.json';


export class InMemoryDataService implements InMemoryDbService {
  async createDb() {
    // const transactions = await JSON.parse(JSON.stringify(transactionsData));
    // return {transactions}
    const transactions = [
      {externalId: "1", provider: "paypal", amount: "1337", comissionAmount: "133", username: "Ivan"},
      {externalId: "2", provider: "paypal", amount: "10", comissionAmount: "1", username: "Andrey"},
      {externalId: "3", provider: "paypal", amount: "234", comissionAmount: "23", username: "Konstantin"},
      {externalId: "4", provider: "qiwi", amount: "555", comissionAmount: "55", username: "Alexey"},
      {externalId: "5", provider: "qiwi", amount: "321", comissionAmount: "32", username: "Alexandr"},
      {externalId: "6", provider: "paypal", amount: "1000", comissionAmount: "100", username: "Dmitriy"},
      {externalId: "7", provider: "qiwi", amount: "145", comissionAmount: "14", username: "Vladimir"},
      {externalId: "8", provider: "qiwi", amount: "273", comissionAmount: "27", username: "Anna"},
      {externalId: "9", provider: "qiwi", amount: "12", comissionAmount: "1", username: "Anastasiya"}
  ]
    return {transactions}
  }
}