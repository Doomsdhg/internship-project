import { CdkDropList } from '@angular/cdk/drag-drop';
import { Transaction } from 'src/app/interfaces/transactions.interface';

export interface AppliedTransactionsListResponse {
  value: Transaction[];
}

export interface HandleDropRequiredData {
  isPointerOverContainer: boolean;
  currentIndex: number;
  previousIndex: number;
  container: CdkDropList;
  previousContainer: CdkDropList;
}
