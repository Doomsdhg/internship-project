import { TestBed } from '@angular/core/testing';

import { PreventUnathenticatedAccessGuard } from './intr.prevent-unathenticated-access.guard';

describe('PreventUnathenticatedAccessGuard', () => {
  let guard: PreventUnathenticatedAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventUnathenticatedAccessGuard);
  });


});
