import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsTableComponent } from './transactions-table.component';
import { Column, Row } from 'src/app/modules/interfaces/transactions-table.interface';
import {
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotifyService } from 'src/app/services/notify.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Columns } from '../../../constants/columns.constants';
import { Page } from '../../types/Page.type';
import { Transaction } from '../../interfaces/transactions.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { SortingStrings } from 'src/app/constants/sorting.constants';

describe('TransactionsTableComponent', () => {

  const translationObjectExample = {
    'displayedColumns.actions': 'действия',
    'displayedColumns.amount': 'количество',
    'displayedColumns.commissionAmount': 'размер комиссии',
    'displayedColumns.externalId': 'номер',
    'displayedColumns.provider': 'провайдер',
    'displayedColumns.status': 'статус',
    'displayedColumns.user': 'имя пользователя'
  };

  const translatedColumnNames: Column[] = [{
    id: Columns.ID_EXTERNAL_ID,
    value: 'номер',
  },
  {
    id: Columns.ID_PROVIDER,
    value: 'провайдер',
  },
  {
    id: Columns.ID_STATUS,
    value: 'статус',
  },
  {
    id: Columns.ID_AMOUNT,
    value: 'количество',
  },
  {
    id: Columns.ID_commission_AMOUNT,
    value: 'размер комиссии',
  },
  {
    id: Columns.ID_USER,
    value: 'имя пользователя',
  },
  {
    id: Columns.ID_ACTIONS,
    value: 'действия'
  }];

  const transactionsResponseExample: Page<Transaction> = {
    page: 1,
    pageSize: 1,
    totalPages: 1,
    totalElements: 1,
    body: [
      {
        id: '1',
        externalId: '123qwe',
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
        user: 'test1'
      },
      {
        id: '2',
        externalId: '321ewq',
        provider: 'webmoney',
        status: 'INITIAL',
        amount: {
          amount: 200,
          currency: 'USD'
        },
        commissionAmount: {
          amount: 20,
          currency: 'USD'
        },
        user: 'tes2'
      },
      {
        id: '3',
        externalId: '321qwe',
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
        user: 'test3'
      }
    ]
  };

  const eventMock = {
    stopPropagation: () => {console.log(1); },
    currentTarget: {
      dataset : {
        external_id: '123qwe',
        provider: 'qiwi'
      }
    }
  };

  const rowMock: Row =  {
    ...transactionsResponseExample.body[0],
    displayForms: false,
    additionalData: 'no data'
  };

  const transactionUpdateFormMock = new FormGroup({
    user: new FormControl('test1'),
    status: new FormControl('INITIAL'),
    amount: new FormControl('123'),
    currency: new FormControl('USD'),
    commissionAmount: new FormControl('123'),
    commissionCurrency: new FormControl('USD'),
    additionalData: new FormControl('no data')
  });

  const columnNameMock = 'externalId';

  let component: TransactionsTableComponent;
  let fixture: ComponentFixture<TransactionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsTableComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        HttpTestingController,
        NotifyService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should translate columns names', () => {
    spyOn(component.translateService, 'get').and.callFake(() => {
      return new Observable((observer) => {
        observer.next(translationObjectExample);
        observer.complete();
      });
    });
    component.translateColumnsNames();
    expect(component.columnNames).toEqual(translatedColumnNames);
  });

  it('should refresh data', () => {
    spyOn(component.dataSource.transactionApiService, 'getTransactions').and.callFake(() => {
      return new Observable((observer) => {
        observer.next(transactionsResponseExample as unknown as HttpResponse<Page<Transaction>>);
        observer.complete();
      });
    });
    component.loadData();
    expect(component.dataSource.data).toEqual(transactionsResponseExample.body);
  });

  it('should change status of first transaction', () => {
    spyOn(component.dataSource.transactionApiService, 'getTransactions').and.callFake(() => {
      return new Observable((observer) => {
        observer.next(transactionsResponseExample as unknown as HttpResponse<Page<Transaction>>);
        observer.complete();
      });
    });
    spyOn(component.transactionApiService, 'confirmTransaction').and.callFake(() => {
      return new Observable((observer) => {
        observer.next();
        observer.complete();
      });
    });
    component.loadData();
    transactionsResponseExample.body[0].status = 'COMPLETED';
    component.confirmTransaction(eventMock as unknown as Event);
    expect(component.dataSource.data[0].status).toBe('COMPLETED');
  });

  it('should toggle forms', () => {
    component.toggleForms(eventMock as unknown as Event, rowMock);
    console.log(component.transactionUpdateForm.value);
    expect(component.formsToggled).toBe(true);
    expect(rowMock.displayForms).toBe(true);
    expect(component.transactionUpdateForm.value.user).toBe(rowMock.user);
    expect(component.transactionUpdateForm.value.status).toBe(rowMock.status);
    expect(component.transactionUpdateForm.value.amount).toBe(rowMock.amount.amount);
    expect(component.transactionUpdateForm.value.currency).toBe(rowMock.amount.currency);
    expect(component.transactionUpdateForm.value.commissionAmount).toBe(rowMock.commissionAmount.amount);
    expect(component.transactionUpdateForm.value.commissionCurrency).toBe(rowMock.commissionAmount.currency);
    expect(component.transactionUpdateForm.value.additionalData).toBe(rowMock.additionalData);
  });

  it('should change info of first transaction', () => {
    spyOn(component.dataSource.transactionApiService, 'getTransactions').and.callFake(() => {
      return new Observable((observer) => {
        observer.next(transactionsResponseExample as unknown as HttpResponse<Page<Transaction>>);
        observer.complete();
      });
    });
    spyOn(component.transactionApiService, 'patchTransaction').and.callFake((updateObj) => {
      transactionsResponseExample.body[1] = updateObj;
      return new Observable((observer) => {
        observer.complete();
      });
    });
    component.loadData();
    component.transactionUpdateForm = transactionUpdateFormMock as FormGroup;
    component.updateTransaction(eventMock as unknown as Event, rowMock);
    expect(component.dataSource.data[1].user).toBe(transactionUpdateFormMock.value.user);
    expect(component.dataSource.data[1].status).toBe(transactionUpdateFormMock.value.status);
    expect(Number(component.dataSource.data[1].amount.amount)).toBe(Number(transactionUpdateFormMock.value.amount));
    expect(component.dataSource.data[1].amount.currency).toBe(transactionUpdateFormMock.value.currency);
    expect(Number(component.dataSource.data[1].commissionAmount.amount)).toBe(Number(transactionUpdateFormMock.value.commissionAmount));
    expect(component.dataSource.data[1].commissionAmount.currency).toBe(transactionUpdateFormMock.value.commissionCurrency);
  });

  it('should nullify sorting', () => {
    component.setDefaultSorting();
    expect(component.sorted).toBeUndefined();
    expect(component.dataSource.sortColumn).toBeFalsy();
    expect(component.dataSource.sortOrder).toBeFalsy();
  });

  it('should set sorting', () => {
    component.sorted = {};
    component.setSorting(columnNameMock);
    expect(component.dataSource.sortColumn).toBe(columnNameMock);
    expect(component.dataSource.sortOrder).toBe(SortingStrings.ASC);
  });

  it('should set sorting in datasource and call loadTransactions', () => {
    spyOn(component.dataSource, 'loadTransactions').and.callFake(() => {
      console.log('ok');
    });
    component.sortify(columnNameMock);
    expect(component.dataSource.sortColumn).toBe(columnNameMock);
    expect(component.dataSource.sortOrder).toBe(SortingStrings.DESC);
    expect(component.dataSource.loadTransactions).toHaveBeenCalled();
  });
});
