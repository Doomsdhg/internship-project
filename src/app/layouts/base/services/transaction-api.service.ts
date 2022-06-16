import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiEndpoints } from "src/app/constants/api-endpoints.constants";
import { Constants } from "src/app/constants/constants";
import {
  ApiTransactionResponse, TransactionCreationData, Transaction, TransactionUpdateData
} from "src/app/interfaces/transactions.interface";
import { AppliedTransactionsListResponse } from "../pages/components/applied-transactions-list/applied-transactions-list.interfaces";
import { Row } from "../pages/components/transactions-table/transactions-table.interfaces";
import { BaseApiService } from "./base-api.service";

@Injectable({
  providedIn: "root"
})
export class TransactionApiService extends BaseApiService {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  public deleteTransaction(id: string): Observable<ApiTransactionResponse> {
    return this.delete<ApiTransactionResponse>(ApiEndpoints.TRANSACTIONS.getDeletionUrl(id));
  }

  public getTransactions(
    pageNumber = Constants.PAGEABLE_DEFAULTS.PAGE_NUMBER,
    pageSize = Constants.PAGEABLE_DEFAULTS.PAGE_SIZE,
    sortColumn = Constants.PAGEABLE_DEFAULTS.SORT_EVENT.active,
    sortOrder = Constants.PAGEABLE_DEFAULTS.SORT_EVENT.direction
  ): Observable<Transaction[]> {
    return this.get<Transaction[]>(ApiEndpoints.TRANSACTIONS.getPageableGettingUrl(pageNumber, pageSize, sortColumn, sortOrder));
  }

  public patchTransaction(updateObj: TransactionUpdateData): Observable<Transaction> {
    return this.put<Transaction>(ApiEndpoints.TRANSACTIONS.TRANSACTIONS_ADMIN, updateObj);
  }

  public confirmTransaction(externalId: string, provider: string): Observable<Transaction> {
    return this.post<Transaction>(ApiEndpoints.TRANSACTIONS.getConfirmationUrl(externalId, provider), {});
  }

  public uploadTransaction(transactionData: TransactionCreationData): Observable<Transaction> {
    return this.post<Transaction>(ApiEndpoints.TRANSACTIONS.TRANSACTIONS_CORE, transactionData);
  }

  public getAppliedTransactions(): Observable<AppliedTransactionsListResponse> {
    return this.get<AppliedTransactionsListResponse>(ApiEndpoints.APPLIED_TRANSACTIONS.GETTING_URL);
  }

  public refreshAppliedTransactionsList(appliedTransactionsArray: Row[]): Observable<Row[]> {
    return this.put<Row[]>(ApiEndpoints.APPLIED_TRANSACTIONS.GETTING_URL, {value: appliedTransactionsArray});
  }
}
