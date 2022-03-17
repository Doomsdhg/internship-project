import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { transactionInterface, amountInterface } from 'src/app/models/interfaces/transaction.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { NotifyService } from '../../../services/notify.service';
import { TransactionCrudResponseError } from '../../../models/interfaces/transaction-crud-response-error.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { target } from '../../../models/interfaces/browser-event.interface'
import { Router } from '@angular/router';

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
  
  @Input() transactionUpdateForm!: FormGroup;

  @Input() dataSource!: TransactionsDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  idFilter = new FormControl('');
  providerFilter = new FormControl('');
  amountFilter = new FormControl('');
  comissionAmountFilter = new FormControl('');
  usernameFilter = new FormControl('');
  filterValues = {
    id: '',
    provider: '',
    amount: '',
    comissionAmount: '',
    username: ''
  };

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
    public transactionApiService: TransactionApiService, 
    private notify: NotifyService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private router: Router
   ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.cdr.markForCheck()
  }

  ngOnInit(): void {
    this.subscribeToFilterFormsChanges()
    this.loadData()
    this.translateColumnsNames()
    this.dataSource.filterPredicate = this.createFilter();
  }

  loadData(): void {
    this.dataSource = new TransactionsDataSource(this.transactionApiService, this.notify);
    this.dataSource.loadTransactions();
  }

  translateColumnsNames(): void {
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

  subscribeToFilterFormsChanges(): void {
    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.providerFilter.valueChanges
      .subscribe(
        provider => {
          this.filterValues.provider = provider;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.amountFilter.valueChanges
      .subscribe(
        amount => {
          this.filterValues.amount = amount;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.comissionAmountFilter.valueChanges
      .subscribe(
        comissionAmount => {
          this.filterValues.comissionAmount = comissionAmount;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.usernameFilter.valueChanges
      .subscribe(
        username => {
          this.filterValues.username = username;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  search = (e: Event): void => {
    const target = e.target as target | null;
    this.dataSource.filter = target!.value 
  }

  refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  }

  deleteTransaction = async (e: Event): Promise<void> => {
    e.stopPropagation()
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string | undefined = currentTarget.dataset['id'];
    this.transactionApiService.deleteTransaction(id).subscribe({
      next: (success: Object)=>{
        this.refreshTransactions()
        this.notify.showMessage('transaction deleted succesfully', false)
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, true)
      }
  })
  }

  toggleForms = (e: Event, row: row): void => {
    e.stopPropagation()
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

  transactionRedirect (row: row): void {
    this.router.navigate(['transactions/', row.id])
  }

  updateTransaction = (e: Event, row: row): void => {
    e.stopPropagation()
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
    this.transactionApiService.patchTransaction(id, updateObj).subscribe({
      next: (success: Object)=>{
        this.toggleForms(e, row)
        this.refreshTransactions()
        this.notify.showMessage('transaction data updated succesfully', false)
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, true)
      }
    })
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data: transactionInterface, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.externalId.indexOf(searchTerms.id) !== -1
        && data.provider.toString().toLowerCase().indexOf(searchTerms.provider) !== -1
        && String(data.amount.amount).indexOf(searchTerms.amount) !== -1
        && String(data.comissionAmount.amount).indexOf(searchTerms.comissionAmount) !== -1
        && data.username.toLowerCase().indexOf(searchTerms.username) !== -1;
    }
    return filterFunction;
  }
}
