import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { WebGetService } from '../../services/web-services/web-get.service';
import { WebDeleteService } from 'src/app/services/web-services/web-delete.service';
import { WebPatchService } from 'src/app/services/web-services/web-patch.service';
import { transactionInterface, amountInterface } from 'src/app/models/interfaces/transaction.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionsDataSource } from '../../services/transactions-data-source.service';
import { NotifyService } from '../../services/notify.service';
import { TransactionCrudResponseError } from '../../models/interfaces/transaction-crud-response-error.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

export class TransactionsTableComponent implements OnInit, AfterViewInit{

  @Input() transactionsArray: BehaviorSubject<transactionInterface[]> = new BehaviorSubject<transactionInterface[]>([]);
  
  @Input() transactionUpdateForm!: FormGroup;

  @Input() dataSource!: TransactionsDataSource;

  @Output() getRefreshedTransactions: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  formsToggled: boolean = false;

  displayEditForms: boolean = false;

  pageSizeArray: number[] = [5, 10, 20];

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
    public notify: NotifyService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef
   ) {}

  ngAfterViewInit(): void {
    console.log(this.paginator)
    console.log(this.sort)
    console.log(this.dataSource.sort)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.cdr.markForCheck()
  }

  ngOnInit(): void {
    this.dataSource = new TransactionsDataSource(this.webGet, this.notify);
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
        error: (error: any) => {
          console.log(error)
        }
    });
  }

  search = (e: any): void => {
    this.dataSource.filter = e.target.value
  }

  refreshTransactions = (): void => {
    console.log(this.sort)
    this.dataSource.loadTransactions();
  }

  deleteTransaction = async (e: Event): Promise<void> => {
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string | undefined = currentTarget.dataset['id'];
    this.webDelete.deleteTransaction(id).subscribe({
      next: (success: Object)=>{
        this.refreshTransactions()
        this.notify.showMessage('transaction deleted succesfully', false)
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, true)
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
        this.notify.showMessage('transaction data updated succesfully', false)
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, true)
      }
    })
  }
}
