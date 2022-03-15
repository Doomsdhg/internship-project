import { TestBed } from '@angular/core/testing';

import { WebGetService } from './web-get.service';

describe('WebGetService', () => {
  let service: WebGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
