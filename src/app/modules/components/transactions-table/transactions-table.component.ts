import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { Amount, TransactionUpdateData, TransactionCrudResponseError } from 'src/app/modules/interfaces/transactions.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { NotifyService } from '../../../services/notify.service';
import { MatSort } from '@angular/material/sort';
import { Target } from '../../../modules/interfaces/browser-event.interface';
import { Router } from '@angular/router';
import { Translations } from 'src/app/modules/interfaces/translations.interface';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { Columns } from 'src/app/constants/columns.constants';
import { PageableDefaults } from '../../../constants/pageable.constants';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { SortingStrings } from 'src/app/constants/sorting.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

interface Column {
  id: string,
  value: string
}

interface Row {
  displayForms: boolean,
  provider: string,
  user: string,
  externalId: string,
  status: string,
  amount: Amount,
  commissionAmount: Amount,
  additionalData: string,
  id: string
}

interface Sorted {
  externalId?: boolean,
  provider?: boolean,
  status?: boolean,
  amount?: boolean,
  commissionAmount?: boolean,
  user?: boolean
}

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsTableComponent implements OnInit {

  @Input() transactionUpdateForm!: FormGroup;

  @Input() dataSource!: TransactionsDataSource;

  @ViewChild(MatSort) sort!: MatSort;

  formsToggled = false;

  displayedColumns: string[] = [
    Columns.ID_EXTERNAL_ID,
    Columns.ID_PROVIDER,
    Columns.ID_STATUS,
    Columns.ID_AMOUNT,
    Columns.ID_COMISSION_AMOUNT,
    Columns.ID_USER,
    Columns.ID_ACTIONS];

  columnNames: Column[] = [{
    id: Columns.ID_EXTERNAL_ID,
    value: Columns.NAME_EXTERNAL_ID,
  },
  {
    id: Columns.ID_PROVIDER,
    value: Columns.NAME_PROVIDER,
  },
  {
    id: Columns.ID_STATUS,
    value: Columns.NAME_STATUS,
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
    id: Columns.ID_USER,
    value: Columns.NAME_USER,
  },
  {
    id: Columns.ID_ACTIONS,
    value: Columns.NAME_ACTIONS
  }];

  @Input()
  sorted: Sorted | undefined;

  constructor(
    public transactionApiService: TransactionApiService,
    private notify: NotifyService,
    private translateService: TranslateService,
    private router: Router,
    private localStorageManager: LocalStorageManagerService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.translateColumnsNames();
  }

  get inputChanged() {  
    return !this.transactionUpdateForm.dirty;
  }

  setPageSize(pageSize: string): void {
    this.localStorageManager.setPageSize(pageSize);
    this.loadData();
  }

  loadData(): void {
    this.dataSource = new TransactionsDataSource(this.transactionApiService, this.notify, this.router, this.localStorageManager);
    this.dataSource.selectedPageSize = Number(localStorage.getItem(LocalStorageAcessors.PAGE_SIZE)) || PageableDefaults.defaultPageSize;
    this.dataSource.loadTransactions();
  }

  translateColumnsNames(): void {
    this.translateService.get([
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_EXTERNAL_ID,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_PROVIDER,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_STATUS,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_AMOUNT,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_COMISSION_AMOUNT,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_USER,
      TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_ACTIONS])
      .subscribe((translations: Translations) => {
        this.columnNames[0].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_EXTERNAL_ID];
        this.columnNames[1].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_PROVIDER];
        this.columnNames[2].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_STATUS];
        this.columnNames[3].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_AMOUNT];
        this.columnNames[4].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_COMISSION_AMOUNT];
        this.columnNames[5].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_USER];
        this.columnNames[6].value = translations[TranslationsEndpoints.SNACKBAR_DISPLAYED_COLUMNS_ACTIONS];
      });
  }

  search = (e: Event): void => {
    const target = e.target as Target | null;
    this.dataSource.filter = target!.value;
  };

  refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  };

  confirmTransaction = (e: Event): void => {
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const externalId: string | undefined = currentTarget.dataset['external_id'];
    const provider: string | undefined = currentTarget.dataset['provider'];
    this.transactionApiService.confirmTransaction(externalId, provider).subscribe({
      next: () => {
        this.refreshTransactions();
        this.notify.showTranslatedMessage(TranslationsEndpoints.SNACKBAR_TRANSACTION_COMPLETED, Snackbar.SUCCESS_TYPE);
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Snackbar.ERROR_TYPE);
      }
    });
  };

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
      comissionCurrency: new FormControl(row.commissionAmount.currency),
      additionalData: new FormControl(row.additionalData)
    });
  };

  transactionRedirect(row: Row): void {
    this.router.navigate([AppRoutes.TRANSACTIONS, row.id]);
  }

  updateTransaction = (e: Event, row: Row): void => {
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string | undefined = currentTarget.dataset['id'];
    const provider: string | undefined = currentTarget.dataset['provider'];
    const externalId: string | undefined = currentTarget.dataset['external_id'];
    const updateObj: TransactionUpdateData = {
      "id": id,
      "externalId": externalId,
      "user": this.transactionUpdateForm.value.user,
      "status": this.transactionUpdateForm.value.status,
      "amount": {
        "amount": this.transactionUpdateForm.value.amount,
        "currency": this.transactionUpdateForm.value.currency.toUpperCase()
      },
      "commissionAmount": {
        "amount": this.transactionUpdateForm.value.commissionAmount,
        "currency": this.transactionUpdateForm.value.comissionCurrency.toUpperCase()
      },
      "provider": provider,
      "timestamp": Date.now() / 1000,
      "providerTimestamp": Date.now() / 1000,
      "additionalData": this.transactionUpdateForm.value.additionalData
    };
    this.transactionApiService.patchTransaction(updateObj).subscribe({
      next: () => {
        this.toggleForms(e, row);
        this.refreshTransactions();
        this.notify.showTranslatedMessage(TranslationsEndpoints.SNACKBAR_TRANSACTION_UPDATED, Snackbar.SUCCESS_TYPE);
      },
      error: (error: TransactionCrudResponseError) => {
        this.notify.showMessage(error.error, Snackbar.ERROR_TYPE);
      }
    });
  };

  setDefaultSorting(): void {
    this.sorted = undefined;
    this.dataSource.sortColumn = SortingStrings.DEFAULT_COLUMN;
    this.dataSource.sortOrder = SortingStrings.DEFAULT_ORDER;
  }

  setSorting(columnName: string): void {
    this.dataSource.sortColumn = columnName;
    this.dataSource.sortOrder = this.sorted![columnName as keyof Sorted] == true ? SortingStrings.ASC : SortingStrings.DESC;
  }

  toggleSortingIcon(columnName: string): void {
    this.sorted![columnName as keyof Sorted] = !this.sorted![columnName as keyof Sorted];
  }

  sortify = (columnName: string): void => {
    this.sorted = this.sorted === undefined ? new Object() : this.sorted;
    const sortedBothOrders = this.sorted![columnName as keyof Sorted] === false;
    if (sortedBothOrders) {
      this.setDefaultSorting();
    } else {
      this.toggleSortingIcon(columnName);
      this.setSorting(columnName);
    }
    this.dataSource.loadTransactions();
  };
}
