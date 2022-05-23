import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Constants } from 'src/app/constants/constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { TransactionCrudResponseError, TransactionUpdateData } from 'src/app/modules/interfaces/transactions.interface';
import { NotifyService } from '../../../services/notify.service';
import { TransactionsDataSource } from '../../../services/transactions-data-source.service';
import { TransactionApiService } from '../../../services/web-services/transaction-api.service';
import { Columns, PossibleSortingDirections, Validation } from './transactions-table.constants';
import { Row, Sorted } from './transactions-table.interfaces';

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

  private validationErrors: (ValidationErrors | null)[] = [];

  constructor(
    private transactionApiService: TransactionApiService,
    private notifyService: NotifyService
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

  public toggleFormsDisplay = (row: Row): void => {
    this.formsToggled = !this.formsToggled;
    row.displayForms = !row.displayForms;
    this.buildTransactionUpdateForms(row);
  }

  public updateTransaction = (row: Row): void => {
    this.detectValidationErrors();
    if (this.validationErrors.length === 0) {
      const updateObj: TransactionUpdateData = this.createUpdateObject(row);
      this.transactionApiService.patchTransaction(updateObj).subscribe({
        next: () => {
          this.handleSuccessfulUpdateResponse(row);
        },
        error: (error: TransactionCrudResponseError) => {
          this.handleError(error);
        }
      });
    }
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

  public get amountErrors(): ValidationErrors | null | undefined {
    return this.transactionUpdateForm.get(Columns.ID_AMOUNT)?.errors;
  }

  public get commissionAmountErrors(): ValidationErrors | null | undefined {
    return this.transactionUpdateForm.get(Columns.ID_COMMISSION_AMOUNT)?.errors;
  }

  private handleSuccessfulConfirmation(): void {
    this.refreshTransactions();
    this.notifyService.showTranslatedMessage(TranslationsEndpoints.SNACKBAR.TRANSACTION_COMPLETED, Constants.SNACKBAR.SUCCESS_TYPE);
  }

  private handleError(error: TransactionCrudResponseError): void {
    this.notifyService.showMessage(error.error, Constants.SNACKBAR.ERROR_TYPE);
  }

  private handleSuccessfulUpdateResponse(row: Row): void {
    this.toggleFormsDisplay(row);
    this.refreshTransactions();
    this.notifyService.showTranslatedMessage(TranslationsEndpoints.SNACKBAR.TRANSACTION_UPDATED, Constants.SNACKBAR.SUCCESS_TYPE);
  }

  private createUpdateObject(row: Row): TransactionUpdateData {
    return {
      id: row.id,
      externalId: row.externalId,
      user: this.transactionUpdateForm.value.user,
      status: this.transactionUpdateForm.value.status,
      amount: {
        amount: this.transactionUpdateForm.get(Columns.ID_AMOUNT)?.value,
        currency: this.transactionUpdateForm.value.currency.toUpperCase()
      },
      commissionAmount: {
        amount: this.transactionUpdateForm.get(Columns.ID_COMMISSION_AMOUNT)?.value,
        currency: this.transactionUpdateForm.value.commissionCurrency.toUpperCase()
      },
      provider: row.provider,
      additionalData: this.transactionUpdateForm.value.additionalData
    };
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
    this.dataSource.selectedPageSize = Number(localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.PAGE_SIZE));
    this.dataSource.loadTransactions();
  }

  private refreshTransactions = (): void => {
    this.dataSource.loadTransactions();
  }

  private buildTransactionUpdateForms = (row: Row) => {
    this.transactionUpdateForm = new FormGroup({
      user: new FormControl(row.user),
      status: new FormControl(row.status),
      amount: new FormControl(row.amount.amount, [
        this.integerLengthValidator(),
        this.numbersOnlyValidator()
      ]
      ),
      currency: new FormControl(row.amount.currency),
      commissionAmount: new FormControl(row.commissionAmount.amount, [
        this.integerLengthValidator(),
        this.numbersOnlyValidator()
      ]
      ),
      commissionCurrency: new FormControl(row.commissionAmount.currency),
      additionalData: new FormControl(row.additionalData)
    });
  }

  private integerLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = (+control.value).toFixed().length > Validation.maxIntegerLength;
      return forbidden ? { forbiddenIntegerLength: true } : null;
    };
  }

  private numbersOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = isNaN(+control.value);
      return forbidden ? { forbiddenNanInput: true } : null;
    };
  }

  private detectValidationErrors(): void {
    const errorsArray = [];
    const controls = this.transactionUpdateForm.controls;
    for (const name in controls) {
      if (controls[name].errors) {
        errorsArray.push(controls[name].errors);
      }
    }
    this.validationErrors = errorsArray;
  }
}
