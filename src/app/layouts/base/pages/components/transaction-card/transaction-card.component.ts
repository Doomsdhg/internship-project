import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Row } from '../transactions-table/transactions-table.interfaces';

@Component({
  selector: 'intr-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionCardComponent {

  @Input() transaction!: Row;

  @Input() index!: number;

  public get indexExists(): boolean {
    if (this.index || this.index === 0) {
      return true
    } else {
      return false
    }
  }
}
