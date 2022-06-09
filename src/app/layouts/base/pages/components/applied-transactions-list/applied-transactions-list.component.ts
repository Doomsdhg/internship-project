import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Row } from '../transactions-table/transactions-table.interfaces';

@Component({
  selector: 'intr-applied-transactions-list',
  templateUrl: './applied-transactions-list.component.html',
  styleUrls: ['./applied-transactions-list.component.scss']
})
export class AppliedTransactionsListComponent implements OnInit {

  public appliedTransactionsArray: Row[] = [{
    displayForms: false,
    provider: 'qiwi',
    user: 'test user',
    externalId: 'qwe123',
    status: 'INITIAL',
    amount: {
      amount: 100,
      currency: 'USD'
    },
    commissionAmount: {
      amount: 10,
      currency: 'USD'
    },
    additionalData: 'qwe',
    id: '123'
  }];

  constructor() { }

  ngOnInit(): void {
  }

  public handleDrop = (event: CdkDragDrop<Row[]>): void => {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
