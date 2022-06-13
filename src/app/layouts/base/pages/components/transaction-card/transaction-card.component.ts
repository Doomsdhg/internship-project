import { Component, Input, OnInit } from '@angular/core';
import { Row } from '../transactions-table/transactions-table.interfaces';

@Component({
  selector: 'intr-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent implements OnInit {

  @Input() transaction!: Row;

  @Input() index!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
