import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebGetService } from 'src/app/services/web-services/web-get.service';
import { transactionInterface } from 'src/app/models/interfaces/transaction.interface';
import { Transaction } from 'src/app/models/transactionInfo.model';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionPageComponent implements OnInit {

  @Input()
  transactionInfo: transactionInterface = 
  {
    id: '',
    externalId: '',
    provider: '',
    amount: {
      amount: 0,
      currency: ''
    },
    comissionAmount: {
      amount: 0,
      currency: ''
    },
    username: '',
    additionalData: ''
  };

  private id!: string | null;

  constructor(private route: ActivatedRoute, private web: WebGetService, private cdr: ChangeDetectorRef, translateService: TranslateService) { }

  ngOnInit(): void {
    this.getTransactionInfo()
  }

  getTransactionInfo(): void{
    this.id = this.route.snapshot.paramMap.get('id')
    this.web.getDefiniteTransaction(this.id).subscribe((success: transactionInterface)=>{
      this.transactionInfo = new Transaction(success);
      this.cdr.detectChanges()
    })
  }

}
