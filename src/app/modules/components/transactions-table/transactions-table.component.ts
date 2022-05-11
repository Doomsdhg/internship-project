import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { TransactionUpdateData, TransactionCrudResponseError } from 'src/app/modules/interfaces/transactions.interface';
import { Column, Row, Sorted } from 'src/app/modules/interfaces/transactions-table.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { NotifyService } from '../../../services/notify.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Translations } from 'src/app/modules/interfaces/translations.interface';
import { Constants } from 'src/app/constants/main.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Component({
  selector: 'intr-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsTableComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  public dataSource!: TransactionsDataSource;

  public transactionUpdateForm!: FormGroup;

  public formsToggled = false;

  public displayedColumns: string[] = [
    Constants.COLUMNS.ID_EXTERNAL_ID,
    Constants.COLUMNS.ID_PROVIDER,
    Constants.COLUMNS.ID_STATUS,
    Constants.COLUMNS.ID_AMOUNT,
    Constants.COLUMNS.ID_commission_AMOUNT,
    Constants.COLUMNS.ID_USER,
    Constants.COLUMNS.ID_ACTIONS];

  private columnNames: Column[] = [{
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

  public sorted: Sorted | undefined;

  constructor(
    public transactionApiService: TransactionApiService,
    public translateService: TranslateService,
    private notify: NotifyService,
    private router: Router,
    private localStorageManager: LocalStorageManagerService
  ) { }

  public ngOnInit(): void {
    this.loadData();
    this.translateColumnsNames();
  }

  public get inputChanged(): boolean {
    if (this.transactionUpdateForm) {
      return this.transactionUpdateForm.dirty;
    }
    return false;
  }

  public setPageSize(pageSize: string): void {
    this.localStorageManager.setPageSize(pageSize);
    this.loadData();
  }

  private loadData(): void {
    this.dataSource = new TransactionsDataSource(this.transactionApiService, this.notify, this.router, this.localStorageManager);
    this.dataSource.selectedPageSize = Number(localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.PAGE_SIZE)) ||
    Constants.PAGEABLE_DEFAULTS.defaultPageSize;
    this.dataSource.loadTransactions();
  }

  private translateColumnsNames(): void {
    this.translateService.get([
      Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_EXTERNAL_ID,
      Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_PROVIDER,
      Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_STATUS,
      Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_AMOUNT,
      Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_commission_AMOUNT,
      Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_USER,
      Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_ACTIONS])
      .subscribe((translations: Translations) => {
        this.columnNames[0].value = translations[Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_EXTERNAL_ID];
        this.columnNames[1].value = translations[Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_PROVIDER];
        this.columnNames[2].value = translations[Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_STATUS];
        this.columnNames[3].value = translations[Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_AMOUNT];
        this.columnNames[4].value = translations[Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_commission_AMOUNT];
        this.columnNames[5].value = translations[Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_USER];
        this.columnNames[6].value = translations[Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_DISPLAYED_COLUMNS_ACTIONS];
      });
  }

  private refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  }

  public confirmTransaction = (e: Event): void => {
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const externalId: string | undefined = currentTarget.dataset['external_id'];
    const provider: string | undefined = currentTarget.dataset['provider'];
    this.transactionApiService.confirmTransaction(externalId, provider).subscribe({
      next: () => {
        this.refreshTransactions();
        this.notify.showTranslatedMessage(Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_TRANSACTION_COMPLETED, Constants.SNACKBAR.SUCCESS_TYPE);
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  public toggleForms = (e: Event, row: Row): void => {
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

  public updateTransaction = (e: Event, row: Row): void => {
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string  = currentTarget.dataset['id'] || 'no id';
    const provider: string = currentTarget.dataset['provider'] || 'no provider';
    const externalId: string = currentTarget.dataset['external_id'] || 'no external id';
    const updateObj: TransactionUpdateData = {
      id: id,
      externalId: externalId,
      user: this.transactionUpdateForm.value.user,
      status: this.transactionUpdateForm.value.status,
      amount: {
        amount: this.transactionUpdateForm.value.amount,
        currency: this.transactionUpdateForm.value.currency.toUpperCase()
      },
      commissionAmount: {
        amount: this.transactionUpdateForm.value.commissionAmount,
        currency: this.transactionUpdateForm.value.commissionCurrency.toUpperCase()
      },
      provider: provider,
      additionalData: this.transactionUpdateForm.value.additionalData
    };
    this.transactionApiService.patchTransaction(updateObj).subscribe({
      next: () => {
        this.toggleForms(e, row);
        this.refreshTransactions();
        this.notify.showTranslatedMessage(Constants.TRANSLATIONS_ENDPOINTS.SNACKBAR_TRANSACTION_UPDATED, Constants.SNACKBAR.SUCCESS_TYPE);
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  private setDefaultSorting(): void {
    this.sorted = undefined;
    this.dataSource.sortColumn = Constants.SORTING_STRINGS.DEFAULT_COLUMN;
    this.dataSource.sortOrder = Constants.SORTING_STRINGS.DEFAULT_ORDER;
  }

  private setSorting(columnName: string): void {
    this.dataSource.sortColumn = columnName;
    if (this.sorted) {
      const columnSortedAlready = Boolean(this.sorted[columnName as keyof Sorted]);
      this.dataSource.sortOrder = columnSortedAlready === true ? Constants.SORTING_STRINGS.DESC : Constants.SORTING_STRINGS.ASC;
    }
  }

  private toggleSortingIcon(columnName: string): void {
    if (this.sorted) {
      this.sorted[columnName as keyof Sorted] = !this.sorted[columnName as keyof Sorted];
    }
  }

  public sortify = (columnName: string): void => {
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
