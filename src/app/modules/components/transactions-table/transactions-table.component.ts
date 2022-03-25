import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { Transaction, Amount, TransactionUpdateData, TransactionCrudResponseError } from 'src/app/modules/interfaces/transactions.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { NotifyService } from '../../../services/notify.service';
import { MatSort } from '@angular/material/sort';
import { Target } from '../../../modules/interfaces/browser-event.interface'
import { Router } from '@angular/router';
import { Translations } from 'src/app/modules/interfaces/translations.interface';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { Forms } from 'src/app/constants/forms.constants';
import { Columns } from 'src/app/constants/columns.constants';

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

  filterValues: FormGroup = new FormGroup({
    idFilter: new FormControl(Forms.INIT_VALUE),
    providerFilter: new FormControl(Forms.INIT_VALUE),
    amountFilter: new FormControl(Forms.INIT_VALUE),
    comissionAmountFilter: new FormControl(Forms.INIT_VALUE),
    usernameFilter: new FormControl(Forms.INIT_VALUE),
  });

  formsToggled = false;

  displayedColumns: string[] = [
    'externalId', 
    'provider', 
    'amount', 
    'comissionAmount', 
    'username', 
    'actions'];

  columnNames: Column[] = [{
    id: Columns.ID_EXTERNAL_ID,
    value: Columns.NAME_EXTERNAL_ID,
  },
  {
    id: Columns.ID_PROVIDER,
    value: Columns.NAME_PROVIDER,
  },
  {
    id: Columns.ID_AMOUNT,
    value: Columns.NAME_AMOUNT,
  },
  {
    id: Columns.ID_COMISSION_AMOUNT,
    value: Columns.NAME_COMISSION_AMOUNT,
  },
  {
    id: Columns.ID_USERNAME,
    value: Columns.NAME_USERNAME,
  },
  {
    id: Columns.ID_ACTIONS,
    value: Columns.NAME_ACTIONS
  }];

  constructor(
    public transactionApiService: TransactionApiService,
    private notify: NotifyService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor
    this.dataSource.sort = this.sort

  }

  ngOnInit(): void {
    console.log(this.displayedColumns)
    console.log(this.columnNames)
    this.subscribeToFilterFormsChanges()
    this.loadData()
    this.translateColumnsNames()
    this.dataSource.filterPredicate = this.createFilter();
  }

  sortingDataAccessor(data: Transaction, sortHeaderId: string): string | number {
    switch (sortHeaderId) {
      case Columns.ID_EXTERNAL_ID:
        return Number(data[sortHeaderId])
      case Columns.ID_AMOUNT:
        return Number(data[sortHeaderId].amount)
      case Columns.ID_COMISSION_AMOUNT:
        return Number(data[sortHeaderId].amount)
      default:
        return data[sortHeaderId as keyof Transaction] as string | number
    }
  }

  loadData(): void {
    this.dataSource = new TransactionsDataSource(this.transactionApiService, this.notify);
    this.dataSource.loadTransactions();
  }

  translateColumnsNames(): void {
    this.translateService.get([
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_EXTERNAL_ID,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_PROVIDER,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_AMOUNT,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_COMISSION_AMOUNT,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_USERNAME, 
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_ACTIONS])
      .subscribe((translations: Translations) => {
        this.columnNames[0].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_EXTERNAL_ID];
        this.columnNames[1].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_PROVIDER];
        this.columnNames[2].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_AMOUNT];
        this.columnNames[3].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_COMISSION_AMOUNT];
        this.columnNames[4].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_USERNAME];
        this.columnNames[5].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_ACTIONS];
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
        this.translateService.get(TranslationsEndpoints.SNACKBAR_TRANSACTION_DELETED).subscribe(msg=>{
          this.notify.showMessage(msg, Snackbar.SUCCESS_TYPE)
        })
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Snackbar.ERROR_TYPE)
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
    this.router.navigate([ApiEndpoints.TRANSACTIONS, row.id])
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
        this.translateService.get(TranslationsEndpoints.SNACKBAR_TRANSACTION_UPDATED).subscribe(msg=>{
          this.notify.showMessage(msg, Snackbar.SUCCESS_TYPE)
        })
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Snackbar.ERROR_TYPE)
      }
    })
  }

  createFilter(): (data: Transaction, filter: string) => boolean {
    const filterFunction = function (data: Transaction, filter: string): boolean {
      try {
        const searchTerms = JSON.parse(filter);
        if (typeof searchTerms !== 'object') {
          throw new Error()
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
