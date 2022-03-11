import {Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import { WebService, transactionInterface, amountInterface } from '../web.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

interface column extends Object {
  id: string,
  value: string
}

interface element extends Object {
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

export class TransactionsTableComponent implements OnInit{

  @Input() transactionsArray!: MatTableDataSource<transactionInterface[]>;

  @Output() getRefreshedTransactions: EventEmitter<any> = new EventEmitter();

  formsToggled: boolean = false;

  displayEditForms: boolean = false;

  displayedColumns: string[] = ['externalId', 'provider', 'amount', 'comissionAmount', 'username', 'actions'];

  columnNames : column[] = [{
      id: 'externalId',
      value: 'No.',
    }, 
    {
      id: 'username',
      value: 'Username',
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
      id: 'provider',
      value: 'Provider',
    },
    {
      id: 'actions',
      value: 'Actions'
    }];

  constructor(
    public web: WebService, 
    private cdr: ChangeDetectorRef, 
    private translateService: TranslateService
   ) {}

  transactionUpdateForm: FormGroup = new FormGroup({
    provider: new FormControl(''),
    username: new FormControl(''),
    externalId: new FormControl(''),
    amount: new FormControl(''),
    currency: new FormControl(''),
    comissionAmount: new FormControl(''),
    comissionCurrency: new FormControl(''),
    additionalData: new FormControl('')
  });

  ngOnInit(): void {
    this.translateService.get(['displayedColumns.externalId', 'displayedColumns.username', 
    'displayedColumns.amount', 'displayedColumns.comissionAmount', 'displayedColumns.provider', 'displayedColumns.actions'])
      .subscribe(translations => {
        this.columnNames[0].value = (translations['displayedColumns.externalId']);
        this.columnNames[4].value = (translations['displayedColumns.provider']);
        this.columnNames[2].value = (translations['displayedColumns.amount']);
        this.columnNames[3].value = (translations['displayedColumns.comissionAmount']);
        this.columnNames[1].value = (translations['displayedColumns.username']);
        this.columnNames[5].value = (translations['displayedColumns.actions']);
      });
    this.getRefreshedTransactions.emit()
  }

  refreshTransactions = async (): Promise<void> => {
    const transactions: Observable<Object> | any = await this.web.getTransactionsObservable();
    
    this.transactionsArray = new MatTableDataSource(transactions);
    this.cdr.detectChanges()
  }

  deleteTransaction = async (e: Event): Promise<void> => {
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const id: string | undefined = currentTarget.dataset['id'];
    await this.web.deleteTransaction(id)
    this.refreshTransactions()
  }

  toggleForms = (element: element): void => {
    this.transactionUpdateForm = new FormGroup({
      provider: new FormControl(element.provider),
      username: new FormControl(element.username),
      externalId: new FormControl(element.externalId),
      amount: new FormControl(element.amount.amount),
      currency: new FormControl(element.amount.currency),
      comissionAmount: new FormControl(element.comissionAmount.amount),
      comissionCurrency: new FormControl(element.comissionAmount.currency),
      additionalData: new FormControl(element.additionalData)
    })
    this.formsToggled = !this.formsToggled;
    element.displayForms = !element.displayForms;
  }

  updateTransaction = async (e: Event, element: element): Promise<void> => {
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
    await this.web.patchTransaction(id, updateObj)
    this.toggleForms(element)
    this.refreshTransactions()
  }
}
