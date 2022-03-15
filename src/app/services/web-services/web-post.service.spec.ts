import { TestBed } from '@angular/core/testing';

import { WebPostService } from './web-post.service';

describe('WebPostService', () => {
  let service: WebPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
