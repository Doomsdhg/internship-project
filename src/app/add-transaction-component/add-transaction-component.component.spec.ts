import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionComponentComponent } from './add-transaction-component.component';

describe('AddTransactionComponentComponent', () => {
  let component: AddTransactionComponentComponent;
  let fixture: ComponentFixture<AddTransactionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransactionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
