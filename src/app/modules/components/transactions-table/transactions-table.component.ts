import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { TransactionUpdateData, TransactionCrudResponseError } from 'src/app/modules/interfaces/transactions.interface';
import { Column, Row, Sorted } from './transactions-table.interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { NotifyService } from '../../../services/notify.service';
import { MatSort } from '@angular/material/sort';
import { Constants } from 'src/app/constants/general.constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { Columns } from './transactions-table.constants';

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

  public displayedColumns: string[] = Columns.DISPLAYED_COLUMNS;

  public sorted: Sorted | undefined;

  constructor(
    private transactionApiService: TransactionApiService,
    private notify: NotifyService,
    private localStorageManager: LocalStorageManagerService
  ) { }

  public ngOnInit(): void {
    this.loadData();
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

  public confirmTransaction = (e: Event): void => {
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const externalId: string = currentTarget.dataset['external_id'] || '';
    const provider: string = currentTarget.dataset['provider'] || '';
    this.transactionApiService.confirmTransaction(externalId, provider).subscribe({
      next: () => {
        this.refreshTransactions();
        this.notify.showTranslatedMessage(TranslationsEndpoints.SNACKBAR_TRANSACTION_COMPLETED, Constants.SNACKBAR.SUCCESS_TYPE);
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
        this.notify.showTranslatedMessage(TranslationsEndpoints.SNACKBAR_TRANSACTION_UPDATED, Constants.SNACKBAR.SUCCESS_TYPE);
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

  public sortify = (columnName: string): void => {
    const isDefaultSorting = this.sorted === undefined;
    this.sorted = isDefaultSorting ? {} : this.sorted;
    if (this.sorted) {
      const sortedBothOrders = this.sorted[columnName as keyof Sorted] === false;
      if (sortedBothOrders) {
        this.resetSorting();
      } else {
        this.toggleSortingIcon(columnName);
        this.setSorting(columnName);
      }
      this.dataSource.loadTransactions();
    }
  }

  private resetSorting(): void {
    this.sorted = undefined;
    this.dataSource.sortColumn = Columns.SORTING.DEFAULT_COLUMN;
    this.dataSource.sortOrder = Columns.SORTING.DEFAULT_ORDER;
  }

  private setSorting(columnName: string): void {
    this.dataSource.sortColumn = columnName;
    if (this.sorted) {
      const isColumnSorted = Boolean(this.sorted[columnName as keyof Sorted]);
      this.dataSource.sortOrder = isColumnSorted ? Columns.SORTING.DESC : Columns.SORTING.ASC;
    }
  }

  private toggleSortingIcon(columnName: string): void {
    if (this.sorted) {
      this.sorted[columnName as keyof Sorted] = !this.sorted[columnName as keyof Sorted];
    }
  }

  private loadData(): void {
    this.dataSource = new TransactionsDataSource(this.transactionApiService, this.notify);
    this.dataSource.selectedPageSize = Number(localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.PAGE_SIZE)) ||
    Constants.PAGEABLE_DEFAULTS.defaultPageSize;
    this.dataSource.loadTransactions();
  }

  private refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  }
}
