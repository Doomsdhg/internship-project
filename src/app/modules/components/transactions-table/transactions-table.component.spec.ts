import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TransactionsTableComponent } from './transactions-table.component';
import { 
  TranslateModule,
  TranslateService,
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

describe('TransactionsTableComponent', () => {

  const translationObjectExample = {
    "displayedColumns.actions": "действия",
    "displayedColumns.amount": "количество",
    "displayedColumns.commissionAmount": "размер комиссии",
    "displayedColumns.externalId": "номер",
    "displayedColumns.provider": "провайдер",
    "displayedColumns.status": "статус",
    "displayedColumns.user": "имя пользователя"
  };

  const translatedColumnNames = [{
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
    id: Columns.ID_COMISSION_AMOUNT,
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

  const transactionsResponseExample = {
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
    stopPropagation: () => {console.log(1);},
    currentTarget: {
      dataset : {
        external_id: '123qwe',
        provider: 'qiwi'
      }
    }
  };

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

  it('should refresh transaction status', () => {
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
});
