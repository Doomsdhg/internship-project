import { TestBed } from '@angular/core/testing';

import { PreventAuthenticatedAccessGuard } from './intr.prevent-authenticated-access.guard';

describe('PreventAuthenticatedAccessGuard', () => {
  let guard: PreventAuthenticatedAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventAuthenticatedAccessGuard);
  });


});
