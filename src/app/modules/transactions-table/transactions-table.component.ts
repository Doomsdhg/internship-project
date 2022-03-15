import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { WebGetService } from '../../services/web-services/web-get.service';
import { WebDeleteService } from 'src/app/services/web-services/web-delete.service';
import { WebPatchService } from 'src/app/services/web-services/web-patch.service';
import { transactionInterface, amountInterface } from 'src/app/models/interfaces/transaction.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionsDataSource } from '../../services/transactions-data-source.service';

interface column extends Object {
  id: string,
  value: string
}

interface row extends Object {
  displayForms: boolean,
  provider: string,
  username: string,
  externalId: string,
  amount: amountInterface,
  comissionAmount: amountInterface,
  additionalData: string,
  id: string
}

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsTableComponent implements OnInit{

  @Input() transactionsArray: BehaviorSubject<transactionInterface[]> = new BehaviorSubject<transactionInterface[]>([]);
  
  @Input() transactionUpdateForm!: FormGroup;

  @Output() getRefreshedTransactions: EventEmitter<any> = new EventEmitter();

  formsToggled: boolean = false;

  displayEditForms: boolean = false;

  dataSource!: TransactionsDataSource;

  displayedColumns: string[] = ['externalId', 'provider', 'amount', 'comissionAmount', 'username', 'actions'];

  columnNames : column[] = [{
      id: 'externalId',
      value: 'No.',
    }, 
    {
      id: 'provider',
      value: 'Provider',
    },
    {
      id: 'amount',
      value: 'Amount',
    },
    {
      id: 'comissionAmount',
      value: 'Comission amount',
    },
    {
      id: 'username',
      value: 'Username',
    },
    {
      id: 'actions',
      value: 'Actions'
    }];

  constructor(
    public webGet: WebGetService, 
    public webDelete: WebDeleteService,
    public webPatch: WebPatchService,
    private translateService: TranslateService
   ) {}

  

  ngOnInit(): void {
    this.dataSource = new TransactionsDataSource(this.webGet);
    this.dataSource.loadTransactions();
    this.translateService.get(['displayedColumns.externalId', 'displayedColumns.username', 
    'displayedColumns.amount', 'displayedColumns.comissionAmount', 'displayedColumns.provider', 'displayedColumns.actions'])
      .subscribe({
        next: (translations: any) => {
        this.columnNames[0].value = (translations['displayedColumns.externalId']);
        this.columnNames[1].value = (translations['displayedColumns.provider']);
        this.columnNames[2].value = (translations['displayedColumns.amount']);
        this.columnNames[3].value = (translations['displayedColumns.comissionAmount']);
        this.columnNames[4].value = (translations['displayedColumns.username']);
        this.columnNames[5].value = (translations['displayedColumns.actions']);
        },
        error: (error: Object) => {
          console.log(error)
        }
    });
  }

  refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  }

  deleteTransaction = async (e: Event): Promise<void> => {
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string | undefined = currentTarget.dataset['id'];
    this.webDelete.deleteTransaction(id).subscribe({
      next: (success: Object)=>{
      this.refreshTransactions()
      },
      error: (error: Object) => {
        console.log(error)
      }
  })
  }

  toggleForms = (row: row): void => {
    console.log(row)
    this.formsToggled = !this.formsToggled;
    row.displayForms = !row.displayForms;
    this.transactionUpdateForm = new FormGroup({
      provider: new FormControl(row.provider),
      username: new FormControl(row.username),
      externalId: new FormControl(row.externalId),
      amount: new FormControl(row.amount.amount),
      currency: new FormControl(row.amount.currency),
      comissionAmount: new FormControl(row.comissionAmount.amount),
      comissionCurrency: new FormControl(row.comissionAmount.currency),
      additionalData: new FormControl(row.additionalData)
    })
  }

  updateTransaction = (e: Event, row: row): void => {
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string | undefined = currentTarget.dataset['id'];
    const updateObj: Object = {
      "externalId": this.transactionUpdateForm.value.externalId,
      "username": this.transactionUpdateForm.value.username,
      "amount": {
        "amount": this.transactionUpdateForm.value.amount,
        "currency": this.transactionUpdateForm.value.currency
      },
      "comissionAmount": {
        "amount": this.transactionUpdateForm.value.comissionAmount,
        "currency": this.transactionUpdateForm.value.comissionCurrency
      },
      "provider": this.transactionUpdateForm.value.provider,
      "additionalData": this.transactionUpdateForm.value.additionalData
    }
    this.webPatch.patchTransaction(id, updateObj).subscribe({
      next: (success: Object)=>{
      this.toggleForms(row)
      this.refreshTransactions()
      },
      error: (error: Object) => {
        console.log(error)
      }
    })
  }
}
