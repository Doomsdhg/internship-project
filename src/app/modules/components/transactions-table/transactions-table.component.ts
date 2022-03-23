import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { Transaction, Amount, TransactionUpdateData } from 'src/app/modules/interfaces/transaction.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { NotifyService } from '../../../services/notify.service';
import { TransactionCrudResponseError } from '../../../modules/interfaces/transaction-crud-response-error.interface';
import { MatSort } from '@angular/material/sort';
import { Target } from '../../../modules/interfaces/browser-event.interface'
import { Router } from '@angular/router';
import { Translations } from 'src/app/modules/interfaces/translations.interface';

interface Column {
  id: string,
  value: string
}

interface Row {
  displayForms: boolean,
  provider: string,
  username: string,
  externalId: string,
  amount: Amount,
  comissionAmount: Amount,
  additionalData: string,
  id: string
}

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsTableComponent implements OnInit, AfterViewInit {

  @Input() transactionUpdateForm!: FormGroup;

  @Input() dataSource!: TransactionsDataSource;

  @ViewChild(MatSort) sort!: MatSort;

  filterValues = new FormGroup({
    idFilter : new FormControl(''),
    providerFilter : new FormControl(''),
    amountFilter : new FormControl(''),
    comissionAmountFilter : new FormControl(''),
    usernameFilter : new FormControl(''),
  });

  formsToggled = false;

  displayedColumns: string[] = ['externalId', 'provider', 'amount', 'comissionAmount', 'username', 'actions'];

  columnNames: Column[] = [{
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
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
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
      .subscribe((translations: Translations) => {
          this.columnNames[0].value = translations['displayedColumns.externalId'];
          this.columnNames[1].value = translations['displayedColumns.provider'];
          this.columnNames[2].value = translations['displayedColumns.amount'];
          this.columnNames[3].value = translations['displayedColumns.comissionAmount'];
          this.columnNames[4].value = translations['displayedColumns.username'];
          this.columnNames[5].value = translations['displayedColumns.actions'];
      });
  }

  subscribeToFilterFormsChanges(): void {
    this.filterValues.valueChanges
      .subscribe(
        filters => {
          const filter = {
            id: filters.idFilter,
            provider: filters.providerFilter,
            amount: filters.amountFilter,
            comissionAmount: filters.comissionAmountFilter,
            username: filters.usernameFilter
          }
          this.dataSource.filter = JSON.stringify(filter);
        }
      )
  }

  search = (e: Event): void => {
    const target = e.target as Target | null;
    this.dataSource.filter = target!.value
  }

  refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  }

  deleteTransaction = (e: Event): void => {
    e.stopPropagation()
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string | undefined = currentTarget.dataset['id'];
    this.transactionApiService.deleteTransaction(id).subscribe({
      next: () => {
        this.refreshTransactions()
        this.notify.showMessage('transaction deleted succesfully', 'success')
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, 'error')
      }
    })
  }

  toggleForms = (e: Event, row: Row): void => {
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

  transactionRedirect(row: Row): void {
    this.router.navigate(['transactions/', row.id])
  }

  updateTransaction = (e: Event, row: Row): void => {
    e.stopPropagation()
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string | undefined = currentTarget.dataset['id'];
    const updateObj: TransactionUpdateData = {
      "externalId": this.transactionUpdateForm.value.externalId,
      "username": this.transactionUpdateForm.value.username,
      "amount": {
        "amount": this.transactionUpdateForm.value.amount,
        "currency": this.transactionUpdateForm.value.currency.toUpperCase()
      },
      "comissionAmount": {
        "amount": this.transactionUpdateForm.value.comissionAmount,
        "currency": this.transactionUpdateForm.value.comissionCurrency.toUpperCase()
      },
      "provider": this.transactionUpdateForm.value.provider,
      "additionalData": this.transactionUpdateForm.value.additionalData
    }
    this.transactionApiService.patchTransaction(id, updateObj).subscribe({
      next: () => {
        this.toggleForms(e, row)
        this.refreshTransactions()
        this.notify.showMessage('transaction data updated succesfully', 'success')
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, 'error')
      }
    })
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data: Transaction, filter: string): boolean {
      try {
        const searchTerms = JSON.parse(filter);
        if (typeof searchTerms !== 'object') {
          throw new Error('')
        }
        return data.externalId.indexOf(searchTerms.id) !== -1
        && data.provider.toString().toLowerCase().indexOf(searchTerms.provider) !== -1
        && String(data.amount.amount).indexOf(searchTerms.amount) !== -1
        && String(data.comissionAmount.amount).indexOf(searchTerms.comissionAmount) !== -1
        && data.username.toLowerCase().indexOf(searchTerms.username) !== -1;
      } catch (e) {
        return data.externalId.indexOf(filter) !== -1
        || data.provider.toString().toLowerCase().indexOf(filter) !== -1
        || String(data.amount.amount).indexOf(filter) !== -1
        || String(data.comissionAmount.amount).indexOf(filter) !== -1
        || data.username.toLowerCase().indexOf(filter) !== -1;
      }
    }
    return filterFunction;
  }
}
