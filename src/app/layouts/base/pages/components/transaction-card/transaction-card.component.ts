import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionDto } from '../../../classes/transaction-dto.class';

@Component({
  selector: 'intr-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionCardComponent {

  @Input() transaction!: TransactionDto;

  @Output() readonly deleteCardEvent = new EventEmitter<number>();

  public get indexisDefined(): boolean {
    if (this.transaction.index || this.transaction.index === 0) {
      return true;
    } else {
      return false;
    }
  }

  public deleteCard(): void {
    this.deleteCardEvent.emit(this.transaction.index);
  }
}
