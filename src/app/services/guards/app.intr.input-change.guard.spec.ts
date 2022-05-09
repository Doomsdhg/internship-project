import { TestBed } from '@angular/core/testing';

import { InputChangeGuard } from './app.intr.input-change.guard';

describe('InputChangeGuard', () => {
  let guard: InputChangeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InputChangeGuard);
  });


});
