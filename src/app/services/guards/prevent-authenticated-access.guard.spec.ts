import { TestBed } from '@angular/core/testing';

import { PreventAuthenticatedAccessGuard } from './prevent-authenticated-access.guard';

describe('PreventAuthenticatedAccessGuard', () => {
  let guard: PreventAuthenticatedAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventAuthenticatedAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
