import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss']
})
export class TransactionRowComponent {

  @Input() externalId: string = "";
  @Input() username: string = "";
  @Input() amount: string = "";
  @Input() comissionAmount: string = "";
  @Input() provider: string = "";
}
