import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TransactionApiService } from './transaction-api.service';
import { Observable } from 'rxjs';
import { Transaction, TransactionUpdateData } from 'src/app/modules/interfaces/transactions.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TransactionApiService', () => {
  let service: TransactionApiService;
  let http: HttpClient;
  const transactionsListExample: Transaction[] = [
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
  ];

  const updateObj: TransactionUpdateData = {
    id: '11',
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
      user: 'test1',
      timestamp: 123,
      providerTimestamp: 1234
    };

  const newTransaction: Transaction = {
    id: '4',
    externalId: '123ewq',
    provider: 'paypal',
    status: 'INITIAL',
    amount: {
      amount: 400,
      currency: 'USD'
    },
    commissionAmount: {
      amount: 40,
      currency: 'USD'
    },
    user: 'test4'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionApiService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TransactionApiService);
    http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.callFake((): any => {
      return new Observable((observer) => {
        observer.next(transactionsListExample);
        observer.complete();
      });
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of transactions', (done) => {
    service.getTransactions().subscribe((success: any) => {
      expect(success).toEqual(transactionsListExample);
      done();
    }
    ); 
  });

  it('should return list of transactions without last one on the list', (done) => {
    spyOn(http, 'delete').and.callFake((): any => {
      return new Observable((observer) => {
        transactionsListExample.pop();
        observer.next('ok');
        observer.complete();
      });
    });
    service.deleteTransaction('3').subscribe(() => {
      service.getTransactions().subscribe((success: any) => {
        expect(success).toEqual(transactionsListExample);
        done();
      });
    }); 
  });

  it('should return list of transactions with first item updated', (done) => {
    spyOn(http, 'put').and.callFake((): any => {
      return new Observable((observer) => {
        transactionsListExample[1] = updateObj as Transaction;
        observer.next('ok');
        observer.complete();
      });
    });
    service.patchTransaction(updateObj).subscribe(() => {
      service.getTransactions().subscribe((success: any) => {
        expect(success).toEqual(transactionsListExample);
        done();
      }); 
    });
  });

  it('should return list of transactions with a new transaction added', (done) => {
    spyOn(http, 'post').and.callFake((): any => {
      return new Observable((observer) => {
        transactionsListExample.push(newTransaction);
        observer.next('ok');
        observer.complete();
      });
    });
    service.uploadTransaction(updateObj).subscribe(() => {
      service.getTransactions().subscribe((success: any) => {
        expect(success).toEqual(transactionsListExample);
        done();
      }); 
    });
  });

  it('should return list of transactions with a new transaction added', (done) => {
    spyOn(http, 'post').and.callFake((): any => {
      return new Observable((observer) => {
        transactionsListExample.push(newTransaction);
        observer.next('ok');
        observer.complete();
      });
    });
    service.uploadTransaction(updateObj).subscribe(() => {
      service.getTransactions().subscribe((success: any) => {
        expect(success).toEqual(transactionsListExample);
        done();
      }); 
    });
  });

  it('should return list of transactions with a status of first transaction updated to "completed"', (done) => {
    spyOn(http, 'post').and.callFake((): any => {
      return new Observable((observer) => {
        transactionsListExample[1].status = 'COMPLETED';
        observer.next('ok');
        observer.complete();
      });
    });
    service.uploadTransaction(updateObj).subscribe(() => {
      service.getTransactions().subscribe((success: any) => {
        expect(success[1].status).toBe('COMPLETED');
        done();
      }); 
    });
  });

});
