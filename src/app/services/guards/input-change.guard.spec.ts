import { TestBed } from '@angular/core/testing';

import { InputChangeGuard } from './input-change.guard';

describe('InputChangeGuard', () => {
  let guard: InputChangeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InputChangeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
