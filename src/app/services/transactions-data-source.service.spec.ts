import { TestBed } from '@angular/core/testing';

import { TransactionsDataSource } from './transactions-data-source.service';

describe('TransactionsDataSourceService', () => {
  let service: TransactionsDataSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsDataSource);
  });


});
