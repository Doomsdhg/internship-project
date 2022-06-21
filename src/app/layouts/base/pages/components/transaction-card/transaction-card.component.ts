import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TransactionDto } from '../../../classes/transaction-dto.class';

@Component({
  selector: 'intr-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionCardComponent {

  @Input() transaction!: TransactionDto;

  @Output() readonly deleteCardEvent = new EventEmitter<number>();

  public get indexIsDefined(): boolean {
    return this.transaction.index !== undefined;
  }

  public deleteCard(): void {
    this.deleteCardEvent.emit(this.transaction.index);
  }
}
