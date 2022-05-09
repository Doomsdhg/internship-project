import { TestBed } from '@angular/core/testing';
import { TransactionsDataSource } from './app.intr.transactions-data-source.service';
import { TransactionApiService } from './web-services/app.intr.transaction-api.service';
import { Observable } from 'rxjs';
import { Transaction } from '../modules/interfaces/app.intr.transactions.interface';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../modules/types/Page.type';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotifyService } from './app.intr.notify.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DEFAULT_LANGUAGE,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  USE_STORE
} from '@ngx-translate/core';

describe('TransactionsDataSourceService', () => {

  const transactionsArrayExample: Page<Transaction> = {
    page: 1,
    pageSize: 1,
    totalPages: 1,
    totalElements: 1,
    body: [
    {
      id: 'qwe123',
      externalId: '123',
      provider: 'qiwi',
      status: 'INITIAL',
      amount: {
        amount: 100,
        currency: 'USD'
      },
      commissionAmount: {
        amount: 10,
        currency: 'USD'
      },
      user: 'test1',
      additionalData: 'none'
    },
    {
      id: '123qwe',
      externalId: '321',
      provider: 'webomney',
      status: 'INITIAL',
      amount: {
        amount: 200,
        currency: 'USD'
      },
      commissionAmount: {
        amount: 20,
        currency: 'USD'
      },
      user: 'test2',
      additionalData: 'none'
    },
    {
      id: '321ewq',
      externalId: '213',
      provider: 'paypal',
      status: 'INITIAL',
      amount: {
        amount: 300,
        currency: 'USD'
      },
      commissionAmount: {
        amount: 30,
        currency: 'USD'
      },
      user: 'test3',
      additionalData: 'none'
    }
  ]};

  let service: TransactionsDataSource;
  let transactionApiService: TransactionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionApiService,
        NotifyService,
        TranslateService,
        TranslateStore,
        TranslateLoader,
        TranslateCompiler,
        TranslateParser,
        MissingTranslationHandler,
        { provide: USE_DEFAULT_LANG, useValue: null },
        { provide: USE_STORE, useValue: null },
        { provide: USE_EXTEND, useValue: null },
        { provide: DEFAULT_LANGUAGE, useValue: null },
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        TranslateModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(TransactionsDataSource);
    transactionApiService = TestBed.inject(TransactionApiService);
  });

  it('should refresh data', () => {
    spyOn(transactionApiService, 'getTransactions').and.callFake(() => {
      return new Observable((observer) => {
        observer.next(transactionsArrayExample as unknown as HttpResponse<Page<Transaction>>);
        observer.complete();
      });
    });
    service.loadTransactions();
    expect(service.data).toEqual(transactionsArrayExample.body);
  });

});
