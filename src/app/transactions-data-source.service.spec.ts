import { TestBed } from '@angular/core/testing';

import { TransactionsDataSourceService } from './transactions-data-source.service';

describe('TransactionsDataSourceService', () => {
  let service: TransactionsDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
