import { Row, TransactionOperation } from '../transactions-table.interfaces';

export class ManageTransactionRequiredData {

  operationType: TransactionOperation;

  rowData?: Row;

  constructor(operationType: TransactionOperation, rowData?: Row) {
    this.operationType = operationType;
    this.rowData = rowData;
  }
}
