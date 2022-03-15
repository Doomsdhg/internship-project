import { TestBed } from '@angular/core/testing';

import { WebDeleteService } from './web-delete.service';

describe('WebDeleteService', () => {
  let service: WebDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
