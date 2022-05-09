import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './app.intr.spinner.service';

describe('App.Intr.SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
