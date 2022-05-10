import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { TransactionApiService } from '../../../services/web-services/app.intr.transaction-api.service';
import { Amount, TransactionUpdateData, TransactionCrudResponseError } from 'src/app/modules/interfaces/app.intr.transactions.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TransactionsDataSource } from '../../../services/app.intr.transactions-data-source.service';
import { NotifyService } from '../../../services/app.intr.notify.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Translations } from 'src/app/modules/interfaces/app.intr.translations.interface';
import { Constants } from 'src/app/constants/main.constants';
import { LocalStorageManagerService } from 'src/app/services/app.intr.local-storage-manager.service';

export interface Column {
  id: string;
  value: string;
}

export interface Row {
  displayForms: boolean;
  provider: string;
  user: string;
  externalId: string;
  status: string;
  amount: Amount;
  commissionAmount: Amount;
  additionalData: string;
  id: string;
}

interface Sorted {
  externalId?: boolean;
  provider?: boolean;
  status?: boolean;
  amount?: boolean;
  commissionAmount?: boolean;
  user?: boolean;
}

@Component({
  selector: 'app-intr-transactions-table',
  templateUrl: './app.intr.transactions-table.component.html',
  styleUrls: ['./app.intr.transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsTableComponent implements OnInit {

  @Input() transactionUpdateForm!: FormGroup;

  @Input() dataSource!: TransactionsDataSource;

  @ViewChild(MatSort) sort!: MatSort;

  formsToggled = false;

  displayedColumns: string[] = [
    Constants.COLUMNS.ID_EXTERNAL_ID,
    Constants.COLUMNS.ID_PROVIDER,
    Constants.COLUMNS.ID_STATUS,
    Constants.COLUMNS.ID_AMOUNT,
    Constants.COLUMNS.ID_commission_AMOUNT,
    Constants.COLUMNS.ID_USER,
    Constants.COLUMNS.ID_ACTIONS];

  columnNames: Column[] = [{
    id: Constants.COLUMNS.ID_EXTERNAL_ID,
    value: Constants.COLUMNS.NAME_EXTERNAL_ID,
  },
  {
    id: Constants.COLUMNS.ID_PROVIDER,
    value: Constants.COLUMNS.NAME_PROVIDER,
  },
  {
    id: Constants.COLUMNS.ID_STATUS,
    value: Constants.COLUMNS.NAME_STATUS,
  },
  {
    id: Constants.COLUMNS.ID_AMOUNT,
    value: Constants.COLUMNS.NAME_AMOUNT,
  },
  {
    id: Constants.COLUMNS.ID_commission_AMOUNT,
    value: Constants.COLUMNS.NAME_commission_AMOUNT,
  },
  {
    id: Constants.COLUMNS.ID_USER,
    value: Constants.COLUMNS.NAME_USER,
  },
  {
    id: Constants.COLUMNS.ID_ACTIONS,
    value: Constants.COLUMNS.NAME_ACTIONS
  }];

  @Input() sorted: Sorted | undefined;

  constructor(
    public transactionApiService: TransactionApiService,
    public translateService: TranslateService,
    private notify: NotifyService,
    private router: Router,
    private localStorageManager: LocalStorageManagerService
  ) { }

  get getTransactionUpdateForm (): FormGroup {
    return this.transactionUpdateForm;
  }

  ngOnInit(): void {
    this.loadData();
    this.translateColumnsNames();
  }

  get inputChanged(): boolean {
    return !this.transactionUpdateForm.dirty;
  }

  setPageSize(pageSize: string): void {
    this.localStorageManager.setPageSize(pageSize);
    this.loadData();
  }

  loadData(): void {
    this.dataSource = new TransactionsDataSource(this.transactionApiService, this.notify, this.router, this.localStorageManager);
    this.dataSource.selectedPageSize = Number(localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.PAGE_SIZE)) ||
    Constants.PAGEABLE_DEFAULTS.defaultPageSize;
    this.dataSource.loadTransactions();
  }

  translateColumnsNames(): void {
    this.translateService.get([
      Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_EXTERNAL_ID,
      Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_PROVIDER,
      Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_STATUS,
      Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_AMOUNT,
      Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_commission_AMOUNT,
      Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_USER,
      Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_ACTIONS])
      .subscribe((translations: Translations) => {
        this.columnNames[0].value = translations[Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_EXTERNAL_ID];
        this.columnNames[1].value = translations[Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_PROVIDER];
        this.columnNames[2].value = translations[Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_STATUS];
        this.columnNames[3].value = translations[Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_AMOUNT];
        this.columnNames[4].value = translations[Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_commission_AMOUNT];
        this.columnNames[5].value = translations[Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_USER];
        this.columnNames[6].value = translations[Constants.TRANSLATION_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_ACTIONS];
      });
  }

  refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  }

  confirmTransaction = (e: Event): void => {
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const externalId: string | undefined = currentTarget.dataset['external_id'];
    const provider: string | undefined = currentTarget.dataset['provider'];
    this.transactionApiService.confirmTransaction(externalId, provider).subscribe({
      next: () => {
        this.refreshTransactions();
        this.notify.showTranslatedMessage(Constants.TRANSLATION_ENDPOINTS.SNACKBAR_TRANSACTION_COMPLETED, Constants.SNACKBAR.SUCCESS_TYPE);
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  toggleForms = (e: Event, row: Row): void => {
    e.stopPropagation();
    this.formsToggled = !this.formsToggled;
    row.displayForms = !row.displayForms;
    this.transactionUpdateForm = new FormGroup({
      user: new FormControl(row.user),
      status: new FormControl(row.status),
      amount: new FormControl(row.amount.amount),
      currency: new FormControl(row.amount.currency),
      commissionAmount: new FormControl(row.commissionAmount.amount),
      commissionCurrency: new FormControl(row.commissionAmount.currency),
      additionalData: new FormControl(row.additionalData)
    });
  }

  updateTransaction = (e: Event, row: Row): void => {
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string  = currentTarget.dataset['id'] || 'no id';
    const provider: string = currentTarget.dataset['provider'] || 'no provider';
    const externalId: string = currentTarget.dataset['external_id'] || 'no external id';
    const updateObj: TransactionUpdateData = {
      'id': id,
      'externalId': externalId,
      'user': this.transactionUpdateForm.value.user,
      'status': this.transactionUpdateForm.value.status,
      'amount': {
        'amount': this.transactionUpdateForm.value.amount,
        'currency': this.transactionUpdateForm.value.currency.toUpperCase()
      },
      'commissionAmount': {
        'amount': this.transactionUpdateForm.value.commissionAmount,
        'currency': this.transactionUpdateForm.value.commissionCurrency.toUpperCase()
      },
      'provider': provider,
      'timestamp': Date.now() / 1000,
      'providerTimestamp': Date.now() / 1000,
      'additionalData': this.transactionUpdateForm.value.additionalData
    };
    this.transactionApiService.patchTransaction(updateObj).subscribe({
      next: () => {
        this.toggleForms(e, row);
        this.refreshTransactions();
        this.notify.showTranslatedMessage(Constants.TRANSLATION_ENDPOINTS.SNACKBAR_TRANSACTION_UPDATED, Constants.SNACKBAR.SUCCESS_TYPE);
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  setDefaultSorting(): void {
    this.sorted = undefined;
    this.dataSource.sortColumn = Constants.SORTING_STRINGS.DEFAULT_COLUMN;
    this.dataSource.sortOrder = Constants.SORTING_STRINGS.DEFAULT_ORDER;
  }

  setSorting(columnName: string): void {
    this.dataSource.sortColumn = columnName;
    if (this.sorted) {
      const columnSortedAlready = Boolean(this.sorted[columnName as keyof Sorted]);
      this.dataSource.sortOrder = columnSortedAlready === true ? Constants.SORTING_STRINGS.DESC : Constants.SORTING_STRINGS.ASC;
    }
  }

  toggleSortingIcon(columnName: string): void {
    if (this.sorted) {
      this.sorted[columnName as keyof Sorted] = !this.sorted[columnName as keyof Sorted];
    }
  }

  sortify = (columnName: string): void => {
    const isDefaultSorting = this.sorted === undefined;
    this.sorted = isDefaultSorting ? new Object() : this.sorted;
    if (this.sorted) {
      const sortedBothOrders = this.sorted[columnName as keyof Sorted] === false;
      if (sortedBothOrders) {
        this.setDefaultSorting();
      } else {
        this.toggleSortingIcon(columnName);
        this.setSorting(columnName);
      }
      this.dataSource.loadTransactions();
    }
  }
}
