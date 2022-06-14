import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Row } from '../transactions-table/transactions-table.interfaces';

@Component({
  selector: 'intr-applied-transactions-list',
  templateUrl: './applied-transactions-list.component.html',
  styleUrls: ['./applied-transactions-list.component.scss']
})
export class AppliedTransactionsListComponent implements OnInit {

  public appliedTransactionsArray: Row[] = [];

  @Output() onDropEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {}

  public handleDrop = (event: CdkDragDrop<Row[]>): void => {
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
    this.onDropEvent.emit(true);
  }
}
