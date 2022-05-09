import { TestBed } from '@angular/core/testing';

import { PreventUnathenticatedAccessGuard } from './app.intr.prevent-unathenticated-access.guard';

describe('PreventUnathenticatedAccessGuard', () => {
  let guard: PreventUnathenticatedAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventUnathenticatedAccessGuard);
  });


});
