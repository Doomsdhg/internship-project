import { TestBed } from '@angular/core/testing';

import { WebPatchService } from './web-patch.service';

describe('WebPatchService', () => {
  let service: WebPatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebPatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
