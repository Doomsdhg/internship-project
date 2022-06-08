import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Constants } from 'src/app/constants/constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { TransactionCrudResponseError } from 'src/app/interfaces/transactions.interface';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { NotifyService } from 'src/app/services/notify.service';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { ManageTransactionsDialogComponent } from '../add-transaction/manage-transactions-dialog.component';
import { Columns, PossibleSortingDirections, TransactionOperationTypes } from './transactions-table.constants';
import { ControlName, Row, Sorted } from './transactions-table.interfaces';

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

  public displayedColumns!: string[];

  public sorted!: Sorted;

  public formsToggled = false;

  constructor(
    private transactionApiService: TransactionApiService,
    private notifyService: NotifyService,
    private localStorageManagerService: LocalStorageManagerService,
    private matDialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.displayedColumns = Columns.DISPLAYED_COLUMNS;
    this.loadTransactionsData();
    this.resetSorting();
  }

  public get inputChanged(): boolean {
    if (this.transactionUpdateForm) {
      return this.transactionUpdateForm.dirty;
    }
    return false;
  }

  public useNewPageSize(pageSize: string): void {
    this.dataSource.selectedPageSize = Number(pageSize);
    this.dataSource.loadTransactions();
  }

  public confirmTransaction = (row: Row): void => {
    this.transactionApiService.confirmTransaction(row.externalId, row.provider).subscribe({
      next: () => {
        this.handleSuccessfulConfirmation();
      },
      error: (error: TransactionCrudResponseError) => {
        this.handleError(error);
      }
    });
  }

  public sortify = (columnName: string): void => {
    const sortedBothOrders = this.sorted[columnName as keyof Sorted] === false;
    if (sortedBothOrders) {
      this.resetSorting();
    } else {
      this.toggleSortingIcon(columnName);
      this.setSorting(columnName);
    }
    this.dataSource.loadTransactions();
  }

  public loadNextPage = () => {
    this.dataSource.loadTransactions(this.dataSource.currentPageNumber + 1);
  }

  public loadPreviousPage = () => {
    this.dataSource.loadTransactions(this.dataSource.currentPageNumber - 1);
  }

  public loadFirstPage = () => {
    this.dataSource.loadTransactions(0);
  }

  public getControl(controlName: ControlName): AbstractControl {
    return this.transactionUpdateForm.controls[controlName];
  }

  public openTransactionEditingDialog(row: Row): void {
    this.matDialog.open(ManageTransactionsDialogComponent, {
      data: {
        rowData: row,
        operationType: TransactionOperationTypes.EDIT
      }
    })
      .afterClosed().subscribe(() => {
        this.refreshTransactions();
      });
  }

  public openTransactionAddingDialog(): void {
    this.matDialog.open(ManageTransactionsDialogComponent, {
      data: {
        operationType: TransactionOperationTypes.CREATE
      }
    })
      .afterClosed().subscribe(() => {
        this.refreshTransactions();
      });
  }

  public get isFirstPage(): boolean {
    return this.dataSource.currentPageNumber === 0;
  }

  private handleSuccessfulConfirmation(): void {
    this.refreshTransactions();
    this.notifyService.showTranslatedMessage(TranslationsEndpoints.SNACKBAR.TRANSACTION_COMPLETED, Constants.SNACKBAR.SUCCESS_TYPE);
  }

  private handleError(error: TransactionCrudResponseError): void {
    this.notifyService.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
  }

  private resetSorting(): void {
    this.sorted = { default: true };
    this.dataSource.sortColumn = Constants.PAGEABLE_DEFAULTS.SORT_EVENT.active;
    this.dataSource.sortOrder = Constants.PAGEABLE_DEFAULTS.SORT_EVENT.direction;
  }

  private setSorting(columnName: string): void {
    this.dataSource.sortColumn = columnName;
    const isColumnSorted = Boolean(this.sorted[columnName as keyof Sorted]);
    this.dataSource.sortOrder = isColumnSorted ? PossibleSortingDirections.DESC : PossibleSortingDirections.ASC;
  }

  private toggleSortingIcon(columnName: string): void {
    this.sorted[columnName as keyof Sorted] = !this.sorted[columnName as keyof Sorted];
  }

  private loadTransactionsData(): void {
    this.dataSource = new TransactionsDataSource(this.transactionApiService, this.notifyService);
    this.dataSource.selectedPageSize = this.localStorageManagerService.pageSize;
    this.dataSource.loadTransactions();
  }

  private refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  }
}
