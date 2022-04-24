import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTablePageComponent } from './transactions-table-page.component';

describe('TransactionsTablePageComponent', () => {
  let component: TransactionsTablePageComponent;
  let fixture: ComponentFixture<TransactionsTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsTablePageComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
